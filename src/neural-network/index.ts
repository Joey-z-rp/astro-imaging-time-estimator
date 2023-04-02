import { convertTrainingDataSet } from "./convert-training-data-set";
import { train } from "./fnn";
import { readTrainingDataSet } from "./read-training-data-set";

export const trainModel = async () => {
  const rawTrainingDataSet = await readTrainingDataSet();
  const convertedDataSet = convertTrainingDataSet(rawTrainingDataSet);

  return train(convertedDataSet);
};
