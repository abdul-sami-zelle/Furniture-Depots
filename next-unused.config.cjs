module.exports = {
  // Your main entry points
  entryPoints: [
    "./src/app/page.js",
    "./src/app/layout.js"
  ],

  // Folders to scan for unused assets
  directories: [
    "./src",
    "./public"
  ],

  // File types to check
  fileExtensions: [
    ".js",
    ".jsx",
    ".css",
    ".scss",
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".svg",
    ".gif"
  ],

  // Exclude these folders from scanning
  exclude: [
    "node_modules",
    ".next",
    "dist",
    "layout.js.zip",
    "order-confirmation.zip"
  ]
};
