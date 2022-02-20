import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.scss";

import LocationInfos from "../components/LocationInfos/LocationInfos";
import SearchForm from "../components/SearchForm/SearchForm";
import Map from "../components/Map/Map";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Mentor | IP Address Tracker</title>
        <meta name="description" content="Frontend Mentor Challenge" />
        <link rel="icon" type="iamge/png" href="/favicon-32x32.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=optional"
          rel="stylesheet"
        />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.headline}>IP Address Tracker</h1>
        <SearchForm />
        <LocationInfos />
      </header>
      <main>
        <Map />
      </main>
    </div>
  );
};

export default Home;
