// frontend/src/components/HealthCenter/Locator.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading';
import ErrorBoundary from '../ErrorBoundary';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Locator = () => {
    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const response = await axios.get('/api/healthcenters');
                setCenters(response.data);
            } catch (error) {
                console.error("Error fetching health centers", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCenters();
    }, []);

    if (loading) return <Loading />; // Show loading spinner while data is being fetched

    return (
        <ErrorBoundary>
            <div className="locator">
                <h2>Find Health Centers</h2>
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <GoogleMap 
                        mapContainerStyle={{ height: "400px", width: "100%" }} 
                        zoom={10} 
                        center={{ lat: -1.286389, lng: 36.817223 }}>
                        {centers.map(center => (
                            <Marker key={center.id} position={{ lat: center.latitude, lng: center.longitude }} />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div>
        </ErrorBoundary>
    );
};

export default Locator;


// // frontend/src/components/HealthCenter/Locator.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import './Locator.css';

// const Locator = () => {
//     const [centers, setCenters] = useState([]);

//     useEffect(() => {
//         const fetchCenters = async () => {
//             try {
//                 const response = await axios.get('/api/healthcenters');
//                 setCenters(response.data);
//             } catch (error) {
//                 console.error("Error fetching health centers", error);
//             }
//         };
//         fetchCenters();
//     }, []);

//     const mapContainerStyle = {
//         height: "400px",
//         width: "100%"
//     };

//     const center = {
//         lat: -1.286389, // Example coordinates for Nairobi
//         lng: 36.817223
//     };

//     return (
//         <div className="locator">
//             <h2>Find Health Centers</h2>
//             <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//                 <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
//                     {centers.map(center => (
//                         <Marker key={center.id} position={{ lat: center.latitude, lng: center.longitude }} />
//                     ))}
//                 </GoogleMap>
//             </LoadScript>
//         </div>
//     );
// };

// export default Locator;
