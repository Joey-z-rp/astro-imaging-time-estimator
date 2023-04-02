import Head from "next/head";
import styles from "@/styles/TrainModel.module.css";
import { useState } from "react";

export default function TrainModel() {
  const [trainingResult, setTrainingResult] = useState();

  const trainModel = () => {
    fetch("/api/train-model", { method: "POST" })
      .then((res) => res.json())
      .then((res) => setTrainingResult(res));
  };

  return (
    <>
      <Head>
        <title>Train</title>
      </Head>
      <main>
        <h1>Train</h1>
        <button onClick={trainModel}>Train</button>
        <code className={styles["training-result"]}>
          {JSON.stringify(trainingResult, null, 2)}
        </code>
      </main>
    </>
  );
}
