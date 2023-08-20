import { readTrainingDataSets } from "@/neural-network/read-training-data-set";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ numOfDataSets: number }>
) {
  const rawTrainingDataSets = await readTrainingDataSets();

  res.status(200).json({ numOfDataSets: rawTrainingDataSets.length });
}
