import {
   useMap,
   AdvancedMarker
} from '@vis.gl/react-google-maps';
import { MarkerClusterer, Marker } from '@googlemaps/markerclusterer';
import {useState, useEffect, useRef, useCallback} from 'react';
import {useRouter} from 'next/navigation';
import CustomMarker from '@/components/MyMap/CustomMarker';


const imagePaths = {
   museum: '/images/museum.png',
   church: '/images/church.png',
   default: '/images/place.png'
};

function MyMarkers({points}) {
   const map = useMap();
   // const [markers, setMarkers] = useState({});
   const clusterer = useRef(null);
   const router = useRouter();

   useEffect(() => {
      if (!map) return;
      if (!clusterer.current) {
         clusterer.current = new MarkerClusterer({map});
      }
   }, [map]);

   // useEffect(() => {
   //    if (clusterer.current) {
   //       clusterer.current.clearMarkers();
   //       clusterer.current.addMarkers(Object.values(markers));
   //    }
   // }, [markers]);

   // const setMarkerRef = useCallback((marker, key) => {
   //    if (marker && markers[key]) return;
   //    if (!marker && !markers[key]) return;
   //
   //    setMarkers((prev) => {
   //       if (marker) {
   //          return { ...prev, [key]: marker };
   //       } else {
   //          const newMarkers = { ...prev };
   //          delete newMarkers[key];
   //          return newMarkers;
   //       }
   //    });
   // }, [setMarkers, markers]);

   //console.log('Type:', points);

   const handleMarkerClick = (marker) => {
      //console.log('Marker clicked', marker);
      const placeId = marker.key;
      router.push(`/map/${placeId}`);
   };

   return (
      <>
         {points && points.map((point =>
            (
               <CustomMarker
                  key={point.key}
                  point={point}
                  clusterer={clusterer.current}
                  onClickHandler={() => handleMarkerClick(point)} />
            )
         ))}
         {/*{points.map((point) => (*/}

         {/*   <AdvancedMarker*/}
         {/*      position={point}*/}
         {/*      key={point.key}*/}
         {/*      ref={(marker) => setMarkerRef(marker, point.key)}*/}
         {/*      captureClick={true}*/}
         {/*      onClick={() => handleMarkerClick(point)}*/}
         {/*   >*/}
         {/*      <img*/}
         {/*         src={imagePaths[point.type ? point.type.trim().toLowerCase() : 'default'] || imagePaths.default}*/}
         {/*         alt=""*/}
         {/*         style={{height: '23px', width: '23px', position: 'absolute'}}/>*/}
         {/*   </AdvancedMarker>*/}
         {/*))}*/}
      </>
   );
}

export default MyMarkers;