import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/AddTrainingData.module.css";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function AddTrainingData() {
  const [data, setData] = useState();

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

        <button
          onClick={() =>
            fetch("/api/get-forecasts")
              .then((res) => res.json())
              .then((res) => setData(res))
          }
        >
          Get forecasts
        </button>
        <textarea
          className={styles["data-display"]}
          value={JSON.stringify(data, null, 2)}
        />
      </main>
    </>
  );
}
