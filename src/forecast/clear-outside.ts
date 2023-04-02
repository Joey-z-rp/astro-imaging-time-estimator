import * as cheerio from "cheerio";

const getHourlyForecast = (
  label: string,
  element: cheerio.Cheerio<any>,
  $: cheerio.CheerioAPI
) => {
  const forecasts: number[] = [];
  element
    .find(`span.fc_detail_label:contains('${label}')`)
    .siblings()
    .filter("div.fc_hours")
    .find("li")
    .each(function () {
      forecasts.push(Number($(this).text()));
    });

  return forecasts;
};

const getForecastsForDay = (day: number, $: cheerio.CheerioAPI) => {
  const dailyForecasts = $(`div#day_${day}`);

  const hours: string[] = [];
  dailyForecasts
    .find("div.fc_hour_ratings")
    .first()
    .find("li")
    .each(function () {
      hours.push($(this).text().substring(0, 3).trim());
    });

  const totalClouds = getHourlyForecast("Total Clouds", dailyForecasts, $);
  const lowClouds = getHourlyForecast("Low Clouds", dailyForecasts, $);
  const mediumClouds = getHourlyForecast("Medium Clouds", dailyForecasts, $);
  const highClouds = getHourlyForecast("High Clouds", dailyForecasts, $);
  const rainChance = getHourlyForecast(
    "Precipitation Probability",
    dailyForecasts,
    $
  );
  const rainAmount = getHourlyForecast(
    "Precipitation Amount",
    dailyForecasts,
    $
  );
  const windSpeed = getHourlyForecast("Wind Speed", dailyForecasts, $);
  const temperature = getHourlyForecast("Temperature", dailyForecasts, $);

  return {
    forecastedAt: new Date().toISOString(),
    hourlyForecasts: hours.map((hour, index) => ({
      hour,
      totalClouds: totalClouds[index],
      lowClouds: lowClouds[index],
      mediumClouds: mediumClouds[index],
      highClouds: highClouds[index],
      rainChance: rainChance[index],
      rainAmount: rainAmount[index],
      windSpeed: windSpeed[index],
      temperature: temperature[index],
    })),
  };
};

export const getForecastsFromClearOutside = async (days: number[]) => {
  const clearOutside = await fetch(
    "https://clearoutside.com/forecast/-27.53/153.10"
  );
  const html = await clearOutside.text();
  const $ = cheerio.load(html);

  const forecasts = days.map((day) => getForecastsForDay(day, $));

  return forecasts;
};
