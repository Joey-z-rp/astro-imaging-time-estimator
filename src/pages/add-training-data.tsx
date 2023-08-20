import Head from "next/head";
import styles from "@/styles/AddTrainingData.module.css";
import { useState } from "react";
import { Forecast } from "@/types/forecast";
import { findForecasts } from "@/utils/forecast";
import { Nav } from "@/components/Nav";

export default function AddTrainingData() {
  const [data, setData] = useState<string>();
  const [startTime, setStartTime] = useState<string>("19");
  const [duration, setDuration] = useState<number>(5);

  const getForecasts = () => {
    fetch("/api/get-forecasts")
      .then((res) => res.json())
      .then((res: { forecastedAt: string; hourlyForecasts: Forecast[] }) => {
        const forecasts = {
          ...res,
          hourlyForecasts: findForecasts(
            res.hourlyForecasts,
            startTime,
            duration
          ),
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
        <Nav />
        <iframe
          className={styles["weather-display"]}
          src="https://clearoutside.com/forecast/-27.53/153.10"
        ></iframe>
        <div className={styles["data-inputs"]}>
          <label>Start time</label>
          <input
            placeholder="Start time"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
          />
          <label>Duration</label>
          <input
            type="number"
            placeholder="Duration"
            value={duration}
            onChange={(event) => setDuration(Number(event.target.value))}
          />
          <button onClick={getForecasts}>Get forecasts</button>
          <button onClick={saveData}>Save data</button>
        </div>
        <textarea
          className={styles["data-display"]}
          value={data}
          onChange={(event) => setData(event.target.value)}
        />
      </main>
    </>
  );
}
