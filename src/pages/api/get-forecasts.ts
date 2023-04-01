// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getForecasts } from "@/forecast";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  createdAt: string;
  hourly: {
    hour: string;
    totalClouds: number;
    lowClouds: number;
    mediumClouds: number;
    highClouds: number;
    rainChance: number;
    rainAmount: number;
    windSpeed: number;
    temperature: number;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const forecasts = await getForecasts();

  res.status(200).json(forecasts);
}
