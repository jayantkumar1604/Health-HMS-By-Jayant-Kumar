import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoutes"
import ProtectedRoute from "./ProtectedRoutes"
import Random from "../Components/Random";
import AdminDashboard from "../Layout/AdminDashboard";
import PatientDashboard from "../Layout/PatientDashboard";
import DoctorDashboard from "../Layout/DoctorDashboard";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import PatientProfilePage from "../Pages/Patient/PatientProfilePage"
import DoctorProfilePage from "../Pages/Doctor/DoctorProfilePage"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>}/>
                <Route path='/register' element={<PublicRoute><RegisterPage /></PublicRoute>}/>
                <Route path="/" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
                    <Route path="/dashboard" element={<Random />} />
                    <Route path="/pharmacy" element={<Random />} />
                    <Route path="/patients" element={<Random />} />
                    <Route path="/doctors" element={<Random />} />
                </Route>

                <Route path="/doctor" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>}>
                    <Route path="dashboard" element={<Random />} />
                    <Route path="profile" element={<DoctorProfilePage />} />
                    <Route path="pharmacy" element={<Random />} />
                    <Route path="patients" element={<Random />} />
                    <Route path="doctors" element={<Random />} />
                </Route>

                <Route path="/patient" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>}>
                    <Route path="dashboard" element={<Random />} />
                    <Route path="profile" element={<PatientProfilePage />} />
                    <Route path="appointments" element={<Random />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;