import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

const tileLayers = {
  OpenStreetMap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  "CartoDB Positron":
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
};

const Map = ({ position, setPosition }) => {
  const [currentLayer, setCurrentLayer] = useState("OpenStreetMap");
  const DEFAULT_LOCATION = [51.481, -0.191];
  return (
    <div>
      <select onChange={(e) => setCurrentLayer(e.target.value)}>
        {Object.keys(tileLayers).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <MapContainer
        className="h-[50vh] rounded-md"
        center={DEFAULT_LOCATION}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileLayers[currentLayer]}
        />
        <Marker position={DEFAULT_LOCATION}>
          <Popup>We are here.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default Map;
