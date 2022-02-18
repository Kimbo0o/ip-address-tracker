import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Frontend Mentor | IP Address Tracker</title>
        <meta name="description" content="Frontend Mentor Challenge" />
        <link rel="icon" type="iamge/png" href="/favicon-32x32.png" />
      </Head>
      <header>
        <h1>IP Address Tracker</h1>
        <input type="text" className="ip-input"></input>
      </header>
    </div>
  );
};

export default Home;
