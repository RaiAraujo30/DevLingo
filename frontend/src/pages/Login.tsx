import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await login(email, password);
      if (data.access_token) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Email ou senha inválidos.");
      console.error("Erro no login:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md bg-white rounded shadow-lg p-8">
        <h2 className="text-2xl font-bold text-ggom-2 mb-6 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-ggom-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-ggom-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-ggom-2 hover:bg-ggom-3 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center">
          Não tem uma conta?{" "}
          <a
            href="/register"
            className="text-ggom-4 hover:underline font-semibold"
          >
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
