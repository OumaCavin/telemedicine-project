import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

// Import components for each model
import AuditLogList from './components/AuditLog/AuditLogList';
import CreateAuditLog from './components/AuditLog/CreateAuditLog';
import EditAuditLog from './components/AuditLog/EditAuditLog';
import ViewAuditLog from './components/AuditLog/ViewAuditLog';

import PaymentList from './components/Payment/PaymentList';
import CreatePayment from './components/Payment/CreatePayment';
import EditPayment from './components/Payment/EditPayment';
import ViewPayment from './components/Payment/ViewPayment';

import StatusList from './components/Status/StatusList';
import CreateStatus from './components/Status/CreateStatus';
import EditStatus from './components/Status/EditStatus';
import ViewStatus from './components/Status/ViewStatus';

import UserList from './components/User/UserList';
import EditUser from './components/User/EditUser';
import ViewUser from './components/User/ViewUser';

import AdminList from './components/Admin/AdminList';
import CreateAdmin from './components/Admin/CreateAdmin';
import EditAdmin from './components/Admin/EditAdmin';
import ViewAdmin from './components/Admin/ViewAdmin';

import PatientList from './components/Patient/PatientList';
import CreatePatient from './components/Patient/CreatePatient';
import EditPatient from './components/Patient/EditPatient';
import ViewPatient from './components/Patient/ViewPatient';

import DoctorList from './components/Doctor/DoctorList';
import CreateDoctor from './components/Doctor/CreateDoctor';
import EditDoctor from './components/Doctor/EditDoctor';
import ViewDoctor from './components/Doctor/ViewDoctor';

import AppointmentList from './components/Appointment/AppointmentList';
import CreateAppointment from './components/Appointment/CreateAppointment';
import EditAppointment from './components/Appointment/EditAppointment';
import ViewAppointment from './components/Appointment/ViewAppointment';

import PrescriptionList from './components/Prescription/PrescriptionList';
import CreatePrescription from './components/Prescription/CreatePrescription';
import EditPrescription from './components/Prescription/EditPrescription';
import ViewPrescription from './components/Prescription/ViewPrescription';

import MessageList from './components/Message/MessageList';
import CreateMessage from './components/Message/CreateMessage';
import EditMessage from './components/Message/EditMessage';
import ViewMessage from './components/Message/ViewMessage';

import HealthCenterList from './components/HealthCenter/HealthCenterList';
import CreateHealthCenter from './components/HealthCenter/CreateHealthCenter';
import EditHealthCenter from './components/HealthCenter/EditHealthCenter';
import ViewHealthCenter from './components/HealthCenter/ViewHealthCenter';

import HistoryList from './components/History/HistoryList';
import CreateHistory from './components/History/CreateHistory';
import EditHistory from './components/History/EditHistory';
import ViewHistory from './components/History/ViewHistory';

import RoleList from './components/Role/RoleList';
import CreateRole from './components/Role/CreateRole';
import EditRole from './components/Role/EditRole';
import ViewRole from './components/Role/ViewRole';

import RoleAssignmentList from './components/RoleAssignment/RoleAssignmentList';
import CreateRoleAssignment from './components/RoleAssignment/CreateRoleAssignment';
import EditRoleAssignment from './components/RoleAssignment/EditRoleAssignment';
import ViewRoleAssignment from './components/RoleAssignment/ViewRoleAssignment';

import RoleItemList from './components/RoleItem/RoleItemList';
import CreateRoleItem from './components/RoleItem/CreateRoleItem';
import EditRoleItem from './components/RoleItem/EditRoleItem';
import ViewRoleItem from './components/RoleItem/ViewRoleItem';

import EhrRecordList from './components/EhrRecord/EhrRecordList';
import CreateEhrRecord from './components/EhrRecord/CreateEhrRecord';
import EditEhrRecord from './components/EhrRecord/EditEhrRecord';
import ViewEhrRecord from './components/EhrRecord/ViewEhrRecord';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminLogin from './components/Auth/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';

// Layout wrapper component
const Layout = ({ children }) => (
    <div className="app-container">
        <Header />
        <main className="main-content">{children}</main>
        <Footer />
    </div>
);

