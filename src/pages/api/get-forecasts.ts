import { getForecasts } from "@/forecast";
import { Forecast } from "@/types/forecast";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  forecastedAt: string;
  hourlyForecasts: Forecast[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const forecasts = await getForecasts();

  res.status(200).json(forecasts);
}
