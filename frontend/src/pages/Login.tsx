import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log("Botão de login clicado!"); // 🔹 Log de depuração

    try {
        const data = await login(email, password);
        if (data.access_token) {
          navigate("/dashboard"); // Redireciona se houver access_token
        }
      } catch (err) {
        setError("Email ou senha inválidos.");
        console.error("Erro no login:", err);
      }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Entrar</button>
      </form>
      <p>
        Não tem uma conta? <a href="/register" style={styles.link}>Cadastre-se</a>
      </p>
    </div>
  );
};

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "300px",
    margin: "0 auto",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#282c34",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Login;
