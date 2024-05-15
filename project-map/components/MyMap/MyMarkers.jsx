import {
   useMap,
} from '@vis.gl/react-google-maps';
import { MarkerClusterer, } from '@googlemaps/markerclusterer';
import {useEffect, useRef,} from 'react';
import {useRouter} from 'next/navigation';
import CustomMarker from '@/components/MyMap/CustomMarker';


const imagePaths = {
   museum: '/images/museum.png',
   church: '/images/church.png',
   default: '/images/place.png'
};

function MyMarkers({points}) {
   const map = useMap();
   const clusterer = useRef(null);
   const router = useRouter();

   useEffect(() => {
      if (!map) return;
      if (!clusterer.current) {
         clusterer.current = new MarkerClusterer({map});
      }
   }, [map]);

   const handleMarkerClick = (marker) => {
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
      </>
   );
}

export default MyMarkers;