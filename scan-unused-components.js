const fs = require("fs");
const path = require("path");

// Folders
const COMPONENTS_DIR = path.join(__dirname, "src/UI/Modals");
const SCAN_DIRS = [path.join(__dirname, "src/app")]; // All pages/layouts etc
const BACKUP_DIR = path.join(__dirname, "unused-components-backup");

// File extensions to check
const COMPONENT_EXT = [".js", ".jsx"];
const CODE_EXT = [".js", ".jsx"];

// Helper: Recursively get files
function getAllFiles(dir, exts) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, exts));
    } else if (exts.includes(path.extname(file))) {
      results.push(filePath);
    }
  });
  return results;
}

// Check if component is used
function isComponentUsed(componentPath, codeFiles) {
  const componentName = path.basename(componentPath, path.extname(componentPath));
  return codeFiles.some((codeFile) => {
    const content = fs.readFileSync(codeFile, "utf-8");
    return content.includes(componentName);
  });
}

// Move to backup
function moveToBackup(filePath) {
  const rel = path.relative(__dirname, filePath);
  const dest = path.join(BACKUP_DIR, rel);
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  fs.renameSync(filePath, dest);
  console.log("Moved:", rel);
}

// Main
function main() {
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

  const codeFiles = SCAN_DIRS.map((d) => getAllFiles(d, CODE_EXT)).flat();
  const components = getAllFiles(COMPONENTS_DIR, COMPONENT_EXT);

  console.log(`Scanning ${components.length} components...`);

  let unusedCount = 0;
  components.forEach((comp) => {
    if (!isComponentUsed(comp, codeFiles)) {
      moveToBackup(comp);
      unusedCount++;
    }
  });

  console.log(`Finished. ${unusedCount} unused components moved to ${BACKUP_DIR}`);
}

main();
