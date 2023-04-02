import { ConvertedTrainingData, Estimate } from "@/types/neural-network";
import { findLastModifiedFile } from "@/utils/file";
import { NeuralNetworkGPU } from "brain.js";
import { writeFile } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const trainedModelsDirectory = "trained-models";

const fnn = new NeuralNetworkGPU({
  hiddenLayers: [16, 16, 16],
});

export const run = (data: Record<string, number>) => {
  // console.info("Running fnn with data:", data);

  return fnn.run(data) as Estimate;
};

export const train = (dataSet: ConvertedTrainingData[]) => fnn.train(dataSet);

export const saveTrainedModel = async () => {
  const model = fnn.toJSON();
  const dateString = new Date()
    .toLocaleString()
    .replaceAll(" ", "")
    .replace(/[\/,\s]/g, "-");
  const fileName = `trained-model-${dateString}`;

  await writeFile(
    `${trainedModelsDirectory}/${fileName}.json`,
    JSON.stringify(model, null, 2),
    "utf8"
  );
};

export const loadFromTrainedModel = async (fileName?: string) => {
  const fileNameToUse =
    fileName || (await findLastModifiedFile(trainedModelsDirectory));

  if (!fileNameToUse) return;

  const Model = await readFile(
    join(trainedModelsDirectory, fileNameToUse),
    "utf-8"
  );

  fnn.fromJSON(JSON.parse(Model));

  console.info(`Loaded model ${fileNameToUse}`);
};
