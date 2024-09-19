// 'use client'
// import { useRef, useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import Locationinfo from '../LocationInfo';
// import icon from '../../assets/homeicon.png'
// const Demo = () => {
//     const [isComponentVisible, setIsComponentVisible] = useState(false);
//     console.log(icon)
//     const handleIconClick = () => {
//       setIsComponentVisible(true);
//     };
  
//     const handleClose = () => {
//       setIsComponentVisible(false);
//     };
//     const mapContainer = useRef(null);
//     const map = useRef(null);
//     const markerRef = useRef(null);

//     const [area, setArea] = useState('');
//     const [pincode, setPincode] = useState('');
//     const [city, setCity] = useState('');
//     const [showLocation, setShowLocation] = useState(false);
//     const [selectedHostel, setSelectedHostel] = useState(null); // State to manage the selected hostel

//     useEffect(() => {
//         mapboxgl.accessToken = 'pk.eyJ1IjoicHJhdmluOTE2IiwiYSI6ImNseThqZXdwMTA3cWMybHBoYzZvaHVkOTkifQ.TrJHd5twmsPbtZuOELMitg';
//         if (!map.current) {
//             map.current = new mapboxgl.Map({
//                 container: mapContainer.current,
//                 style: 'mapbox://styles/mapbox/streets-v11',
//                 center: [78.9629, 20.5937], // Default center (India)
//                 zoom: 7
//             });
//         }
//     }, []);

//     const createCustomMarker = () => {
//         const div = document.createElement('div');
//         div.className = 'custom-marker';
//         // div.style.backgroundColor = 'red';
//         div.style.backgroundImage = `url(${icon})`;
//         div.style.width = '40px';
//         div.style.height = '40px';
//         div.style.backgroundSize = 'cover';
//         div.style.backgroundRepeat = 'no-repeat';
//         div.style.backgroundPosition = 'center';
//         return div;
//     };
    

//     const geocodeAndPlaceMarker = () => {
//         const location = `${area}, ${pincode}, ${city}`;

//         fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data.features.length > 0) {
//                     const coordinates = data.features[0].center;

//                     map.current.flyTo({
//                         center: coordinates,
//                         zoom: 15
//                     });

//                     if (markerRef.current) {
//                         markerRef.current.remove();
//                     }

//                     // Dummy hostel data for demonstration
//                     const hostelInfo = {
//                         name: 'Hostel Name',
//                         vacantSeats: 5,
//                         type: 'AC',
//                         price: '₹5000/month',
//                         amenities: 'WiFi, Laundry, Meals'
//                     };

//                     // Add a new marker with a custom icon
//                     markerRef.current = new mapboxgl.Marker({ element: createCustomMarker() })
//                         .setLngLat(coordinates)
//                         .addTo(map.current)
//                         .getElement().addEventListener('click', () => {
//                             setSelectedHostel(hostelInfo);
//                         });

//                 } else {
//                     alert('Location not found!');
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     };

//     const getLiveLocationAndPlaceMarker = (retry = 0) => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(position => {
//                 const { longitude, latitude } = position.coords;
//                 const coordinates = [longitude, latitude];

//                 map.current.flyTo({
//                     center: coordinates,
//                     zoom: 15
//                 });

//                 if (markerRef.current) {
//                     markerRef.current.remove();
//                 }

//                 // Dummy hostel data for demonstration
//                 const hostelInfo = {
//                     name: 'Hostel Name',
//                     vacantSeats: 5,
//                     type: 'AC',
//                     price: '₹5000/month',
//                     amenities: 'WiFi, Laundry, Meals'
//                 };

//                 // Add a new marker with a custom icon
//                 markerRef.current = new mapboxgl.Marker({ element: createCustomMarker() })
//                     .setLngLat(coordinates)
//                     .addTo(map.current)
//                     .getElement().addEventListener('click', () => {
//                         setSelectedHostel(hostelInfo);
//                     });

//             }, error => {
//                 console.error('Error getting location:', error);
//                 if (retry < 3) {
//                     setTimeout(() => getLiveLocationAndPlaceMarker(retry + 1), 1000);
//                 } else {
//                     alert('Unable to retrieve your location');
//                 }
//             }, {
//                 enableHighAccuracy: true,
//                 timeout: 10000,
//                 maximumAge: 0
//             });
//         } else {
//             alert('Geolocation is not supported by your browser');
//         }
//     };

//     return (
//         <div className="app-container ">
//             <div className="input-container">
//                 <input
//                     type="text"
//                     value={area}
//                     onChange={(e) => setArea(e.target.value)}
//                     placeholder="Area Name"
//                 />
//                 <input
//                     type="text"
//                     value={pincode}
//                     onChange={(e) => setPincode(e.target.value)}
//                     placeholder="Pincode"
//                 />
//                 <input
//                     type="text"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                     placeholder="City"
//                 />
//                 <button onClick={geocodeAndPlaceMarker}>Place Marker</button>
//                 <p className='font-extrabold'> OR </p>
//                 <button onClick={getLiveLocationAndPlaceMarker}>Use My Location</button>
//             </div>

//             <div className="content-container">
//                 <div className="map-container" ref={mapContainer} ></div>
//                 { selectedHostel && (
//                     <Locationinfo hostel={selectedHostel} />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Demo;
