import fs from "fs";
import path from "path";
import { components } from "./components";
import { RegistryItemSchema, RegistryType } from "./types";

const registryPath = path.join(__dirname, "../../public/registry");

if (!fs.existsSync(registryPath)) {
  fs.mkdirSync(registryPath);
}

console.log(`Building component registry...`);
for (const component of components) {
  const files: Array<{
    path: string;
    content: string;
    type: RegistryType;
  }> = [];

  try {
    // Resolve the path relative to the scripts directory
    const resolvedPath = path.resolve(__dirname, component.path);
    // Check if the path is a directory or a file
    const stats = fs.statSync(resolvedPath);

    if (stats.isDirectory()) {
      // Handle directory-based components
      const componentDir = resolvedPath;
      const dirContents = fs.readdirSync(componentDir);

      // Find the main component file (usually matches the component name)
      const mainComponentFile = dirContents.find(file =>
        file === `${component.name}.tsx` ||
        file === `${component.name}-view.tsx` ||
        file === `${component.name.split('-')[0]}.tsx`
      );

      if (mainComponentFile) {
        const mainContent = fs.readFileSync(path.join(componentDir, mainComponentFile), "utf-8");
        files.push({
          path: `${component.name}.tsx`,
          content: mainContent,
          type: "registry:ui" as RegistryType,
        });
      } else {
        // If no main file found, use the first .tsx file
        const tsxFiles = dirContents.filter(file => file.endsWith('.tsx'));
        if (tsxFiles.length > 0) {
          const firstTsxContent = fs.readFileSync(path.join(componentDir, tsxFiles[0]), "utf-8");
          files.push({
            path: `${component.name}.tsx`,
            content: firstTsxContent,
            type: "registry:ui" as RegistryType,
          });
        }
      }

      // Add other .tsx files as additional files
      const otherTsxFiles = dirContents.filter(file =>
        file.endsWith('.tsx') &&
        file !== mainComponentFile &&
        !file.includes('page.mdx')
      );

      for (const file of otherTsxFiles) {
        try {
          const fileContent = fs.readFileSync(path.join(componentDir, file), "utf-8");
          files.push({
            path: file,
            content: fileContent,
            type: "registry:ui" as RegistryType,
          });
        } catch (error) {
          console.warn(`Warning: Could not read file ${file} in ${component.name}:`, error);
        }
      }

    } else {
      // Handle single file components
      const content = fs.readFileSync(resolvedPath, "utf-8");
      files.push({
        path: `${component.name}.tsx`,
        content,
        type: "registry:ui" as RegistryType,
      });
    }
  } catch (error) {
    console.error(`Error processing component ${component.name}:`, error);
    continue;
  }

  // Add any additional files specified in the component definition
  if (component.files && component.files.length > 0) {
    for (const file of component.files) {
      try {
        const fileContent = fs.readFileSync(file.path, "utf-8");

        files.push({
          path: file.name,
          content: fileContent,
          type: file.type ?? ("registry:ui" as RegistryType),
        });
      } catch (error) {
        console.error(
          `Error Reading dependency file ${file.path} for component ${component.name}`,
          error
        );
      }
    }
  }

  // Skip if no files were found
  if (files.length === 0) {
    console.warn(`Warning: No files found for component ${component.name}, skipping...`);
    continue;
  }

  const componentSchema = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: component.name,
    title: component.title,
    description: component.description,
    author: component.author ?? "Reche Soares",
    type: "registry:ui",
    dependencies: component.dependencies ?? [],
    devDependencies: component.devDependencies ?? [],
    registryDependencies: component.registryDependencies ?? [],
    cssVars: component.cssVars ?? {
      dark: {},
      light: {},
    },
    files,
  } satisfies RegistryItemSchema;

  fs.writeFileSync(
    path.join(registryPath, `${component.name}.json`),
    JSON.stringify(componentSchema, null, 2)
  );

  console.log(`✅ Built registry for component: ${component.name}`);
}

console.log("🎉 Component Registry built successfully!");
