import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const [ip, setIp] = useState("192.212.174.101");
  const [location, setLocation] = useState("Brooklyn, NY 10001");
  const [timezone, setTimezone] = useState("UTC-05:00");
  const [isp, setIsp] = useState("SpaceX Starlink");

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Mentor | IP Address Tracker</title>
        <meta name="description" content="Frontend Mentor Challenge" />
        <link rel="icon" type="iamge/png" href="/favicon-32x32.png" />
      </Head>
      <header className={styles.header}>
        <h1>IP Address Tracker</h1>
        <input
          type="text"
          className={styles["input-address"]}
          placeholder="Search for any IP address or domain"
        ></input>
      </header>
      <main>
        <div className={styles["information-wrap"]}>
          <div className={styles.information}>
            <div className={styles.label}>IP Address</div>
            <div className={styles.value}>{ip}</div>
          </div>
          <div className={styles.information}>
            <div className={styles.label}>Location</div>
            <div className={styles.value}>{location}</div>
          </div>
          <div className={styles.information}>
            <div className={styles.label}>Timezone</div>
            <div className={styles.value}>{timezone}</div>
          </div>
          <div className={styles.information}>
            <div className={styles.label}>ISP</div>
            <div className={styles.value}>{isp}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
