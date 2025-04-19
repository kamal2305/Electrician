import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material';

import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/Home';

import Electricians from './pages/admin/Electricians';
import Jobs from './pages/admin/Jobs';
import TimeReports from './pages/admin/TimeReports';
import MaterialReports from './pages/admin/MaterialReports';
import InvoiceManagement from './pages/admin/InvoiceManagement';
import Reports from './pages/admin/Reports';

import MyJobs from './pages/electrician/MyJobs';
import TimeLog from './pages/electrician/TimeLog';
import MaterialUsage from './pages/electrician/MaterialUsage';

import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import { useAuth } from './context/AuthContext';
import Notifications from './components/Notifications';

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {user && <Notifications />}
        </Toolbar>
      </AppBar>

      <Container>
        <Typography variant="h4" align="center" gutterBottom mt={4}>
          Electrician Work Management System
        </Typography>

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Home */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/electricians"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <Electricians />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <Jobs />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin/time-reports"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <TimeReports />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin/material-reports"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <MaterialReports />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin/invoices"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <InvoiceManagement />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <Reports />
              </RoleProtectedRoute>
            }
          />

          {/* Electrician Routes */}
          <Route
            path="/my-jobs"
            element={
              <RoleProtectedRoute allowedRoles={["electrician"]}>
                <MyJobs />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/log-time"
            element={
              <RoleProtectedRoute allowedRoles={["electrician"]}>
                <TimeLog />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/log-materials"
            element={
              <RoleProtectedRoute allowedRoles={["electrician"]}>
                <MaterialUsage />
              </RoleProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
