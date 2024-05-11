'use client';
import {
   APIProvider,
   Map
} from '@vis.gl/react-google-maps';
import {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllPlaces} from '@/redux/features/Places/placesThunks';

import MyMarkers from '@/components/MyMap/MyMarkers';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {app} from '@/firebase/config';
import {removeUser, setUser} from '@/redux/features/user/userSlice';


function MyMap() {
   const allPlaces = useSelector(state => state.places.allPlaces);
   const [mapCenter, setMapCenter] = useState({lat: 40.1356603, lng: 45.3273985});
   const [markersData, setMarkersData] = useState([]);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getAllPlaces());
   }, [dispatch]);

   useEffect(() => {
      if (allPlaces) {
         setMarkersData(allPlaces);
         console.log(allPlaces);
      }
   }, [allPlaces]);


   const [onlyMarkers, setOnlyMarkers] = useState([]);

   useEffect(() => {
      if (markersData) {
         const points = markersData.map((marker) => ({
            lat: +(marker.coordinates.lat),
            lng: +(marker.coordinates.lon),
            key: marker.id,
            type: marker.type,
            image: marker.image,
            title: marker.title,
            url: marker.url,
            extract: marker.extract
         }));
         setOnlyMarkers(points);
      }
   }, [markersData]);

   //check user status
   const auth = getAuth(app);
   onAuthStateChanged(auth, (user) => {
      console.log('currentuser', user);
      if(user) {
         dispatch(
            setUser({
               email: user.email,
               id: user.uid,
               token: user.accessToken,
            })
         );
      } else {
         dispatch(removeUser);
      }
   });


   if (!markersData.length) {
      return (
         <div> Loading Markers . . . </div>
      );
   }

   return (
      <APIProvider apiKey='AIzaSyB_ANvqLZxglfIWeNXW_C9jnQ0jwDucZQk'>
         <div>
            <Map
               style={{width: '100vw', height: '100vh'}}
               defaultCenter={mapCenter}
               defaultZoom={5}
               minZoom={3}
               gestureHandling={'greedy'}
               disableDefaultUI={true}
               mapId={'1224a6badaa7b3c4'}
            >
               <MyMarkers points={onlyMarkers}/>

            </Map>
         </div>
      </APIProvider>
   );
}

export default MyMap;