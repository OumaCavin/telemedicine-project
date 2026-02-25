import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {/* AuditLog Routes */}
                    <Route path="/audit-logs" element={<AuditLogList />} />
                    <Route path="/audit-log/create" element={<CreateAuditLog />} />
                    <Route path="/audit-log/:id/edit" element={<EditAuditLog />} />
                    <Route path="/audit-log/:id" element={<ViewAuditLog />} />

                    {/* Payment Routes */}
                    <Route path="/payments" element={<PaymentList />} />
                    <Route path="/payment/create" element={<CreatePayment />} />
                    <Route path="/payment/:id/edit" element={<EditPayment />} />
                    <Route path="/payment/:id" element={<ViewPayment />} />

                    {/* Status Routes */}
                    <Route path="/statuses" element={<StatusList />} />
                    <Route path="/status/create" element={<CreateStatus />} />
                    <Route path="/status/:id/edit" element={<EditStatus />} />
                    <Route path="/status/:id" element={<ViewStatus />} />

                    {/* User Routes */}
                    <Route path="/users" element={<UserList />} />
                    <Route path="/user/create" element={<CreateUser />} />
                    <Route path="/user/:id/edit" element={<EditUser />} />
                    <Route path="/user/:id" element={<ViewUser />} />

                    {/* Admin Routes */}
                    <Route path="/admins" element={<AdminList />} />
                    <Route path="/admin/create" element={<CreateAdmin />} />
                    <Route path="/admin/:id/edit" element={<EditAdmin />} />
                    <Route path="/admin/:id" element={<ViewAdmin />} />

                    {/* Patient Routes */}
                    <Route path="/patients" element={<PatientList />} />
                    <Route path="/patient/create" element={<CreatePatient />} />
                    <Route path="/patient/:id/edit" element={<EditPatient />} />
                    <Route path="/patient/:id" element={<ViewPatient />} />

                    {/* Doctor Routes */}
                    <Route path="/doctors" element={<DoctorList />} />
                    <Route path="/doctor/create" element={<CreateDoctor />} />
                    <Route path="/doctor/:id/edit" element={<EditDoctor />} />
                    <Route path="/doctor/:id" element={<ViewDoctor />} />

                    {/* Appointment Routes */}
                    <Route path="/appointments" element={<AppointmentList />} />
                    <Route path="/appointment/create" element={<CreateAppointment />} />
                    <Route path="/appointment/:id/edit" element={<EditAppointment />} />
                    <Route path="/appointment/:id" element={<ViewAppointment />} />

                    {/* Prescription Routes */}
                    <Route path="/prescriptions" element={<PrescriptionList />} />
                    <Route path="/prescription/create" element={<CreatePrescription />} />
                    <Route path="/prescription/:id/edit" element={<EditPrescription />} />
                    <Route path="/prescription/:id" element={<ViewPrescription />} />

                    {/* Message Routes */}
                    <Route path="/messages" element={<MessageList />} />
                    <Route path="/message/create" element={<CreateMessage />} />
                    <Route path="/message/:id/edit" element={<EditMessage />} />
                    <Route path="/message/:id" element={<ViewMessage />} />

                    {/* HealthCenter Routes */}
                    <Route path="/health-centers" element={<HealthCenterList />} />
                    <Route path="/health-center/create" element={<CreateHealthCenter />} />
                    <Route path="/health-center/:id/edit" element={<EditHealthCenter />} />
                    <Route path="/health-center/:id" element={<ViewHealthCenter />} />

                    {/* History Routes */}
                    <Route path="/histories" element={<HistoryList />} />
                    <Route path="/history/create" element={<CreateHistory />} />
                    <Route path="/history/:id/edit" element={<EditHistory />} />
                    <Route path="/history/:id" element={<ViewHistory />} />

                    {/* Role Routes */}
                    <Route path="/roles" element={<RoleList />} />
                    <Route path="/role/create" element={<CreateRole />} />
                    <Route path="/role/:id/edit" element={<EditRole />} />
                    <Route path="/role/:id" element={<ViewRole />} />

                    {/* Role Assignment Routes */}
                    <Route path="/role-assignments" element={<RoleAssignmentList />} />
                    <Route path="/role-assignment/create" element={<CreateRoleAssignment />} />
                    <Route path="/role-assignment/:id/edit" element={<EditRoleAssignment />} />
                    <Route path="/role-assignment/:id" element={<ViewRoleAssignment />} />

                    {/* Role Item Routes */}
                    <Route path="/role-items" element={<RoleItemList />} />
                    <Route path="/role-item/create" element={<CreateRoleItem />} />
                    <Route path="/role-item/:id/edit" element={<EditRoleItem />} />
                    <Route path="/role-item/:id" element={<ViewRoleItem />} />

                    {/* EhrRecord Routes */}
                    <Route path="/ehr-records" element={<EhrRecordList />} />
                    <Route path="/ehr-record/create" element={<CreateEhrRecord />} />
                    <Route path="/ehr-record/:id/edit" element={<EditEhrRecord />} />
                    <Route path="/ehr-record/:id" element={<ViewEhrRecord />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
