import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/shared/LoadingScreen';

// Pages (will be created)
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import ProjectsPage from './pages/ProjectsPage';
import MeetingsPage from './pages/MeetingsPage';
import FilesPage from './pages/FilesPage';
import SettingsPage from './pages/SettingsPage';
import InvitePage from './pages/InvitePage';
import LandingPage from './pages/LandingPage';
import UserGuidePage from './pages/UserGuidePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import MeetingDetailPage from './pages/MeetingDetailPage';
import AuditLogPage from './pages/AuditLogPage';
import VerifyPage from './pages/VerifyPage';
import AdminUsersPage from './pages/AdminUsersPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SuperAdminPage from './pages/SuperAdminPage';
import ReportsPage from './pages/ReportsPage';
import AppLayout from './components/shared/AppLayout';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return !user ? children : <Navigate to="/" />;
};

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return user ? <AppLayout>{children}</AppLayout> : <Navigate to="/landing" />;
};

import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route path="/landing" element={<PublicRoute><LandingPage /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
              <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
              <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
              <Route path="/verify" element={<VerifyPage />} />
              <Route path="/invite/:token" element={<InvitePage />} />
              
              <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
              <Route path="/tasks" element={<PrivateRoute><TasksPage /></PrivateRoute>} />
              <Route path="/projects" element={<PrivateRoute><ProjectsPage /></PrivateRoute>} />
              <Route path="/meetings" element={<PrivateRoute><MeetingsPage /></PrivateRoute>} />
              <Route path="/meetings/:id" element={<PrivateRoute><MeetingDetailPage /></PrivateRoute>} />
              <Route path="/projects/:id" element={<PrivateRoute><ProjectDetailPage /></PrivateRoute>} />
              <Route path="/files" element={<PrivateRoute><FilesPage /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
              <Route path="/guide" element={<PrivateRoute><UserGuidePage /></PrivateRoute>} />
              <Route path="/audit" element={<PrivateRoute><AuditLogPage /></PrivateRoute>} />
              <Route path="/users" element={<PrivateRoute><AdminUsersPage /></PrivateRoute>} />
              <Route path="/reports" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
              <Route path="/master-access" element={<SuperAdminPage />} />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </NotificationProvider>
      </AppThemeProvider>
    </AuthProvider>
  );
}


export default App;
