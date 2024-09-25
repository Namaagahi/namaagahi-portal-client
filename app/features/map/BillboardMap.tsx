import { useEffect, useState, useRef, FC } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L, { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import classes from "./styles.module.css";
import { GrPowerReset } from "react-icons/gr";

const bounds: LatLngBoundsExpression = [
  [24.396308, 44.032249], // Southwest coordinates
  [39.782079, 63.333271], // Northeast coordinates
];

const purpleIcon = new L.Icon({
  iconUrl: "/images/Bill 1.png",
  iconSize: [36, 38],
  iconAnchor: [18, 38],
  popupAnchor: [-20, -38],
});

const yellowIcon = new L.Icon({
  iconUrl: "/images/Bill 2.png",
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

const yellowStrawboardIcon = new L.Icon({
  iconUrl: "/images/Str 1.png",
  iconSize: [36, 38],
  iconAnchor: [18, 38],
  popupAnchor: [-20, -38],
});

interface IBillboardMapProps {
  data: any;
  MapClickHandler: any;
  markerPosition: any;
}

const BillboardMap: FC<IBillboardMapProps> = ({
  data,
  MapClickHandler,
  markerPosition,
}) => {
  const [billboards, setBillboards] = useState([]);
  const [ways, setWays] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWay, setSelectedWay] = useState("همه");
  const [selectedStructure, setSelectedStructure] = useState("");
  const [code, setCode] = useState("");
  const [filter, setFilter] = useState("کد");
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize available ways based on the data
    const uniqueWays = [...new Set(data.map((item: any) => item.way))];
    setWays(uniqueWays);
  }, [data, markerPosition]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to add billboards based on filters
  const addBillboards = (info = {}) => {
    const filteredData = data.filter((item: any) => {
      const matchesWay = selectedWay === "all" || item.way === selectedWay;
      const matchesCode = !code || item.id.includes(code);
      return matchesWay && matchesCode;
    });

    console.log(data);

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

  // Map controls (drag, bounds, etc.)
  useEffect(() => {
    const map: any = mapRef.current;
    if (map) {
      map.setMaxBounds(bounds);
      map.on("drag", () => {
        map.panInsideBounds(bounds, { animate: false });
      });
    }
  }, [mapRef]);

  return (
    <div>
      <div className="m-5 flex gap-8 items-center">
        <div>
          <label htmlFor="structure-type">نوع سازه :</label>
          <select
            id="structure-type"
            className="select select-bordered mx-2 max-w-xs w-40 px-2 py-3 rounded-xl h-16 bg-[#E6E6E6] outline-none text-black"
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
            className="select select-bordered mx-2 max-w-xs w-40 px-2 py-3 rounded-xl h-16 bg-[#E6E6E6] outline-none text-black"
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
              className="select select-bordered mx-2 max-w-xs w-40 px-2 py-3 rounded-xl h-16 bg-[#E6E6E6] outline-none text-black"
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
              className="input input-bordered mx-2 max-w-xs w-60 px-2 py-3 rounded-xl h-16 bg-[#E6E6E6] outline-none text-black"
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
        className="leaflet-map"
        style={{ height: "90vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {billboards}
        {markerPosition && (
          <Marker position={markerPosition} icon={purpleIcon} />
        )}
        <MapClickHandler />
        {data
          .filter((item: any) =>
            selectedWay === "همه"
              ? item
              : selectedWay === "برایت بورد"
              ? item.structure === "برایت بورد"
              : item.structure !== "برایت بورد"
          )
          .filter((x: any) =>
            selectedStructure === "" ? x : selectedStructure === x.way
          )
          .filter((x: any) => (code === "" ? x : x.name.includes(code)))
          .map((item: any) => {
            const icon =
              item.structure === "برایت بورد"
                ? purpleStrawboardIcon
                : purpleIcon;
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
          })}
      </MapContainer>
    </div>
  );
};

export default BillboardMap;
