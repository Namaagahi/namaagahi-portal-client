"use client";

import { useMapEvents } from "react-leaflet";
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
import {
  BoxObject,
  CombinedStructure,
  locationObject,
  StructureObject,
} from "@/app/lib/interfaces";
import {
  selectAllLocations,
  useAddNewLocationMutation,
  useGetLocationsQuery,
} from "@/app/apiSlices/locationsApiSlice";
import useAuth from "@/app/hooks/useAuth";
import { useGetAllInitialCustomersQuery } from "@/app/apiSlices/initialCustomersApiSlice";
import { FaTimes } from "react-icons/fa";
import usePageTitle from "@/app/hooks/usePageTitle";

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

// Dynamically import BillboardMap to avoid SSR issues with Leaflet and window
const BillboardMap = dynamic(() => import("@/app/features/map/BillboardMap"), {
  ssr: false,
});

const MapNama: React.FC = () => {
  const [coords, setCoords] = useState<Coords>({ lat: 0, lng: 0 });
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(null);
  const [structureId, setStructureId] = useState<string>("");
  const [MapData, setMapData] = useState<locationObject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { id } = useAuth();

  usePageTitle("نقشه");

  const { isLoading, isError } = useGetLocationsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const allLocations: locationObject[] = useSelector(
    (state) => selectAllLocations(state) as locationObject[]
  );

  const [addNewLocation, { isLoading: addLoading, isError: addError, error }] =
    useAddNewLocationMutation();

  useEffect(() => {
    setMapData(allLocations);
  }, [allLocations]);

  useGetAllBoxesQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  useGetStructuresQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  useGetAllBoxesQuery(undefined);
  useGetStructuresQuery(undefined);
  useGetAllInitialCustomersQuery(undefined);

  const allBoxes: BoxObject[] = useSelector(
    (state) => selectAllBoxes(state) as BoxObject[]
  );
  const allStructures: StructureObject[] = useSelector(
    (state) => selectAllStructures(state) as StructureObject[]
  );
  const allMyBoxes: BoxObject[] = allBoxes.filter((x) => !x.isArchived);
  const inBoxStructures = allStructures.filter(
    (structure: any) => structure.isChosen
  );
  const boxStructures = allMyBoxes.flatMap((box: any) => box.structures);
  const inBoxStructuresLookup = inBoxStructures.reduce(
    (acc: any, chosenStructure: any) => ({
      ...acc,
      [chosenStructure.id]: chosenStructure,
    }),
    {}
  );

  const combinedStructures: CombinedStructure[] = boxStructures
    .map((boxStructure: CombinedStructure) => ({
      ...boxStructure,
      ...inBoxStructuresLookup[boxStructure.structureId],
    }))
    .filter((x) => x.isChosen)
    .filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

  const structure = useSelector((state: any) =>
    selectStructureById(state, structureId)
  );

  // Filter the structures based on the search term
  const filteredStructures = combinedStructures.filter((structure) =>
    structure.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (id: any) => {
    setStructureId(id); // Set the selected structure ID
    setSearchTerm("");
    setShowDropdown(false); // Close the dropdown after selection
  };

  return (
    <main className="min-h-screen">
      <PageTitle name="نقشه" />
      <form className="flex items-start justify-center gap-3 mb-6">
        <div className="flex flex-col items-start gap-3">
          <div className="relative">
            <label
              htmlFor="typeName"
              className="text-[#767676] text-center font-bold"
            >
              کد سامانه
            </label>
            {/* Input container with icon */}
            <div className="relative w-full">
              <input
                id="typeName"
                type="text"
                value={structure && !searchTerm ? structure.name : searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowDropdown(true)} // Show dropdown when input is focused
                placeholder={`${
                  structure && !searchTerm ? structure.name : "جستجو..."
                }`}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {/* Icon */}
              <div
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 hover:scale-110 cursor-pointer"
                onClick={() => {
                  setStructureId("");
                  setShowDropdown(false);
                }}
              >
                <FaTimes />
              </div>
            </div>

            {showDropdown && (
              <ul className="absolute z-20 w-full bg-white dark:bg-black border border-gray-300 rounded-md max-h-96 overflow-y-auto">
                {filteredStructures.length > 0 ? (
                  filteredStructures.map((structure) => (
                    <li
                      key={structure.id}
                      onClick={() => handleSelect(structure.id)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                    >
                      {structure.name}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2">موردی یافت نشد</li>
                )}
              </ul>
            )}
          </div>
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
              const boxStr = allBoxes
                .map((box: any) =>
                  box.structures.find(
                    (str: any) => str.structureId === structureId
                  )
                )
                .filter((y: any) => !!y);

              if (structure && structure.location && structure.name) {
                // setMapData((prevData: MapObject[]) => [
                //   ...prevData,
                //   {
                //     id: structureId,
                //     way: structure.location.path,
                //     name: structure.name,
                //     address: structure.location.address,
                //     structure: boxStr[0] ? boxStr[0].marks.name : "Undefined",
                //     area: boxStr[0]
                //       ? boxStr[0].marks.markOptions.length *
                //         boxStr[0].marks.markOptions.width
                //       : "Undefined",
                //     dimensions: boxStr[0]
                //       ? `${boxStr[0].marks.markOptions.length} * ${boxStr[0].marks.markOptions.width}`
                //       : "Undefined",
                //     locationX: coords.lat,
                //     locationY: coords.lng,
                //     same: "",
                //   },
                // ]);
                addNewLocation({
                  structureId: structureId,
                  userId: id,
                  locationX: coords.lat,
                  locationY: coords.lng,
                  same: "",
                });
                if (addLoading) toast.success("سازه با موفقیت به مپ اضافه شد");
                else if (addError) {
                  "status" in error! &&
                    error.status === 409 &&
                    toast.error("این سازه قبلا ثبت شده است");
                }
              } else {
                toast.error("ابتدا سازه را انتخاب کنید");
              }
              setMarkerPosition(null);
            }}
          >
            افزودن
          </button>
        </div>
      </form>
      <BillboardMap
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
      />
    </main>
  );
};

export default MapNama;
