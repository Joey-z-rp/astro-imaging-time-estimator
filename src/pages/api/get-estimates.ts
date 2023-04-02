import { getForecasts } from "@/forecast";
import { loadModal, runEstimation } from "@/neural-network";
import { Estimate } from "@/types/neural-network";
import { findForecasts } from "@/utils/forecast";
import type { NextApiRequest, NextApiResponse } from "next";

let isModelLoaded = false;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Estimate[]>
) {
  if (!isModelLoaded) {
    await loadModal();
    isModelLoaded = true;
  }

  const { exposureLength, startTime, duration } = req.query;

  if (!exposureLength || !startTime || !duration)
    throw new Error("Missing necessary information");

  const forecasts = await getForecasts([0, 1, 2, 3, 4, 5, 6]);

  const result = forecasts.map((forecast) => {
    const targetForecasts = findForecasts(
      forecast.hourlyForecasts,
      startTime as string,
      Number(duration)
    );

    const { totalImagingTime } = runEstimation({
      hourlyForecasts: targetForecasts,
      exposureLength: Number(exposureLength),
    });

    return {
      totalImagingTime: Math.floor(
        targetForecasts.length * 60 * totalImagingTime
      ),
    };
  });

  res.status(200).json(result);
}
