import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await register(name, email, password);
      navigate("/login"); // Redireciona para login após cadastro bem-sucedido
    } catch (err: any) {
      console.error("Erro ao cadastrar:", err.message); // Log do erro no console
      setError(err.message); // Exibe erro do backend na UI
    }
  };

  return (
    <div style={styles.container}>
      <h2>Cadastro</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
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
        <button type="submit" style={styles.button}>Cadastrar</button>
      </form>
      <p>
        Já tem uma conta? <a href="/login" style={styles.link}>Faça login</a>
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

export default Register;
