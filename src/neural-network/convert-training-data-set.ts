import { RawTrainingData } from "@/types/neural-network";

const normalize = (value: number, range: [number, number] = [0, 100]) => {
  const normalizedValue = 1 - (range[1] - value) / (range[1] - range[0]);

  if (normalizedValue > 1 || normalizedValue < 0)
    throw new Error(`Failed to normalize value ${value} for range ${range}`);

  return normalizedValue;
};

export const convertInput = (
  data: Pick<RawTrainingData, "exposureLength" | "hourlyForecasts">
) => {
  const forecastInput = data.hourlyForecasts.reduce(
    (input, forecast, index) => ({
      ...input,
      [`totalClouds[${index}]`]: normalize(forecast.totalClouds),
      [`lowClouds[${index}]`]: normalize(forecast.lowClouds),
      [`mediumClouds[${index}]`]: normalize(forecast.mediumClouds),
      [`highClouds[${index}]`]: normalize(forecast.highClouds),
      [`rainChance[${index}]`]: normalize(forecast.rainChance),
      [`rainAmount[${index}]`]: normalize(forecast.rainAmount, [0, 500]),
      [`windSpeed[${index}]`]: normalize(forecast.windSpeed),
      [`temperature[${index}]`]: normalize(forecast.temperature, [-50, 50]),
    }),
    {}
  );

  return {
    ...forecastInput,
    exposureLength: normalize(data.exposureLength, [0, 600]),
  };
};

export const convertTrainingDataSet = (rawDataSet: RawTrainingData[]) =>
  rawDataSet.map((data) => {
    const totalImagingTime =
      data.totalImagingTime / (data.hourlyForecasts.length * 60);

    if (totalImagingTime < 0 || totalImagingTime > 1)
      throw new Error(
        `Failed to normalize total imaging time ${data.totalImagingTime} for ${data.createdAt}: ${totalImagingTime}`
      );

    return {
      input: convertInput(data),
      output: { totalImagingTime },
    };
  });
