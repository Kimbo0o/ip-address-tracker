import { useState } from "react";

import styles from "./LocationInfos.module.scss";

import LocationInfo from "../LocationInfo/LocationInfo";

const LocationInfos: React.FC = () => {
  const [ip, setIp] = useState("192.212.174.101");
  const [location, setLocation] = useState("Brooklyn, NY 10001");
  const [timezone, setTimezone] = useState("UTC-05:00");
  const [isp, setIsp] = useState("SpaceX Starlink");

  return (
    <div className={styles.infos}>
      <div className={styles["info-wrap"]}>
        <LocationInfo label="IP Address" value={ip} />
      </div>
      <div className={styles["info-wrap"]}>
        <LocationInfo label="Location" value={location} />
      </div>
      <div className={styles["info-wrap"]}>
        <LocationInfo label="Timezone" value={timezone} />
      </div>
      <div className={styles["info-wrap"]}>
        <LocationInfo label="ISP" value={isp} />
      </div>
    </div>
  );
};

export default LocationInfos;
