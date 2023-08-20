import type { NextApiRequest, NextApiResponse } from "next";
import { trainModel } from "@/neural-network";
import { saveTrainedModel } from "@/neural-network/fnn";
import { readTrainingDataSets } from "@/neural-network/read-training-data-set";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rawTrainingDataSets = await readTrainingDataSets();
  const trainingResult = await trainModel(rawTrainingDataSets);

  await saveTrainedModel();

  res.status(200).json(trainingResult);
}
