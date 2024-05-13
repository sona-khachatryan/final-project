'use client';

import React, {useEffect} from 'react';
import {AdvancedMarker, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';


const imagePaths = {
   museum: '/images/museum.png',
   church: '/images/church.png',
   default: '/images/place.png'
};

function CustomMarker({point, clusterer, onClickHandler}) {
   const [refCallback, marker] = useAdvancedMarkerRef();

   useEffect(() => {
      if (!clusterer || !marker) return;
      clusterer.addMarker(marker);

      return () => {
         clusterer.removeMarker(marker);
      };
   }, [clusterer, marker]);

   return (
      <AdvancedMarker
         position={point}
         key={point.key}
         ref={refCallback}
         captureClick={true}
         onClick={onClickHandler}
      >
         <img
            src={imagePaths[point.type ? point.type.trim().toLowerCase() : 'default'] || imagePaths.default}
            alt=""
            style={{height: '23px', width: '23px', position: 'absolute'}}/>
      </AdvancedMarker>
   );
}

export default CustomMarker;