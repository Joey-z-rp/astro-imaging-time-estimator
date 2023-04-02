import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { Estimate } from "@/types/neural-network";
import { Estimates } from "@/components/Estimates";

export default function Home() {
  const [estimates, setEstimates] = useState<Estimate[]>();
  const [startTime, setStartTime] = useState<string>("19");
  const [duration, setDuration] = useState<number>(5);
  const [exposureLength, setExposureLength] = useState<number>(240);

  const getEstimates = () => {
    fetch(
      `/api/get-estimates?startTime=${startTime}&duration=${duration}&exposureLength=${exposureLength}`
    )
      .then((res) => res.json())
      .then(setEstimates);
  };

  return (
    <>
      <Head>
        <title>Estimate Imaging Time</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Estimate Imaging Time</h1>
        <iframe
          className={styles["weather-display"]}
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
          type="number"
          placeholder="Duration"
          value={duration}
          onChange={(event) => setDuration(Number(event.target.value))}
        />
        <label>Exposure Length</label>
        <input
          type="number"
          placeholder="Exposure length"
          value={exposureLength}
          onChange={(event) => setExposureLength(Number(event.target.value))}
        />
        <button onClick={getEstimates}>Run Estimation</button>
        <Estimates estimates={estimates} />
      </main>
    </>
  );
}
