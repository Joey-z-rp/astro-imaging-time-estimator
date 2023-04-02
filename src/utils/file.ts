import { readdir } from "node:fs/promises";
import { statSync } from "node:fs";
import { extname, join } from "node:path";

export const readFileNames = async (
  directoryPath: string,
  extension: string = "json"
) => {
  const fileNames = await readdir(directoryPath);
  return fileNames.filter((f) => extname(f) === `.${extension}`);
};

export const findLastModifiedFile = async (directoryPath: string) => {
  const fileNames = await readFileNames(directoryPath);

  let lastModifiedFileName: string | undefined;
  let lastModifiedTime: Date;

  fileNames.forEach((fileName) => {
    const stat = statSync(join(directoryPath, fileName));

    if (stat.isFile() && (!lastModifiedTime || stat.mtime > lastModifiedTime)) {
      lastModifiedFileName = fileName;
      lastModifiedTime = stat.mtime;
    }
  });

  return lastModifiedFileName;
};
