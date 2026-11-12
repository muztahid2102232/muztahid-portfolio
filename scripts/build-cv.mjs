import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const sourcePath = path.join(projectRoot, "cv", "cv.html");
const outputPath = path.join(projectRoot, "public", "cv.pdf");

const browserCandidates = [
  process.env.CHROME_PATH,
  process.env.EDGE_PATH,
  // Windows
  process.env.PROGRAMFILES &&
    path.join(
      process.env.PROGRAMFILES,
      "Google",
      "Chrome",
      "Application",
      "chrome.exe",
    ),
  process.env["PROGRAMFILES(X86)"] &&
    path.join(
      process.env["PROGRAMFILES(X86)"],
      "Google",
      "Chrome",
      "Application",
      "chrome.exe",
    ),
  process.env.PROGRAMFILES &&
    path.join(
      process.env.PROGRAMFILES,
      "Microsoft",
      "Edge",
      "Application",
      "msedge.exe",
    ),
  process.env["PROGRAMFILES(X86)"] &&
    path.join(
      process.env["PROGRAMFILES(X86)"],
      "Microsoft",
      "Edge",
      "Application",
      "msedge.exe",
    ),
  process.env.LOCALAPPDATA &&
    path.join(
      process.env.LOCALAPPDATA,
      "Google",
      "Chrome",
      "Application",
      "chrome.exe",
    ),
  process.env.LOCALAPPDATA &&
    path.join(
      process.env.LOCALAPPDATA,
      "Microsoft",
      "Edge",
      "Application",
      "msedge.exe",
    ),
  // macOS
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  // Linux
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/usr/bin/microsoft-edge",
];

const browser = browserCandidates.find(
  (candidate) => candidate && existsSync(candidate),
);

if (!browser) {
  console.error(
    "Could not find Chrome or Edge. Set CHROME_PATH to your browser executable.",
  );
  process.exit(1);
}

if (!existsSync(sourcePath)) {
  console.error(`CV source not found: ${sourcePath}`);
  process.exit(1);
}

mkdirSync(path.dirname(outputPath), { recursive: true });

const sourceUrl = `file:///${sourcePath.replace(/\\/g, "/")}`;
const result = spawnSync(
  browser,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--virtual-time-budget=10000",
    `--print-to-pdf=${outputPath}`,
    sourceUrl,
  ],
  { stdio: "inherit" },
);

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

if (!existsSync(outputPath)) {
  console.error("PDF generation failed: the output file was not created.");
  process.exit(1);
}

const sizeKb = Math.round(statSync(outputPath).size / 1024);
console.log(`Generated ${path.relative(projectRoot, outputPath)} (${sizeKb} KB)`);
