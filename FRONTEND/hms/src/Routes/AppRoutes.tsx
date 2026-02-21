import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Random from "../Components/Random";
import AdminDashboard from "../Layout/AdminDashboard";
import LoginPage from "../Pages/LoginPage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />}/>
                <Route path="/" element={<AdminDashboard />}>
                    <Route path="/dashboard" element={<Random />} />
                    <Route path="/pharmacy" element={<Random />} />
                    <Route path="/patients" element={<Random />} />
                    <Route path="/doctors" element={<Random />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;