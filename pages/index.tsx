import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

import styles from "../styles/Home.module.scss";

import LocationInfos from "../components/LocationInfos/LocationInfos";
import SearchForm from "../components/SearchForm/SearchForm";
import Map from "../components/Map/Map";
import { useEffect, useState } from "react";
import { ILocationAPIInternalData } from "../models/location-api";

const MapNoSSR = dynamic(() => import("../components/Map/Map"), { ssr: false });

const Home: NextPage = () => {
  const [showMap, setShowMap] = useState(false);
  const [lat, setLat] = useState(51);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    // loadLocationInfo(null);
  }, []);

  const loadLocationInfo = async (target?: string) => {
    const response = await fetch("/api/location", {
      method: "POST",
      body: JSON.stringify({ target }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data }: { data: ILocationAPIInternalData } = await response.json();
    updateMap(data.lat, data.lng);
  };

  const updateMap = (lat: number, lng: number) => {
    setLat(lat);
    setLng(lng);
    setShowMap(false);
    setShowMap(true);
  };

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
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.headline}>IP Address Tracker</h1>
        <SearchForm onSubmit={loadLocationInfo} />
        <LocationInfos />
      </header>
      <main>{showMap && <MapNoSSR lat={lat} lng={lng} />}</main>
    </div>
  );
};

export default Home;
