#!/usr/bin/env node

/**
 * Watch script to automatically regenerate the components registry
 * when new components are added to the docs directory
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const docsPath = path.join(__dirname, "../app/docs");

console.log("👀 Watching for new components in docs directory...");
console.log(`📁 Watching: ${docsPath}`);

let isBuilding = false;

function buildRegistry() {
  if (isBuilding) return;

  isBuilding = true;
  console.log("\n🔄 Detected changes, rebuilding components and registry...");

  try {
    // First regenerate components.ts, then build registry
    execSync("npm run generate:components", { stdio: "inherit" });
    execSync("tsx ./src/scripts/build-registry.ts", { stdio: "inherit" });
    console.log("✅ Components and registry rebuilt successfully!\n");
  } catch (error) {
    console.error("❌ Error rebuilding:", error);
  } finally {
    isBuilding = false;
  }
}

// Watch for changes in the docs directory
fs.watch(docsPath, { recursive: false }, (eventType, filename) => {
  if (eventType === 'rename' && filename) {
    const fullPath = path.join(docsPath, filename);
    
    // Check if it's a new directory
    try {
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        console.log(`📂 New component directory detected: ${filename}`);
        setTimeout(buildRegistry, 1000); // Debounce
      }
    } catch (error) {
      // Directory was deleted
      console.log(`🗑️  Component directory removed: ${filename}`);
      setTimeout(buildRegistry, 1000); // Debounce
    }
  }
});

console.log("✨ Watcher started! Press Ctrl+C to stop.");

// Keep the process alive
process.on('SIGINT', () => {
  console.log('\n👋 Stopping watcher...');
  process.exit(0);
});
