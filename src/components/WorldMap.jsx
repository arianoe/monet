import React, { useEffect, useState } from "react";
import MapGL, { Marker, Popup, NavigationControl } from "@urbica/react-map-gl";
import data from "./data.json";
import "mapbox-gl/dist/mapbox-gl.css";

export const WorldMap = () => {
  const [paintings, setPaintings] = useState([]);
  const [viewport, setViewport] = useState({
    longitude: -1.579876,
    latitude: 54.769845,
    width: window.innerWidth,
    height: window.innerHeight,
    zoom: 4,
  });

  const [selectedPainting, setSelectedPainting] = useState(null);

  useEffect(() => {
    setPaintings(data.data);
  }, []);

  //   console.log(selectedPainting);

  const onMarkerClick = (event, painting) => {
    event.preventDefault();
    setSelectedPainting(painting);
  };

  const onClick = (event) => {
    event.preventDefault();
    const { lngLat } = event;

    const newVewport = {
      ...viewport,
      latitude: lngLat.lat,
      longitude: lngLat.lng,
    };

    setViewport(newVewport);
  };

  return (
    <MapGL
      accessToken="pk.eyJ1IjoiaGFsY2hlc3RlciIsImEiOiJjbGJlYm5ubWcwM2J4M3BuemVqbDR4Nnp4In0.pskeAm6lVBYdpXGtdbYKzQ"
      mapStyle="mapbox://styles/mapbox/light-v9"
      style={{ width: window.innerWidth, height: window.innerHeight }}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      onClick={onClick}
      viewportChangeMethod="flyTo"
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
      viewportChangeOptions={{
        duration: 1500,
      }}
    >
      {selectedPainting ? (
        <Popup
          closeButton={false}
          closeOnClick={false}
          latitude={selectedPainting.location.lat}
          longitude={selectedPainting.location.lng}
          //   onClose={() => setSelectedPainting(null)}
        >
          {selectedPainting.name} - {selectedPainting.year}
        </Popup>
      ) : null}
      {paintings.map((painting, idx) => (
        <Marker
          key={idx}
          latitude={painting.location.lat}
          longitude={painting.location.lng}
          onClick={(e) => {
            e.preventDefault();
            onMarkerClick(e, painting);
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: "red",
              borderRadius: "100%",
            }}
          ></div>
        </Marker>
      ))}
      <NavigationControl showCompass showZoom position="top-right" />
    </MapGL>
  );
};
