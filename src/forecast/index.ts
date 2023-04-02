import { getForecastsFromClearOutside } from "./clear-outside";

export const getForecasts = (days = [0]) => getForecastsFromClearOutside(days);
