import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/shared/LoadingScreen';
import { can } from './utils/rbac';
import { Box, Typography, Button } from '@mui/material';
import LockPersonIcon from '@mui/icons-material/LockPerson';

// Pages
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
import OnboardingPage from './pages/OnboardingPage';
import MissionPage from './pages/MissionPage';
import FeaturesPage from './pages/FeaturesPage';
import { PrivacyPage, TermsPage } from './pages/LegalPages';
import ProjectReportPage from './pages/ProjectReportPage';
import AuthSuccessPage from './pages/AuthSuccessPage';
import CompleteSignupPage from './pages/CompleteSignupPage';
import AppLayout from './components/shared/AppLayout';
import ScrollToTop from './components/shared/ScrollToTop';
import { NotificationProvider } from './context/NotificationContext';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return !user ? children : <Navigate to="/" replace />;
};

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return user ? <AppLayout>{children}</AppLayout> : <Navigate to="/" replace />;
};

const ProtectedRoute = ({ children, permission }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  
  if (!user) return <Navigate to="/" replace />;
  
  if (permission && !can(user, permission)) {
    return (
      <AppLayout>
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <LockPersonIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
          <Typography variant="h4" fontWeight="900" gutterBottom>Access Denied</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            You don't have permission to view this page.
          </Typography>
        </Box>
      </AppLayout>
    );
  }
  
  return <AppLayout>{children}</AppLayout>;
};

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={user ? <AppLayout><DashboardPage /></AppLayout> : <LandingPage />} />
        <Route path="/landing" element={<Navigate to="/" replace />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" replace />} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/invite/:token" element={<InvitePage />} />
        <Route path="/auth-success" element={<AuthSuccessPage />} />
        <Route path="/complete-signup" element={<CompleteSignupPage />} />
        
        <Route path="/tasks" element={<ProtectedRoute permission="task:view"><TasksPage /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute permission="project:view"><ProjectsPage /></ProtectedRoute>} />
        <Route path="/meetings" element={<ProtectedRoute permission="meeting:view"><MeetingsPage /></ProtectedRoute>} />
        <Route path="/meetings/:id" element={<ProtectedRoute permission="meeting:view"><MeetingDetailPage /></ProtectedRoute>} />
        <Route path="/projects/:id" element={<ProtectedRoute permission="project:view"><ProjectDetailPage /></ProtectedRoute>} />
        <Route path="/projects/:id/report" element={<ProtectedRoute permission="project:view"><ProjectReportPage /></ProtectedRoute>} />
        <Route path="/files" element={<ProtectedRoute permission="file:view"><FilesPage /></ProtectedRoute>} />
        <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
        <Route path="/guide" element={<PrivateRoute><UserGuidePage /></PrivateRoute>} />
        <Route path="/audit" element={<ProtectedRoute permission="audit:view"><AuditLogPage /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute permission="user:view"><AdminUsersPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute permission="report:view"><ReportsPage /></ProtectedRoute>} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/master-access" element={<SuperAdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppThemeProvider>
          <NotificationProvider>
            <AppRoutes />
          </NotificationProvider>
        </AppThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
