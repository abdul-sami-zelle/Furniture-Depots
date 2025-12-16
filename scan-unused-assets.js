const fs = require("fs");
const path = require("path");

// Folders to scan
const ASSET_FOLDERS = ["public", "src"];
const FILE_TYPES = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];
const CODE_FILE_TYPES = [".js", ".jsx", ".css", ".scss"];

// Backup folder for unused files
const BACKUP_DIR = path.join(__dirname, "unused-assets-backup");

// Collect all asset files
function getAllAssets(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllAssets(filePath));
    } else if (FILE_TYPES.includes(path.extname(file))) {
      results.push(filePath);
    }
  });
  return results;
}

// Collect all code files
function getAllCodeFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllCodeFiles(filePath));
    } else if (CODE_FILE_TYPES.includes(path.extname(file))) {
      results.push(filePath);
    }
  });
  return results;
}

// Check if asset is referenced in code
function isAssetUsed(asset, codeFiles) {
  const assetRelPath = asset.split(path.sep).join("/"); // normalize
  return codeFiles.some((codeFile) => {
    const content = fs.readFileSync(codeFile, "utf-8");
    return content.includes(assetRelPath) || content.includes(path.basename(asset));
  });
}

// Move file to backup
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

  const codeFiles = ASSET_FOLDERS.map(getAllCodeFiles).flat();
  const assets = ASSET_FOLDERS.map(getAllAssets).flat();

  console.log(`Scanning ${assets.length} assets...`);

  let unusedCount = 0;
  assets.forEach((asset) => {
    if (!isAssetUsed(asset, codeFiles)) {
      moveToBackup(asset);
      unusedCount++;
    }
  });

  console.log(`Finished. ${unusedCount} unused assets moved to ${BACKUP_DIR}`);
}

main();