function App() {
    return (
        <Router>
            <Routes>
                {/* Home Route */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-login" element={<AdminLogin />} />

                {/* AuditLog Routes */}
                <Route path="/audit-logs" element={<ProtectedRoute><Layout><AuditLogList /></Layout></ProtectedRoute>} />
                <Route path="/audit-log/create" element={<ProtectedRoute><Layout><CreateAuditLog /></Layout></ProtectedRoute>} />
                <Route path="/audit-log/:id/edit" element={<ProtectedRoute><Layout><EditAuditLog /></Layout></ProtectedRoute>} />
                <Route path="/audit-log/:id" element={<ProtectedRoute><Layout><ViewAuditLog /></Layout></ProtectedRoute>} />

                {/* Payment Routes */}
                <Route path="/payments" element={<ProtectedRoute><Layout><PaymentList /></Layout></ProtectedRoute>} />
                <Route path="/payment/create" element={<ProtectedRoute><Layout><CreatePayment /></Layout></ProtectedRoute>} />
                <Route path="/payment/:id/edit" element={<ProtectedRoute><Layout><EditPayment /></Layout></ProtectedRoute>} />
                <Route path="/payment/:id" element={<ProtectedRoute><Layout><ViewPayment /></Layout></ProtectedRoute>} />

                {/* Status Routes */}
                <Route path="/statuses" element={<ProtectedRoute><Layout><StatusList /></Layout></ProtectedRoute>} />
                <Route path="/status/create" element={<ProtectedRoute><Layout><CreateStatus /></Layout></ProtectedRoute>} />
                <Route path="/status/:id/edit" element={<ProtectedRoute><Layout><EditStatus /></Layout></ProtectedRoute>} />
                <Route path="/status/:id" element={<ProtectedRoute><Layout><ViewStatus /></Layout></ProtectedRoute>} />

                {/* User Routes */}
                <Route path="/users" element={<ProtectedRoute><Layout><UserList /></Layout></ProtectedRoute>} />
                <Route path="/users/:id/edit" element={<ProtectedRoute><Layout><EditUser /></Layout></ProtectedRoute>} />
                <Route path="/users/:id" element={<ProtectedRoute><Layout><ViewUser /></Layout></ProtectedRoute>} />

                {/* Admin Routes */}
                <Route path="/admins" element={<ProtectedRoute><Layout><AdminList /></Layout></ProtectedRoute>} />
                <Route path="/admin/create" element={<ProtectedRoute><Layout><CreateAdmin /></Layout></ProtectedRoute>} />
                <Route path="/admin/:id/edit" element={<ProtectedRoute><Layout><EditAdmin /></Layout></ProtectedRoute>} />
                <Route path="/admin/:id" element={<ProtectedRoute><Layout><ViewAdmin /></Layout></ProtectedRoute>} />

                {/* Patient Routes */}
                <Route path="/patients" element={<ProtectedRoute><Layout><PatientList /></Layout></ProtectedRoute>} />
                <Route path="/patient/create" element={<ProtectedRoute><Layout><CreatePatient /></Layout></ProtectedRoute>} />
                <Route path="/patient/:id/edit" element={<ProtectedRoute><Layout><EditPatient /></Layout></ProtectedRoute>} />
                <Route path="/patient/:id" element={<ProtectedRoute><Layout><ViewPatient /></Layout></ProtectedRoute>} />

                {/* Doctor Routes */}
                <Route path="/doctors" element={<ProtectedRoute><Layout><DoctorList /></Layout></ProtectedRoute>} />
                <Route path="/doctor/create" element={<ProtectedRoute><Layout><CreateDoctor /></Layout></ProtectedRoute>} />
                <Route path="/doctor/:id/edit" element={<ProtectedRoute><Layout><EditDoctor /></Layout></ProtectedRoute>} />
                <Route path="/doctor/:id" element={<ProtectedRoute><Layout><ViewDoctor /></Layout></ProtectedRoute>} />

                {/* Appointment Routes */}
                <Route path="/appointments" element={<ProtectedRoute><Layout><AppointmentList /></Layout></ProtectedRoute>} />
                <Route path="/appointment/create" element={<ProtectedRoute><Layout><CreateAppointment /></Layout></ProtectedRoute>} />
                <Route path="/appointment/:id/edit" element={<ProtectedRoute><Layout><EditAppointment /></Layout></ProtectedRoute>} />
                <Route path="/appointment/:id" element={<ProtectedRoute><Layout><ViewAppointment /></Layout></ProtectedRoute>} />

                {/* Prescription Routes */}
                <Route path="/prescriptions" element={<ProtectedRoute><Layout><PrescriptionList /></Layout></ProtectedRoute>} />
                <Route path="/prescription/create" element={<ProtectedRoute><Layout><CreatePrescription /></Layout></ProtectedRoute>} />
                <Route path="/prescription/:id/edit" element={<ProtectedRoute><Layout><EditPrescription /></Layout></ProtectedRoute>} />
                <Route path="/prescription/:id" element={<ProtectedRoute><Layout><ViewPrescription /></Layout></ProtectedRoute>} />

                {/* Message Routes */}
                <Route path="/messages" element={<ProtectedRoute><Layout><MessageList /></Layout></ProtectedRoute>} />
                <Route path="/message/create" element={<ProtectedRoute><Layout><CreateMessage /></Layout></ProtectedRoute>} />
                <Route path="/message/:id/edit" element={<ProtectedRoute><Layout><EditMessage /></Layout></ProtectedRoute>} />
                <Route path="/message/:id" element={<ProtectedRoute><Layout><ViewMessage /></Layout></ProtectedRoute>} />

                {/* HealthCenter Routes */}
                <Route path="/health-centers" element={<ProtectedRoute><Layout><HealthCenterList /></Layout></ProtectedRoute>} />
                <Route path="/health-center/create" element={<ProtectedRoute><Layout><CreateHealthCenter /></Layout></ProtectedRoute>} />
                <Route path="/health-center/:id/edit" element={<ProtectedRoute><Layout><EditHealthCenter /></Layout></ProtectedRoute>} />
                <Route path="/health-center/:id" element={<ProtectedRoute><Layout><ViewHealthCenter /></Layout></ProtectedRoute>} />

                {/* History Routes */}
                <Route path="/histories" element={<ProtectedRoute><Layout><HistoryList /></Layout></ProtectedRoute>} />
                <Route path="/history/create" element={<ProtectedRoute><Layout><CreateHistory /></Layout></ProtectedRoute>} />
                <Route path="/history/:id/edit" element={<ProtectedRoute><Layout><EditHistory /></Layout></ProtectedRoute>} />
                <Route path="/history/:id" element={<ProtectedRoute><Layout><ViewHistory /></Layout></ProtectedRoute>} />

                {/* Role Routes */}
                <Route path="/roles" element={<ProtectedRoute><Layout><RoleList /></Layout></ProtectedRoute>} />
                <Route path="/role/create" element={<ProtectedRoute><Layout><CreateRole /></Layout></ProtectedRoute>} />
                <Route path="/role/:id/edit" element={<ProtectedRoute><Layout><EditRole /></Layout></ProtectedRoute>} />
                <Route path="/role/:id" element={<ProtectedRoute><Layout><ViewRole /></Layout></ProtectedRoute>} />

                {/* Role Assignment Routes */}
                <Route path="/role-assignments" element={<ProtectedRoute><Layout><RoleAssignmentList /></Layout></ProtectedRoute>} />
                <Route path="/role-assignment/create" element={<ProtectedRoute><Layout><CreateRoleAssignment /></Layout></ProtectedRoute>} />
                <Route path="/role-assignment/:id/edit" element={<ProtectedRoute><Layout><EditRoleAssignment /></Layout></ProtectedRoute>} />
                <Route path="/role-assignment/:id" element={<ProtectedRoute><Layout><ViewRoleAssignment /></Layout></ProtectedRoute>} />

                {/* Role Item Routes */}
                <Route path="/role-items" element={<ProtectedRoute><Layout><RoleItemList /></Layout></ProtectedRoute>} />
                <Route path="/role-item/create" element={<ProtectedRoute><Layout><CreateRoleItem /></Layout></ProtectedRoute>} />
                <Route path="/role-item/:id/edit" element={<ProtectedRoute><Layout><EditRoleItem /></Layout></ProtectedRoute>} />
                <Route path="/role-item/:id" element={<ProtectedRoute><Layout><ViewRoleItem /></Layout></ProtectedRoute>} />

                {/* EhrRecord Routes */}
                <Route path="/ehr-records" element={<ProtectedRoute><Layout><EhrRecordList /></Layout></ProtectedRoute>} />
                <Route path="/ehr-record/create" element={<ProtectedRoute><Layout><CreateEhrRecord /></Layout></ProtectedRoute>} />
                <Route path="/ehr-record/:id/edit" element={<ProtectedRoute><Layout><EditEhrRecord /></Layout></ProtectedRoute>} />
                <Route path="/ehr-record/:id" element={<ProtectedRoute><Layout><ViewEhrRecord /></Layout></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
