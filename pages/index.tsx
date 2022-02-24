import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

import styles from "../styles/Home.module.scss";

import LocationInfos from "../components/LocationInfos/LocationInfos";
import SearchForm from "../components/SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { ILocationAPIInternalData } from "../models/location-api";

const MapNoSSR = dynamic(() => import("../components/Map/Map"), { ssr: false });

const Home: NextPage = () => {
  const [showMap, setShowMap] = useState(false);
  const [lat, setLat] = useState<number>(51);
  const [lng, setLng] = useState<number>(0);
  const [locationData, setLocationData] =
    useState<ILocationAPIInternalData>(null);

  useEffect(() => {
    loadLocationInfo(null);
  }, []);

  const loadLocationInfo = async (target?: string) => {
    const response = await fetch("/api/location", {
      method: "POST",
      body: JSON.stringify({ target }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const {
      data,
      success,
    }: { data: ILocationAPIInternalData; success: boolean } =
      await response.json();
    if (success) {
      setLocationData(data);
      updateMap(data.lat, data.lng);
    }
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
      </Head>
      <header className={styles.header}>
        <h1 className={styles.headline}>IP Address Tracker</h1>
        <SearchForm onSubmit={loadLocationInfo} />
        <LocationInfos data={locationData} />
      </header>
      <main className={styles.main}>
        {showMap && <MapNoSSR lat={lat} lng={lng} />}
      </main>
    </div>
  );
};

export default Home;
