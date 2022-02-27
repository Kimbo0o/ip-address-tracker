import styles from "./Map.module.scss";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";

const Map: React.FC<{ lat: number; lng: number }> = (props) => {
  const position: LatLngExpression = [props.lat, props.lng];
  const customIcon = new L.Icon({
    iconUrl: "/icon-location.svg",
    iconRetinaUrl: "/icon-location.svg",
    iconSize: new L.Point(50, 60),
  });
  return (
    <MapContainer className={styles.leaflet} center={position} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={customIcon} position={position}></Marker>
    </MapContainer>
  );
};

export default Map;
