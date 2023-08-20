import { RawTrainingData } from "@/types/neural-network";
import { readFileNames } from "@/utils/file";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const readTrainingDataSets = async () => {
  const trainingDataDirectory = "training-data";

  const files = await readFileNames(trainingDataDirectory);

  return Promise.all(
    files.map(async (file) => {
      const data = await readFile(join(trainingDataDirectory, file), "utf-8");

      return JSON.parse(data) as RawTrainingData;
    })
  );
};
