"use client";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import {
  selectAllBoxes,
  useGetAllBoxesQuery,
} from "@/app/apiSlices/boxesApiSlice";
import PageTitle from "@/app/components/main/PageTitle";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import {
  selectAllStructures,
  selectStructureById,
  useGetStructuresQuery,
} from "@/app/apiSlices/structuresApiSlice";
import dynamic from "next/dynamic";

interface Coords {
  lat: number;
  lng: number;
}

interface MapObject {
  id: string;
  way: string;
  name: string;
  address: string;
  structure: string;
  area: number | string;
  dimensions: string;
  locationX: number;
  locationY: number;
  same: string;
}

interface LeafIconProps {
  iconUrl: string;
}

// Dynamically import BillboardMap to avoid SSR issues with Leaflet and window
const BillboardMap = dynamic(() => import("@/app/features/map/BillboardMap"), {
  ssr: false,
});

const MapNama: React.FC = () => {
  const [coords, setCoords] = useState<Coords>({ lat: 0, lng: 0 });
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(null);
  const [structureId, setStructureId] = useState<string>("");
  const [MapData, setMapData] = useState<MapObject[]>([]);

  // Leaflet icons and map events are only available on the client
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Leaflet-related initialization
    const LeafIcon = (iconUrl: string): L.Icon => {
      return new L.Icon({
        iconUrl,
        shadowUrl: "",
        iconSize: [42, 42],
        shadowSize: [50, 50],
        iconAnchor: [38, 38],
        shadowAnchor: [38, 38],
        popupAnchor: [-20, -38],
      });
    };

    const purpleIcon = LeafIcon("/images/Bill 1.png");
    const yellowIcon = LeafIcon("/images/Bill 2.png");

    // Function to handle map clicks
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      setMarkerPosition(e.latlng);
    };

    function MapClickHandler() {
      useMapEvents({
        click: handleMapClick,
      });
      return null;
    }
  }, []);

  useGetAllBoxesQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  useGetStructuresQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  const boxes = useSelector((state: any) => selectAllBoxes(state)).filter(
    (x: any) => !x.isArchived
  );
  const structures = useSelector((state: any) => selectAllStructures(state));
  const structure = useSelector((state: any) =>
    selectStructureById(state, structureId)
  );
  const boxStr = boxes.map((box: any) =>
    box.structures.find((str: any) => str.structureId === structureId)
  );

  return (
    <main className="min-h-screen">
      <PageTitle name="نقشه" />
      <form className="flex items-start justify-center gap-3 mb-6">
        <div className="flex flex-col items-start gap-3">
          <label
            htmlFor="typeName"
            className="text-[#767676] text-center font-bold"
          >
            کد سامانه
          </label>
          <select
            onChange={(e) => setStructureId(e.target.value)}
            className="select select-bordered max-w-xs w-full px-6 py-3 rounded-xl h-16 bg-[#E6E6E6] outline-none text-black"
          >
            <option value={""} hidden>
              انتخاب کنید
            </option>
            {structures.map((structure: any) => (
              <option value={structure.id} key={structure.id} id="typeName">
                {structure.name}
              </option>
            ))}
          </select>
          <small className="text-xs text-rose-600"></small>
        </div>

        <div className="flex flex-col items-start w-2/6 gap-3">
          <label
            htmlFor="locationX"
            className="text-[#767676] text-center font-bold"
          >
            افقی
          </label>
          <input
            disabled
            type="text"
            id="locationX"
            className="input-primary w-full"
            placeholder="location X"
            value={coords.lat}
          />
        </div>

        <div className="flex flex-col items-start w-2/6 gap-3">
          <label
            htmlFor="locationY"
            className="text-[#767676] text-center font-bold"
          >
            عمودی
          </label>
          <input
            disabled
            type="text"
            id="locationY"
            className="input-primary w-full"
            placeholder="location Y"
            value={coords.lng}
          />
        </div>

        <div className="flex flex-col items-start w-1/6 gap-3">
          <label
            htmlFor="addToMap"
            className="text-[#767676] text-center font-bold"
          >
            ADD
          </label>
          <button
            id="addToMap"
            className="primaryButton m-0 w-full"
            onClick={(e) => {
              e.preventDefault();
              const boxStr = boxes
                .map((box: any) =>
                  box.structures.find(
                    (str: any) => str.structureId === structureId
                  )
                )
                .filter((y: any) => !!y);

              if (structure && structure.location && structure.name) {
                setMapData((prevData: MapObject[]) => [
                  ...prevData,
                  {
                    id: structureId,
                    way: structure.location.path,
                    name: structure.name,
                    address: structure.location.address,
                    structure: boxStr[0] ? boxStr[0].marks.name : "Undefined",
                    area: boxStr[0]
                      ? boxStr[0].marks.markOptions.length *
                        boxStr[0].marks.markOptions.width
                      : "Undefined",
                    dimensions: boxStr[0]
                      ? `${boxStr[0].marks.markOptions.length} * ${boxStr[0].marks.markOptions.width}`
                      : "Undefined",
                    locationX: coords.lat,
                    locationY: coords.lng,
                    same: "",
                  },
                ]);
              } else {
                alert("Structure is not properly defined.");
              }

              toast.success("سازه با موفقیت به مپ اضافه شد");
              setMarkerPosition(null);
            }}
          >
            افزودن
          </button>
        </div>
      </form>
      {/* <BillboardMap
        data={MapData}
        MapClickHandler={() => {
          useMapEvents({
            click: (e) => {
              setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
              setMarkerPosition(e.latlng);
            },
          });
          return null;
        }}
        markerPosition={markerPosition}
      /> */}
    </main>
  );
};

export default MapNama;
