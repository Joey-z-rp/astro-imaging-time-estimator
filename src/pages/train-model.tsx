import Head from "next/head";
import styles from "@/styles/TrainModel.module.css";
import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";

export default function TrainModel() {
  const [loading, setLoading] = useState(false);
  const [dataSetCount, setDataSetCount] = useState<number>();
  const [trainingResult, setTrainingResult] = useState();
  const [validationResult, setValidationResult] = useState<number>();
  const [numOfTrainingDataSet, setNumOfTrainingDataSet] = useState(1);

  useEffect(() => {
    fetch("/api/get-data-sets-count", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setDataSetCount(res.numOfDataSets);
      });
  }, []);

  const trainModel = () => {
    setLoading(true);
    setValidationResult(undefined);
    fetch("/api/train-model", { method: "POST" })
      .then((res) => res.json())
      .then((res) => {
        setTrainingResult(res);
        setLoading(false);
      });
  };

  const validateModel = () => {
    setLoading(true);
    setTrainingResult(undefined);
    fetch("/api/validate-model", {
      method: "POST",
      body: JSON.stringify({ numOfTrainingDataSet }),
    })
      .then((res) => res.json())
      .then((res) => {
        setValidationResult(res.accuracy);
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Train</title>
      </Head>
      <main>
        <h1>Train</h1>
        <Nav />
        {loading && <div>Training model...</div>}
        <div className={styles["train-model"]}>
          <button
            className={styles.button}
            disabled={loading}
            onClick={trainModel}
          >
            Train model
          </button>
          {trainingResult && !loading && <div>Training result:</div>}
          <code className={styles["training-result"]}>
            {JSON.stringify(trainingResult, null, 2)}
          </code>
        </div>
        <div className={styles["validate-model"]}>
          <h2>Validate model</h2>
          <div>
            Number of training data sets:
            <input
              value={numOfTrainingDataSet}
              onChange={(event) =>
                setNumOfTrainingDataSet(Number(event.target.value))
              }
            />
          </div>
          <div>
            Number of validating data sets:{" "}
            {dataSetCount ? dataSetCount - numOfTrainingDataSet : "-"}
          </div>
          <button
            className={styles.button}
            disabled={loading}
            onClick={validateModel}
          >
            Validate model
          </button>
          {validationResult && !loading && (
            <div className={styles.accuracy}>
              Accuracy:{" "}
              {validationResult.toLocaleString(undefined, {
                style: "percent",
                minimumFractionDigits: 2,
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
