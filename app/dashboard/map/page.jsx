// "use client"
// import { selectAllStructures, selectStructureById } from "@/app/features/structures/structuresApiSlice";
// import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"
// import { selectAllBoxes } from "@/app/features/boxes/boxesApiSlice"
// import PageTitle from "@/app/components/main/PageTitle"
// import { MapData } from "@/app/lib/constants"
// import { useSelector } from "react-redux"
// import { toast } from "react-toastify"
// import "leaflet/dist/leaflet.css"
// import { useState } from "react"
// import L from "leaflet"

// const MapNama = () => {

//   const [coords, setCoords] = useState({ lat: 0, lng: 0 })
//   const [markerPosition, setMarkerPosition] = useState(null)
//   const [structureId, setStructureId] = useState('')

//   const [mapObject, setMapObject] = useState({
//     id: "",
//     way: "",
//     address: "",
//     structure: "",
//     area: 0,
//     dimensions: "",
//     locationX: 0,
//     locationY: 0,
//     same: "",
//   })

//   const boxes = useSelector(state => selectAllBoxes(state))
//   const structures = useSelector(state => selectAllStructures(state))
//   const structure = useSelector(state => selectStructureById(state, structureId))
//   const boxStr = boxes.map(box => box.structures.find(str => str.structureId === structureId))

//   function LeafIcon({ iconUrl }) {
//     L.Icon.call(this, {
//       iconUrl,
//       shadowUrl: '',
//       iconSize: [42, 42],
//       shadowSize: [50, 50],
//       iconAnchor: [38, 38],
//       shadowAnchor: [38, 38],
//       popupAnchor: [-20, -38],
//     });
//   }
  
//   LeafIcon.prototype = Object.create(L.Icon.prototype);
//   LeafIcon.prototype.constructor = LeafIcon;
  
//   const purpleIcon = new LeafIcon({ iconUrl: '/images/Billboard-purple.png' })
//   const yellowIcon = new LeafIcon({ iconUrl: '/images/Billboard-yellow.png' })

//   const handleMapClick = (e) => {
//     setCoords({ lat: e.latlng.lat, lng: e.latlng.lng })
//     setMarkerPosition(e.latlng)
//   };


//   function MapClickHandler() {
//     useMapEvents({
//       click: handleMapClick,
//     })
//     return null
//   }

//   // console.log(MapData)

//   return (
//     <main className="min-h-screen">
//         <PageTitle name="نقشه"/>
//         <form 
//           className="flex items-start justify-center gap-3 mb-6"
//         >
//           <div className='flex flex-col items-start  gap-3'>
//             <label htmlFor="typeName" className='text-[#767676] text-center font-bold'>کد سامانه </label>
//             <select 
//               onChange={(e) => setStructureId(e.target.value)}
//               className="select select-bordered max-w-xs w-full px-6 py-3 rounded-xl h-16 bg-[#E6E6E6] outline-none text-black"
//             >
//               {
//                 structures.map((structure) => (
//                   <option
//                     value={structure.id}
//                     key={structure.id}
//                     id="typeName"
//                 >
//                   {structure.name}
//                 </option>
//                 ))
//               }
//             </select>
//             <small className="text-xs text-rose-600 "> 
//             </small>
//           </div>

//           <div className='flex flex-col items-start w-2/6 gap-3'>
//             <label htmlFor="locationX" className='text-[#767676] text-center font-bold'> افقی</label>
//             <input
//               disabled
//               type="text"
//               id="locationX"
//               className="input-primary w-full"
//               placeholder="location X"
//               value={coords.lat}
//             />
//           </div>

//           <div className='flex flex-col items-start w-2/6 gap-3'>
//             <label htmlFor="locationY" className='text-[#767676] text-center font-bold'>عمودی</label>
//             <input
//               disabled
//               type="text"
//               id="locationY"
//               className="input-primary w-full "
//               placeholder="location Y" 
//               value={coords.lng}
//             />
//           </div>

//           <div className='flex flex-col items-start w-1/6 gap-3'>
//           <label htmlFor="addToMap" className='text-[#767676] text-center font-bold'>ADD</label>
//             <button 
//               id="addToMap"
//               className="btn-primary m-0 w-full"
//               onClick={(e) => {
//                 e.preventDefault()
//                 const boxStr = boxes.map(box => box.structures.find(str => 
//                    str.structureId === structureId
//                 ))
//                 // console.log("boxStr", boxStr)

//                 MapData.push({
//                   id: structureId,
//                   way: structure?.location?.path,
//                   address: structure?.location?.address,
//                   structure: boxStr[0]? boxStr[0].marks.name : 'تعریف نشده',
//                   area: boxStr[0]? boxStr[0].marks.markOptions.length * boxStr[0].marks.markOptions.width  : 'تعریف نشده',
//                   dimensions: `${boxStr[0]? `${boxStr[0].marks.markOptions.length} * ${boxStr[0].marks.markOptions.width}` : "تعریف نشده"}`,
//                   locationX: coords.lat,
//                   locationY: coords.lng,
//                   same: "",
//                 })
//                 toast.success("سازه با موفقیت به مپ اضافه شد")
//               }}
//             >افزودن</button>
//           </div>
//         </form>
        
//         <div className="w-full h-[600px] mb-4 relative rounded-xl z-40">
//           <MapContainer
//             className="outline-none h-full"
//             center={[35.73825, 51.50962]}
//             zoom={16}
//             scrollWheelZoom={true}
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             {markerPosition && <Marker position={markerPosition} icon={yellowIcon} />}
//             <MapClickHandler />
//           {MapData.map((item) => {
//             return(
//               <Marker
//                 key={item.id}
//                 icon={purpleIcon}
//                 position={[item.locationX, item.locationY]}
//               >
//                 <Popup>
//                   A pretty CSS3 popup. <br /> Easily customizable.
//                 </Popup>
//             </Marker>
//             )
//           })}
//           </MapContainer>
//         </div>
//     </main>
//   )
// }

// export default MapNama
import React from 'react'

const MapNama = () => {
  return (
    <div>MapNama</div>
  )
}

export default MapNama