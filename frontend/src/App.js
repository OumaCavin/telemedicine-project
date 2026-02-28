import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
import CreateUser from './components/User/CreateUser';
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

                {/* AuditLog Routes */}
                <Route path="/audit-logs" element={<Layout><AuditLogList /></Layout>} />
                <Route path="/audit-log/create" element={<Layout><CreateAuditLog /></Layout>} />
                <Route path="/audit-log/:id/edit" element={<Layout><EditAuditLog /></Layout>} />
                <Route path="/audit-log/:id" element={<Layout><ViewAuditLog /></Layout>} />

                {/* Payment Routes */}
                <Route path="/payments" element={<Layout><PaymentList /></Layout>} />
                <Route path="/payment/create" element={<Layout><CreatePayment /></Layout>} />
                <Route path="/payment/:id/edit" element={<Layout><EditPayment /></Layout>} />
                <Route path="/payment/:id" element={<Layout><ViewPayment /></Layout>} />

                {/* Status Routes */}
                <Route path="/statuses" element={<Layout><StatusList /></Layout>} />
                <Route path="/status/create" element={<Layout><CreateStatus /></Layout>} />
                <Route path="/status/:id/edit" element={<Layout><EditStatus /></Layout>} />
                <Route path="/status/:id" element={<Layout><ViewStatus /></Layout>} />

                {/* User Routes */}
                <Route path="/users" element={<Layout><UserList /></Layout>} />
                <Route path="/user/create" element={<Layout><CreateUser /></Layout>} />
                <Route path="/user/:id/edit" element={<Layout><EditUser /></Layout>} />
                <Route path="/user/:id" element={<Layout><ViewUser /></Layout>} />

                {/* Admin Routes */}
                <Route path="/admins" element={<Layout><AdminList /></Layout>} />
                <Route path="/admin/create" element={<Layout><CreateAdmin /></Layout>} />
                <Route path="/admin/:id/edit" element={<Layout><EditAdmin /></Layout>} />
                <Route path="/admin/:id" element={<Layout><ViewAdmin /></Layout>} />

                {/* Patient Routes */}
                <Route path="/patients" element={<Layout><PatientList /></Layout>} />
                <Route path="/patient/create" element={<Layout><CreatePatient /></Layout>} />
                <Route path="/patient/:id/edit" element={<Layout><EditPatient /></Layout>} />
                <Route path="/patient/:id" element={<Layout><ViewPatient /></Layout>} />

                {/* Doctor Routes */}
                <Route path="/doctors" element={<Layout><DoctorList /></Layout>} />
                <Route path="/doctor/create" element={<Layout><CreateDoctor /></Layout>} />
                <Route path="/doctor/:id/edit" element={<Layout><EditDoctor /></Layout>} />
                <Route path="/doctor/:id" element={<Layout><ViewDoctor /></Layout>} />

                {/* Appointment Routes */}
                <Route path="/appointments" element={<Layout><AppointmentList /></Layout>} />
                <Route path="/appointment/create" element={<Layout><CreateAppointment /></Layout>} />
                <Route path="/appointment/:id/edit" element={<Layout><EditAppointment /></Layout>} />
                <Route path="/appointment/:id" element={<Layout><ViewAppointment /></Layout>} />

                {/* Prescription Routes */}
                <Route path="/prescriptions" element={<Layout><PrescriptionList /></Layout>} />
                <Route path="/prescription/create" element={<Layout><CreatePrescription /></Layout>} />
                <Route path="/prescription/:id/edit" element={<Layout><EditPrescription /></Layout>} />
                <Route path="/prescription/:id" element={<Layout><ViewPrescription /></Layout>} />

                {/* Message Routes */}
                <Route path="/messages" element={<Layout><MessageList /></Layout>} />
                <Route path="/message/create" element={<Layout><CreateMessage /></Layout>} />
                <Route path="/message/:id/edit" element={<Layout><EditMessage /></Layout>} />
                <Route path="/message/:id" element={<Layout><ViewMessage /></Layout>} />

                {/* HealthCenter Routes */}
                <Route path="/health-centers" element={<Layout><HealthCenterList /></Layout>} />
                <Route path="/health-center/create" element={<Layout><CreateHealthCenter /></Layout>} />
                <Route path="/health-center/:id/edit" element={<Layout><EditHealthCenter /></Layout>} />
                <Route path="/health-center/:id" element={<Layout><ViewHealthCenter /></Layout>} />

                {/* History Routes */}
                <Route path="/histories" element={<Layout><HistoryList /></Layout>} />
                <Route path="/history/create" element={<Layout><CreateHistory /></Layout>} />
                <Route path="/history/:id/edit" element={<Layout><EditHistory /></Layout>} />
                <Route path="/history/:id" element={<Layout><ViewHistory /></Layout>} />

                {/* Role Routes */}
                <Route path="/roles" element={<Layout><RoleList /></Layout>} />
                <Route path="/role/create" element={<Layout><CreateRole /></Layout>} />
                <Route path="/role/:id/edit" element={<Layout><EditRole /></Layout>} />
                <Route path="/role/:id" element={<Layout><ViewRole /></Layout>} />

                {/* Role Assignment Routes */}
                <Route path="/role-assignments" element={<Layout><RoleAssignmentList /></Layout>} />
                <Route path="/role-assignment/create" element={<Layout><CreateRoleAssignment /></Layout>} />
                <Route path="/role-assignment/:id/edit" element={<Layout><EditRoleAssignment /></Layout>} />
                <Route path="/role-assignment/:id" element={<Layout><ViewRoleAssignment /></Layout>} />

                {/* Role Item Routes */}
                <Route path="/role-items" element={<Layout><RoleItemList /></Layout>} />
                <Route path="/role-item/create" element={<Layout><CreateRoleItem /></Layout>} />
                <Route path="/role-item/:id/edit" element={<Layout><EditRoleItem /></Layout>} />
                <Route path="/role-item/:id" element={<Layout><ViewRoleItem /></Layout>} />

                {/* EhrRecord Routes */}
                <Route path="/ehr-records" element={<Layout><EhrRecordList /></Layout>} />
                <Route path="/ehr-record/create" element={<Layout><CreateEhrRecord /></Layout>} />
                <Route path="/ehr-record/:id/edit" element={<Layout><EditEhrRecord /></Layout>} />
                <Route path="/ehr-record/:id" element={<Layout><ViewEhrRecord /></Layout>} />
            </Routes>
        </Router>
    );
}

export default App;
