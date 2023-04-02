import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";

export const readTrainingDataSet = async () => {
  const trainingDataDirectory = "training-data";

  const files = await readdir(trainingDataDirectory);
  const jsonFiles = files.filter((f) => extname(f) === ".json");

  return Promise.all(
    jsonFiles.map(async (file) => {
      const data = await readFile(join(trainingDataDirectory, file), "utf-8");

      return JSON.parse(data);
    })
  );
};
