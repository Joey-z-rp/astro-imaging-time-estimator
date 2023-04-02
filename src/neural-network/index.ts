import { RawTrainingData } from "@/types/neural-network";
import {
  convertInput,
  convertTrainingDataSet,
} from "./convert-training-data-set";
import { loadFromTrainedModel, run, train } from "./fnn";
import { readTrainingDataSet } from "./read-training-data-set";

export const trainModel = async () => {
  const rawTrainingDataSet = await readTrainingDataSet();
  const convertedDataSet = convertTrainingDataSet(rawTrainingDataSet);

  return train(convertedDataSet);
};

export const loadModal = () => loadFromTrainedModel();

export const runEstimation = (
  rawData: Pick<RawTrainingData, "exposureLength" | "hourlyForecasts">
) => run(convertInput(rawData));
