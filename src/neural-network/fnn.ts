import { ConvertedTrainingData } from "@/types/training-data";
import { NeuralNetworkGPU } from "brain.js";
import { writeFile } from "node:fs/promises";

const fnn = new NeuralNetworkGPU({
  hiddenLayers: [16, 16, 16],
});

export const train = (dataSet: ConvertedTrainingData[]) => fnn.train(dataSet);

export const saveTrainedModel = async () => {
  const model = fnn.toJSON();
  const dateString = new Date()
    .toLocaleString()
    .replaceAll(" ", "")
    .replace(/[\/,\s]/g, "-");
  const fileName = `trained-model-${dateString}`;

  await writeFile(
    `trained-model/${fileName}.json`,
    JSON.stringify(model, null, 2),
    "utf8"
  );
};
