import React from "react";
import Map from 'devextreme-react/map';

const markerUrl = 'https://js.devexpress.com/Demos/RealtorApp/images/map-marker.png';

export default function Mapa(props) {
  const {coordenadas} = props;
  const mapMarkers = [
    { location: coordenadas },
    
];

  return (
    <>
      <Map
          defaultZoom={17}
          height={440}
          style={{padding: 0}}
          width="100%"
          controls={true}
          markerIconSrc={markerUrl}
          markers={mapMarkers}
          provider="bing">
        </Map>
    </>

  );
}
