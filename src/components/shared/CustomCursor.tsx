"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

const SPRING_CONFIG = {
  damping: 24,
  stiffness: 280,
  mass: 0.5,
};

function subscribeFinePointer(callback: () => void) {
  const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getFinePointerSnapshot(): boolean {
  return window.matchMedia("(pointer: fine) and (hover: hover)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function CustomCursor() {
  const reduceMotion = useReducedMotion() ?? false;
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getServerSnapshot,
  );

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position motion values for zero React re-renders during mouse move
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring for the outer ring
  const ringX = useSpring(mouseX, SPRING_CONFIG);
  const ringY = useSpring(mouseY, SPRING_CONFIG);

  useEffect(() => {
    if (!isFinePointer || reduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], label, summary, .cursor-pointer',
      );
      setIsHovering(Boolean(interactive));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isFinePointer, reduceMotion]);

  if (!isFinePointer || reduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.2s ease" }}
    >
      {/* Outer Soft Glowing Ring with smooth spring trailing */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 dark:border-cyan-400/50 shadow-[0_0_14px_rgba(79,140,255,0.25)]"
        style={{
          x: ringX,
          y: ringY,
          width: 36,
          height: 36,
        }}
        animate={{
          scale: isClicking ? 0.9 : isHovering ? 1.55 : 1,
          borderColor: isHovering
            ? "var(--primary)"
            : "color-mix(in oklab, var(--primary) 50%, transparent)",
          backgroundColor: isHovering
            ? "color-mix(in oklab, var(--primary) 12%, transparent)"
            : "transparent",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />

      {/* Central Sharp Dot following raw mouse coordinates */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{
          x: mouseX,
          y: mouseY,
          width: 7,
          height: 7,
        }}
        animate={{
          scale: isClicking ? 1.4 : isHovering ? 0.5 : 1,
          opacity: isHovering ? 0.75 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </div>
  );
}
