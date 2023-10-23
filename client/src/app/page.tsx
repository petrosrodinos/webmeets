import styles from "./page.module.css";
import env from "../lib/env";

export default function Home() {
  return <main className={styles.main}>hoho:{env.API_URL}</main>;
}
