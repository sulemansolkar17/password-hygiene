import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PasswordHygiene from "./pages/PasswordHygiene";
import Phishing from "./pages/Phishing";
import Quiz from "./pages/Quiz";
import PersonalData from "./pages/PersonalData";
import SafeBrowsing from "./pages/SafeBrowsing";
import SocialMedia from "./pages/SocialMedia";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminQuestions from "./pages/admin/AdminQuestions";
import AdminContent from "./pages/admin/AdminContent";
import AdminUsers from "./pages/admin/AdminUsers";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
      <Route path="/password-hygiene" element={<MainLayout><PasswordHygiene /></MainLayout>} />
      <Route path="/phishing" element={<MainLayout><Phishing /></MainLayout>} />
      <Route path="/quiz" element={<MainLayout><Quiz /></MainLayout>} />
      <Route path="/personal-data" element={<MainLayout><PersonalData /></MainLayout>} />
      <Route path="/safe-browsing" element={<MainLayout><SafeBrowsing /></MainLayout>} />
      <Route path="/social-media" element={<MainLayout><SocialMedia /></MainLayout>} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <MainLayout><Dashboard /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute adminOnly>
          <AdminLayout><AdminOverview /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/questions" element={
        <ProtectedRoute adminOnly>
          <AdminLayout><AdminQuestions /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/content" element={
        <ProtectedRoute adminOnly>
          <AdminLayout><AdminContent /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute adminOnly>
          <AdminLayout><AdminUsers /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  );
};

export default App;