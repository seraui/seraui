import fs from "fs";

export const extractCode = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  return fileContent;
};
