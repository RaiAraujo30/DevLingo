// src/components/Sidebar.tsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 h-screen bg-ggom-1 text-white">
      {/* Logo / Título */}
      <div className="p-6 text-2xl font-bold border-b border-ggom-2">
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
            <Link
              to="/profile"
              className="block px-4 py-3 hover:bg-ggom-2 transition-colors"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="block px-4 py-3 hover:bg-ggom-2 transition-colors"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>

      {/* Rodapé / Opcional */}
      <div className="p-4 text-sm border-t border-ggom-2">
        © 2025 DevLingo
      </div>
    </div>
  );
}
