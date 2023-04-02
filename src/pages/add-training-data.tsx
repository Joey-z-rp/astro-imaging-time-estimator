import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/AddTrainingData.module.css";
import { useState } from "react";
import { Forecast } from "@/types/forecast";

const inter = Inter({ subsets: ["latin"] });

export default function AddTrainingData() {
  const [data, setData] = useState<string>();
  const [startTime, setStartTime] = useState<string>("19");
  const [duration, setDuration] = useState<number>(5);

  const getForecasts = () => {
    fetch("/api/get-forecasts")
      .then((res) => res.json())
      .then((res: { forecastedAt: string; hourlyForecasts: Forecast[] }) => {
        const hourlyForecasts = res.hourlyForecasts;
        const startIndex = hourlyForecasts.findIndex(
          (f) => f.hour === startTime
        );
        const filteredForecasts = hourlyForecasts.slice(
          startIndex,
          startIndex + duration
        );
        const forecasts = {
          ...res,
          hourlyForecasts: filteredForecasts,
        };
        const jsonString = JSON.stringify(
          {
            createdAt: new Date().toLocaleString(),
            exposureLength: 240,
            totalImagingTime: 0,
            ...forecasts,
          },
          null,
          2
        );

        setData(jsonString);
      });
  };

  const saveData = () => {
    fetch("/api/save-training-data", { method: "POST", body: data });
  };

  return (
    <>
      <Head>
        <title>Add training data</title>
      </Head>
      <main>
        <h1>Add training data</h1>
        <iframe
          className={styles["data-display"]}
          src="https://clearoutside.com/forecast/-27.53/153.10"
        ></iframe>
        <label>Start time</label>
        <input
          placeholder="Start time"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
        />
        <label>Duration</label>
        <input
          placeholder="Duration"
          value={duration}
          onChange={(event) => setDuration(Number(event.target.value))}
        />
        <button onClick={getForecasts}>Get forecasts</button>
        <button onClick={saveData}>Save data</button>
        <textarea
          className={styles["data-display"]}
          value={data}
          onChange={(event) => setData(event.target.value)}
        />
      </main>
    </>
  );
}
