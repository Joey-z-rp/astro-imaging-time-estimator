import { Forecast } from "@/types/forecast";

export const findForecasts = (
  forecasts: Forecast[],
  startTime: string,
  duration: number
) => {
  const startIndex = forecasts.findIndex((f) => f.hour === startTime);

  return forecasts.slice(startIndex, startIndex + duration);
};
