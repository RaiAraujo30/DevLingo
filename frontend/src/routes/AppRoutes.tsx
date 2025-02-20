import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Sidebar from "../components/Sidebar";
import CreatePostPage from "../pages/CreatePost";

const AppRoutes = () => {
  return (
    <Router>
      {/* Layout principal: Sidebar à esquerda, conteúdo à direita */}
      <div className="flex min-h-screen">
        {/* Barra lateral */}
        <Sidebar />

        {/* Conteúdo principal */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-post" element={<CreatePostPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRoutes;
