import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { services } from "../services";
import { placesMock } from "../demo/info";

const ShowMarkers = ({ legend, markers }: any) => {
  return markers.map((marker: any, index: number) => {
    return (
      <Marker
        key={index}
        position={marker.position}
        draggable={true}
        eventHandlers={{
          moveend(e) {
            const { lat, lng } = e.target.getLatLng();
            legend.textContent = `change position: ${lat} ${lng}`;
          },
        }}
      >
        <Popup>
          <button>{marker.label}</button>
        </Popup>
      </Marker>
    );
  });
};

const Markers = ({ map, onMarkers }: any) => {
  const [marker, setMarker] = useState<any[]>([]);
  const [legend, setLegend] = useState<any>();

  useEffect(() => {
    if (!map) return;
    const legend: any = (L as any).control({ position: "bottomleft" });

    const info = L.DomUtil.create("div", "legend");

    legend.onAdd = () => {
      info.textContent = `click on the map, move the marker, click on the marker`;
      return info;
    };

    legend.addTo(map);

    map.on("click", (e: any) => {
      updateMarker(e, info);
    });
    setMarker([...marker, ...placesMock]);
  }, [map]);

  const updateMarker = (e: any, info: any) => {
    services.authService.getAddress(e.latlng).then(({ data }: any) => {
      const { lat, lng } = e.latlng;
      setMarker((mar: any) => [
        ...mar,
        {
          long: `${data.display_name}`,
          label: `${data.name}, ${data.address.state || ""}, ${
            data.address.country_code
          }`,
          position: [lat, lng],
        },
      ]);

      info.textContent = `${e.latlng}`;
      setLegend(info);
    });
  };
  useEffect(() => {
    onMarkers(marker);
  }, [marker]);

  return marker.length > 0 && legend !== undefined ? (
    <ShowMarkers mapContainer={map} legend={legend} markers={marker} />
  ) : null;
};

export default function Map({ onPlaces }: { onPlaces: (p: any) => void }) {
  const [map, setMap] = useState<any>(null);

  return (
    <div>
      <MapContainer
        ref={setMap}
        className="h-[300px] md:h-[500px] lg:h-[700px] w-full"
        center={[10.4971216874344, -66.88521861232971]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Markers map={map} onMarkers={onPlaces} />
      </MapContainer>
    </div>
  );
}
