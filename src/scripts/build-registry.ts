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
  const content = fs.readFileSync(component.path, "utf-8");

  const files = [
    {
      path: `${component.name}.tsx`,
      content,
      type: "registry:ui" as RegistryType,
    },
  ];

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
          `Error Reading dependecy file ${file.path} for component ${component.name}`,
          error
        );
      }
    }
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

  console.log("Component Registry built successfully");
}
