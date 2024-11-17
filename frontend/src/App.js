import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import components for each model
import AuditLogList from './components/AuditLogList'; // Component to view list of audit logs
import CreateAuditLog from './components/CreateAuditLog'; // Component to create a new audit log
import EditAuditLog from './components/EditAuditLog'; // Component to edit an audit log
import ViewAuditLog from './components/ViewAuditLog'; // Component to view a single audit log

import PaymentList from './components/PaymentList'; // Component to view list of payments
import CreatePayment from './components/CreatePayment'; // Component to create a new payment
import EditPayment from './components/EditPayment'; // Component to edit a payment
import ViewPayment from './components/ViewPayment'; // Component to view a single payment

import StatusList from './components/StatusList'; // Component to view list of statuses
import CreateStatus from './components/CreateStatus'; // Component to create a new status
import EditStatus from './components/EditStatus'; // Component to edit a status
import ViewStatus from './components/ViewStatus'; // Component to view a single status

import UserList from './components/UserList'; // Component to view list of users
import CreateUser from './components/CreateUser'; // Component to create a new user
import EditUser from './components/EditUser'; // Component to edit a user
import ViewUser from './components/ViewUser'; // Component to view a single user

// Import components for Admin, Patient, Doctor, Appointment
import AdminList from './components/AdminList'; // Component to view list of admins
import CreateAdmin from './components/CreateAdmin'; // Component to create a new admin
import EditAdmin from './components/EditAdmin'; // Component to edit an admin
import ViewAdmin from './components/ViewAdmin'; // Component to view a single admin

import PatientList from './components/PatientList'; // Component to view list of patients
import CreatePatient from './components/CreatePatient'; // Component to create a new patient
import EditPatient from './components/EditPatient'; // Component to edit a patient
import ViewPatient from './components/ViewPatient'; // Component to view a single patient

import DoctorList from './components/DoctorList'; // Component to view list of doctors
import CreateDoctor from './components/CreateDoctor'; // Component to create a new doctor
import EditDoctor from './components/EditDoctor'; // Component to edit a doctor
import ViewDoctor from './components/ViewDoctor'; // Component to view a single doctor

import AppointmentList from './components/AppointmentList'; // Component to view list of appointments
import CreateAppointment from './components/CreateAppointment'; // Component to create a new appointment
import EditAppointment from './components/EditAppointment'; // Component to edit an appointment
import ViewAppointment from './components/ViewAppointment'; // Component to view a single appointment

// Import components for Prescription, Message, HealthCenter, History, Roles, RoleAssignment, RoleItems, EhrRecords
import PrescriptionList from './components/PrescriptionList'; // Component to view list of prescriptions
import CreatePrescription from './components/CreatePrescription'; // Component to create a new prescription
import EditPrescription from './components/EditPrescription'; // Component to edit a prescription
import ViewPrescription from './components/ViewPrescription'; // Component to view a single prescription

import MessageList from './components/MessageList'; // Component to view list of messages
import CreateMessage from './components/CreateMessage'; // Component to create a new message
import EditMessage from './components/EditMessage'; // Component to edit a message
import ViewMessage from './components/ViewMessage'; // Component to view a single message

import HealthCenterList from './components/HealthCenterList'; // Component to view list of health centers
import CreateHealthCenter from './components/CreateHealthCenter'; // Component to create a new health center
import EditHealthCenter from './components/EditHealthCenter'; // Component to edit a health center
import ViewHealthCenter from './components/ViewHealthCenter'; // Component to view a single health center

import HistoryList from './components/HistoryList'; // Component to view list of histories
import CreateHistory from './components/CreateHistory'; // Component to create a new history
import EditHistory from './components/EditHistory'; // Component to edit a history
import ViewHistory from './components/ViewHistory'; // Component to view a single history

import RoleList from './components/RoleList'; // Component to view list of roles
import CreateRole from './components/CreateRole'; // Component to create a new role
import EditRole from './components/EditRole'; // Component to edit a role
import ViewRole from './components/ViewRole'; // Component to view a single role

import RoleAssignmentList from './components/RoleAssignmentList'; // Component to view list of role assignments
import CreateRoleAssignment from './components/CreateRoleAssignment'; // Component to create a new role assignment
import EditRoleAssignment from './components/EditRoleAssignment'; // Component to edit a role assignment
import ViewRoleAssignment from './components/ViewRoleAssignment'; // Component to view a single role assignment

import RoleItemList from './components/RoleItemList'; // Component to view list of role items
import CreateRoleItem from './components/CreateRoleItem'; // Component to create a new role item
import EditRoleItem from './components/EditRoleItem'; // Component to edit a role item
import ViewRoleItem from './components/ViewRoleItem'; // Component to view a single role item

import EhrRecordList from './components/EhrRecordList'; // Component to view list of EHR records
import CreateEhrRecord from './components/CreateEhrRecord'; // Component to create a new EHR record
import EditEhrRecord from './components/EditEhrRecord'; // Component to edit an EHR record
import ViewEhrRecord from './components/ViewEhrRecord'; // Component to view a single EHR record

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
