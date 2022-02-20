import styles from "./LocationInfo.module.scss";

const LocationInfo: React.FC<{ label: string; value: string }> = (props) => {
  return (
    <div className={styles.info}>
      <div className={styles.label}>{props.label}</div>
      <div className={styles.value}>{props.value}</div>
    </div>
  );
};

export default LocationInfo;
