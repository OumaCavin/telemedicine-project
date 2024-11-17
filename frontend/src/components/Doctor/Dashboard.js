// frontend/src/components/Doctor/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading';
import ErrorBoundary from '../ErrorBoundary';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('/api/doctors/appointments');
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) return <Loading />; // Show loading spinner while data is being fetched

    return (
        <ErrorBoundary>
            <div className="doctor-dashboard">
                <h2>Your Appointments</h2>
                <ul>
                    {appointments.map(appointment => (
                        <li key={appointment.id}>
                            {appointment.date} - {appointment.patientName}
                        </li>
                    ))}
                </ul>
            </div>
        </ErrorBoundary>
    );
};

export default DoctorDashboard;


// // frontend/src/components/Doctor/Dashboard.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Doctor.css';

// const DoctorDashboard = () => {
//     const [appointments, setAppointments] = useState([]);

//     useEffect(() => {
//         const fetchAppointments = async () => {
//             try {
//                 const response = await axios.get('/api/doctors/appointments');
//                 setAppointments(response.data);
//             } catch (error) {
//                 console.error("Error fetching appointments", error);
//             }
//         };
//         fetchAppointments();
//     }, []);

//     return (
//         <div className="doctor-dashboard">
//             <h2>Your Appointments</h2>
//             <ul>
//                 {appointments.map((appointment) => (
//                     <li key={appointment.id}>
//                         {appointment.date} - {appointment.patientName}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default DoctorDashboard;
