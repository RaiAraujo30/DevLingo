import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Carregando...");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/ping")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("Erro ao conectar ao backend"));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>DevLingo Frontend</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
