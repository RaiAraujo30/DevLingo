import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken, logout } from "../services/authService"; // ou outro local
import { getUserProfile } from "../services/userService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = getToken();
      if (token) {
        setIsLoggedIn(true);
        // Opcional: Buscar dados do usuário (incluindo foto) via API
        // Exemplo fictício:
        const user = await getUserProfile();
        setUserPhoto(`${API_URL}/uploads/profile-pictures/${user.profile_picture}`);
        // // Para manter o exemplo simples, vamos usar um link fixo
        // setUserPhoto("https://via.placeholder.com/40");
      }
    };
    fetchUserProfile();
  }, []);

  function handleLogout() {
    logout();       // Remove o token do localStorage
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <div className="flex flex-col w-64 h-screen bg-ggom-1 text-white">
      {/* Logo + Foto do Usuário */}
      <div className="p-6 text-2xl font-bold border-b border-ggom-2 flex items-center gap-2">
        {/* Se tiver foto, exibe a imagem */}
        {userPhoto && (
          <img
            src={userPhoto}
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        DevLingo
      </div>

      {/* Navegação */}
      <nav className="flex-grow">
        <ul className="flex flex-col">
          <li>
            <Link
              to="/"
              className="block px-4 py-3 hover:bg-ggom-2 transition-colors"
            >
              Home
            </Link>
          </li>

          <li>
            {isLoggedIn ? (
              <Link
                to="/Dashboard"
                className="block px-4 py-3 hover:bg-ggom-2 transition-colors"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-3 hover:bg-ggom-2 transition-colors"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>

      {/* Rodapé com o botão de logout (apenas se logado) */}
      <div className="p-4 text-sm border-t border-ggom-2">
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 bg-ggom-2 hover:bg-ggom-3 transition-colors rounded text-white font-semibold"
          >
            Sair
          </button>
        )}
        <p className="mt-2">© 2025 DevLingo</p>
      </div>
    </div>
  );
}
