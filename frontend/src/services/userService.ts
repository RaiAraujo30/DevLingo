const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Função para buscar os dados do usuário logado usando o endpoint current-user
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/users/current-user`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar dados do usuário");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Erro desconhecido ao buscar dados do usuário.");
  }
};

// Função para atualizar a foto de perfil
export const updateProfilePicture = async (file: File) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    console.log(file)
    formData.append("profile_picture", file);

    // Se o endpoint de atualização estiver implementado com /users/me/profile-picture,
    // você pode mantê-lo ou ajustá-lo para current-user se preferir
    const response = await fetch(`${API_URL}/users/me/profile-picture`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar a foto de perfil");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Erro desconhecido ao atualizar a foto de perfil.");
  }
};
