'use client';
// import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import React, { useState } from 'react';
// // import {
// //   GoogleMap,
// //   useJsApiLoader,
// //   Marker,
// //   InfoWindow,
// // } from '@react-google-maps/api';

// interface UserMapData {
//   lat: number;
//   lng: number;
// }

// interface Props {
//   lat: number;
//   lng: number;
//   height: string;
//   zoom?: number;
//   showInfoWindow?: boolean;
//   children?: any;
//   formatted_address?: string;
//   mapAddressFiled?: any;
//   mapCurrentPosition?: any;
// }

// const Map: React.FC<Props> = ({
//   lat,
//   lng,
//   height,
//   zoom,
//   showInfoWindow,
//   mapCurrentPosition,
// }) => {
//   const isLoaded = true;
//   const position = [51.505, -0.09];

//   return (
//     <MapContainer
//       center={[36.29774319400654, 59.606550386502306]}
//       zoom={13}
//       scrollWheelZoom={false}
//       className="h-96"
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={[51.505, -0.09]}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default Map;
import * as React from 'react';
import Map from 'react-map-gl';

// import mapbox css
import 'mapbox-gl/dist/mapbox-gl.css';

// please import our css too :)
// import './style.css';

// import your api key

export default function App() {
  return (
    <Map
      initialViewState={{
        longitude: 59.579356,
        latitude: 36.316361,
        zoom: 11,
      }}
      style={{  height: 500 }}
      // choose your style from https://help.map.ir/documentation/styles/
      mapStyle="https://map.ir/vector/styles/main/mapir-xyz-style.json"
      // send your api key along with every request to map.ir (get your api key here: https://corp.map.ir/registration)
      transformRequest={(url: string) => {
        return {
          url,
          headers: {
            'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM2NTBiMTQ4ZWM1MjU0OTE1NGM0N2VjZTkzNmVhY2U0NDY4YzliYmFiYjdmZTI0ZTVmMDM1OWQ5ZGRkM2RhNWZhNmQ5ZWM2OGIzMmJkZWRiIn0.eyJhdWQiOiIyNzMyNiIsImp0aSI6IjM2NTBiMTQ4ZWM1MjU0OTE1NGM0N2VjZTkzNmVhY2U0NDY4YzliYmFiYjdmZTI0ZTVmMDM1OWQ5ZGRkM2RhNWZhNmQ5ZWM2OGIzMmJkZWRiIiwiaWF0IjoxNzE1NTAxMTM4LCJuYmYiOjE3MTU1MDExMzgsImV4cCI6MTcxODA5MzEzOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.pahhVeAuq5Ptyt0mWHtR3MqJM1Oy6cTC59c-dLvVkcliEs2U1Q2FiNsUrD5K_s6u7uv5m1fz_uIanLtLKd3JQXnnAIslpotgO8kenP8a3xyvH0W7fNxoPql7PSKjg_3HSltX6P2uDl-LAvhqbVhQB_M_woRHgkFxJgYHdWVeN4myPRZvwSS3PgVrvJxzq4shsyiamPkAsHe8k9SRiFDEgvO7USUMHHC7TVCOtGQK4_InkoNWjLEBX9dgQdtb6QD8CgALskw_caJvlnfoWsOPoDK0cYim3T0DNbpGnxgq502dW16NT1GCeXN3CeYXLGaXpb---_X0ClZAeOJYqOi3GQ', //Mapir api key
          },
        };
      }}
    />
  );
}
