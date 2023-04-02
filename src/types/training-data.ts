import { Forecast } from "./forecast";

export type RawTrainingData = {
  createdAt: string;
  exposureLength: number;
  totalImagingTime: number;
  forecastedAt: string;
  hourlyForecasts: Forecast[];
};

export type ConvertedTrainingData = {
  input: Record<string, number>;
  output: {
    totalImagingTime: number;
  };
};
