import Link from "next/link";
import styles from "@/styles/Nav.module.css";

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/">Estimate</Link>
      <Link href="/add-training-data">Add Training Data</Link>
      <Link href="/train-model">Train Model</Link>
    </nav>
  );
};
