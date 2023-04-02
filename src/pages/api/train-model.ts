import type { NextApiRequest, NextApiResponse } from "next";
import { trainModel } from "@/neural-network";
import { saveTrainedModel } from "@/neural-network/fnn";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const trainingResult = await trainModel();

  await saveTrainedModel();

  res.status(200).json(trainingResult);
}
