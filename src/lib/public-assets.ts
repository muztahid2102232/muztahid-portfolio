import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Checks whether a public asset exists at build time.
 *
 * This keeps optional assets (profile image, CV) from producing 404s. Run this
 * only from server components or other server-only code.
 */
export function publicAssetExists(assetPath: string): boolean {
  const relativePath = assetPath.replace(/^\/+/, "");

  if (!relativePath || relativePath.includes("://")) {
    return false;
  }

  const publicDirectory = path.join(process.cwd(), "public");
  const resolvedPath = path.resolve(publicDirectory, relativePath);
  const isInsidePublicDirectory =
    resolvedPath === publicDirectory ||
    resolvedPath.startsWith(`${publicDirectory}${path.sep}`);

  return isInsidePublicDirectory && existsSync(resolvedPath);
}
