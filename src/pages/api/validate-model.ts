import { runEstimation, trainModel } from "@/neural-network";
import { readTrainingDataSets } from "@/neural-network/read-training-data-set";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ accuracy: number }>
) {
  const { numOfTrainingDataSet } = JSON.parse(req.body);

  if (!numOfTrainingDataSet || Number.isNaN(Number(numOfTrainingDataSet)))
    throw new Error("Missing necessary information");

  const rawTrainingDataSets = await readTrainingDataSets();
  const setsToTrain = rawTrainingDataSets.slice(
    0,
    Number(numOfTrainingDataSet)
  );
  const setsToValidate = rawTrainingDataSets.slice(
    Number(numOfTrainingDataSet)
  );
  await trainModel(setsToTrain);

  const accuracies = setsToValidate.map((set) => {
    const { totalImagingTime } = runEstimation({
      hourlyForecasts: set.hourlyForecasts,
      exposureLength: set.exposureLength,
    });
    const difference = Math.abs(
      totalImagingTime * set.hourlyForecasts.length * 60 - set.totalImagingTime
    );
    const accuracy = 1 - difference / set.totalImagingTime;

    return accuracy;
  });

  const average =
    accuracies
      .filter(Number.isFinite)
      .reduce((sum, accuracy) => sum + accuracy, 0) / accuracies.length;

  res.status(200).json({ accuracy: average });
}
