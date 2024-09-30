import { useEffect, useState, useRef, FC } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MdDelete } from "react-icons/md";
import L, { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useDeleteLocationMutation } from "@/app/apiSlices/locationsApiSlice";
import Image from "next/image";

const bounds: LatLngBoundsExpression = [
  [24.396308, 44.032249], // Southwest coordinates
  [39.782079, 63.333271], // Northeast coordinates
];

const locationIcon = new L.Icon({
  iconUrl: "/images/maps-and-location.png",
  iconSize: [36, 38],
  iconAnchor: [18, 38],
  popupAnchor: [-20, -38],
});

const purpleIcon = new L.Icon({
  iconUrl: "/images/Bill 1.png",
  iconSize: [36, 38],
  iconAnchor: [18, 38],
  popupAnchor: [-20, -38],
});

const purpleStrawboardIcon = new L.Icon({
  iconUrl: "/images/Str 2.png",
  iconSize: [36, 38],
  iconAnchor: [18, 38],
  popupAnchor: [-20, -38],
});

// BillboardMap component props interface
interface IBillboardMapProps {
  data: any;
  MapClickHandler: any;
  markerPosition: any;
}

const BillboardMap: FC<IBillboardMapProps> = ({
  data,
  markerPosition,
  MapClickHandler,
}) => {
  const [billboards, setBillboards] = useState<JSX.Element[]>([]);
  const [ways, setWays] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWay, setSelectedWay] = useState("همه");
  const [selectedStructure, setSelectedStructure] = useState("");
  const [code, setCode] = useState("");
  const [filter, setFilter] = useState("کد");
  const mapRef = useRef<any>(null); // Changed to 'any' for better reference typing

  const [
    deleteNewLocation,
    { isLoading: deleteLoading, isError: deleteError },
  ] = useDeleteLocationMutation();

  useEffect(() => {
    // Initialize available ways based on the data
    const uniqueWays = [
      ...new Set(data.map((item: any) => item.structure.location.path)),
    ];
    setWays(uniqueWays);
  }, [data, markerPosition]);

  const addBillboards = () => {
    const filteredData = data.filter((item: any) => {
      const matchesWay = selectedWay === "all" || item.way === selectedWay;
      const matchesCode = !code || item.id.includes(code);
      return matchesWay && matchesCode;
    });

    const newBillboards = filteredData.map((item: any) => {
      const icon =
        item.structure === "استرابرد" ? purpleStrawboardIcon : purpleIcon;
      return (
        <Marker
          key={item.id}
          position={[item.locationX, item.locationY]}
          icon={icon}
        >
          <Popup>
            <img src={`images/${item.id}.jpg`} alt={item.id} />
            <p>{item.address}</p>
          </Popup>
        </Marker>
      );
    });

    setBillboards(newBillboards);
  };

  // Handle form changes
  const handleWayChange = (event: any) => {
    setSelectedWay(event.target.value);
    addBillboards();
  };

  const handleStructureChange = (event: any) => {
    setSelectedStructure(event.target.value);
    addBillboards();
  };

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value);
    addBillboards();
  };

  const handleCodeChange = (event: any) => {
    setCode(event.target.value);
    addBillboards();
  };

  // Set map bounds and ensure it runs only on client
  useEffect(() => {
    const map: any = mapRef.current;
    if (map) {
      map.setMaxBounds(bounds);
      map.on("drag", () => {
        map.panInsideBounds(bounds, { animate: false });
      });
    }
  }, [mapRef]);
  console.log(data);

  return (
    <div>
      <div className="m-5 mb-10 flex gap-8 items-center">
        <div>
          <label htmlFor="structure-type">نوع سازه :</label>
          <select
            id="structure-type"
            className="select select-bordered mx-2 max-w-xs w-40 px-2  rounded-lg h-11 bg-[#E6E6E6] outline-none text-black"
            onChange={handleWayChange}
          >
            <option value="همه">همه</option>
            <option value="بیلبورد">بیلبورد</option>
            <option value="برایت بورد">برایت بورد</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter"> فیلتر بر اساس :</label>
          <select
            id="filter"
            className="select select-bordered mx-2 max-w-xs w-40 px-2  rounded-lg h-11 bg-[#E6E6E6] outline-none text-black"
            onChange={handleFilterChange}
          >
            <option value="کد">کد</option>
            <option value="مسیر"> مسیر</option>
          </select>
        </div>
        {filter === "مسیر" && (
          <div>
            <label htmlFor="filter">انتخاب مسیر :</label>
            <select
              id="filter"
              className="select select-bordered mx-2 max-w-xs w-40 px-2  rounded-lg h-11 bg-[#E6E6E6] outline-none text-black"
              onChange={handleStructureChange}
            >
              <option value={""}>همه ی مسیر ها</option>
              {ways.map((x, i) => (
                <option id={i.toString()} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
        )}
        {filter !== "مسیر" && (
          <div>
            <label htmlFor="input"> کد :</label>
            <input
              id="input"
              className="input input-bordered mx-2 max-w-xs w-60 px-2  rounded-lg h-11 bg-[#E6E6E6] outline-none text-black"
              onChange={handleCodeChange}
              placeholder="کد بیلبورد را وارد کنید"
            />
          </div>
        )}
      </div>
      {/* Map */}
      <MapContainer
        center={[35.738353098726066, 51.38344693046433]}
        zoom={12}
        minZoom={6}
        maxZoom={18}
        bounds={bounds}
        ref={mapRef}
        className="leaflet-map z-10"
        style={{ height: "90vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {billboards}
        {markerPosition && (
          <Marker position={markerPosition} icon={locationIcon} />
        )}
        <MapClickHandler />
        {data
          .filter((item: any) =>
            selectedWay === "همه"
              ? item
              : selectedWay === "برایت بورد"
              ? item.structure.name.startsWith("BR")
              : !item.structure.name.startsWith("BR")
          )
          .filter((x: any) =>
            selectedStructure === ""
              ? x
              : selectedStructure === x.structure.location.path
          )
          .filter((x: any) =>
            code === "" ? x : x.structure.name.includes(code)
          )
          .map((item: any) => {
            const icon = item.structure.name.startsWith("BR")
              ? purpleStrawboardIcon
              : purpleIcon;
            return (
              <Marker
                key={item.id}
                position={[item.locationX, item.locationY]}
                icon={icon}
              >
                <Popup className="flex-col">
                  <Image
                    width={300}
                    height={300}
                    style={{
                      width: "400px",
                      height: "14rem",
                      borderRadius: "5px",
                      marginTop: "0.6rem",
                    }}
                    src={`/png/${item.structure.name}.PNG`}
                    alt={item.structure.name}
                  />
                  <p
                    style={{
                      maxWidth: "300px",
                      fontSize: "1.3rem",
                      textAlign: "center",
                      color: "#4a4a49",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    {item.structure.name}
                  </p>
                  <div className="flex-row justify-between">
                    <p
                      style={{
                        minWidth: "300px",
                        fontSize: "1.2rem",
                        textAlign: "right",
                        color: "#4a4a49",
                        fontWeight: "bold",
                        marginTop: 5,
                        marginBottom: 0,
                      }}
                    >
                      {item.structure.location.address}
                    </p>
                    <button
                      className="text-gray-500 hover:text-red-600 hover:scale-110 text-2xl"
                      onClick={() => deleteNewLocation({ id: item.id })}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default BillboardMap;
