const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Função para fazer login
export const login = async (email: string, password: string) => {
  try {
    console.log("Tentando login com:", email, password); // Log para depuração
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Resposta do backend:", data); // Log da resposta

    if (!response.ok) {
      throw new Error(data.message || "Credenciais inválidas");
    }

    // Salvar o token (verificando se vem como access_token)
    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
    }

    return data;
  } catch (error: any) {
    console.error("Erro no login:", error.message);
    throw new Error(error.message || "Erro desconhecido ao fazer login.");
  }
};


// Função para registrar um novo usuário
export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao cadastrar. Tente novamente.");
    }

    return data;
  } catch (error: any) {
    console.error("Erro no cadastro:", error.message);
    throw new Error(error.message || "Erro desconhecido ao cadastrar.");
  }
};

// 🔹 Função para obter o token armazenado
export const getToken = () => {
  return localStorage.getItem("token");
};

// 🔹 Função para fazer logout (remover token)
export const logout = () => {
  localStorage.removeItem("token");
};
