import { Routes, Route } from "react-router-dom";
import ContentLoader from "./components/ContentLoader";
import Home from "./pages/Home";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

export default function App() {
  return (
    <ContentLoader>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/edit" element={<AdminDashboard />} />
      </Routes>
    </ContentLoader>
  );
}
