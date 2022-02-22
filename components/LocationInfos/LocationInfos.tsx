import { useState } from "react";

import styles from "./LocationInfos.module.scss";

import LocationInfo from "../LocationInfo/LocationInfo";
import { ILocationAPIInternalData } from "../../models/location-api";

const LocationInfos: React.FC<{ data: ILocationAPIInternalData }> = (props) => {
  const data = props.data;
  const ip = data?.ip || "";
  const location = data?.location || "";
  const timezone = data?.timezone ? `UTC ${data.timezone}` : "";
  const isp = data?.isp || "";

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
