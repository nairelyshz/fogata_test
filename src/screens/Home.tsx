import Map from "../components/Map";
import { useState } from "react";

export default function Home() {
  const [placesList, setPlaces] = useState<any[]>([]);
  return (
    <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 rounded">
      <div className="col-span-12 md:col-span-8">
        <div className="text-xl md:text-2xl mb-10">
          Selecciona un lugar en el mapa
        </div>

        <Map
          onPlaces={(data) => {
            setPlaces(data);
          }}
        />
      </div>
      <div className="col-span-12 md:col-span-4 relative">
        <div className="text-xl md:text-2xl mb-10">Lugares seleccionados</div>

        <div className="max-h-[300px] md:max-h-[470px] lg:max-h-[700px]  overflow-auto">
          {placesList.length === 0 && (
            <div className="text-center text-sm text-gray-400 mt-10">
              No se ha seleccionado ningún lugar en el mapa.
            </div>
          )}
          {placesList.map((p, index) => (
            <div
              key={index}
              className="text-sm bg-yellow-100 p-2 border border-1 border-gray-200 rounded w-full"
            >
              {p.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
