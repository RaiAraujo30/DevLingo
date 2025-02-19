// frontend/src/pages/Dashboard.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, logout } from "../services/authService";
import UserProfile from "../components/UserProfile";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1>Bem-vindo ao Dashboard!</h1>
      <UserProfile />
      <button onClick={() => { logout(); navigate("/login"); }} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center" as "center",
    padding: "20px",
  },
  logoutButton: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default Dashboard;
