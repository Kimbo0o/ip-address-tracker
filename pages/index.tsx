import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

import styles from "../styles/Home.module.scss";

import LocationInfos from "../components/LocationInfos/LocationInfos";
import SearchForm from "../components/SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { ILocationAPIInternalData } from "../models/location-api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MapNoSSR = dynamic(() => import("../components/Map/Map"), { ssr: false });

const Home: NextPage = () => {
  const [showMap, setShowMap] = useState(false);
  const [lat, setLat] = useState<number>(51);
  const [lng, setLng] = useState<number>(0);
  const [locationData, setLocationData] =
    useState<ILocationAPIInternalData>(null);

  useEffect(() => {
    // load location info with own initial render
    loadLocationInfo(null);
  }, []);

  /**
   * Loads location info for specific ip/domain or current ip and updates child components
   * @param target Target ip/domain
   */
  const loadLocationInfo = async (target?: string) => {
    const response = await fetch("/api/location", {
      method: "POST",
      body: JSON.stringify({ target }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res", response);
    if (!response.ok) {
      switch (response.status) {
        case 422:
          toast.error(
            "Input could not be processed. Please enter a valid IP address or domain before submitting."
          );
          break;
        case 400:
          toast.error("Please provide IP/Target before submitting.");
          break;
        default:
          toast.error(
            "Error loading data. Please try again with a different input."
          );
      }
      return;
    }
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

  /**
   * Updates Map values and forces reload
   * @param lat Latitude of new position
   * @param lng Longitude of new position
   */
  const updateMap = (lat: number, lng: number) => {
    setLat(lat);
    setLng(lng);
    setShowMap(false);
    setShowMap(true);
  };

  const showError = () => {};

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
      <ToastContainer />
    </div>
  );
};

export default Home;
