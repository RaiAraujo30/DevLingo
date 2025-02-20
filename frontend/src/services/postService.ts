const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Lista todos os posts
export async function fetchAllPosts() {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error("Erro ao buscar posts");
  }
  return response.json();
}

// Busca um post específico
export async function fetchPostById(id: string) {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar post específico");
  }
  return response.json();
}

// Cria um novo post (requer autenticação)
export async function createPost(postData: any, token: string) {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    throw new Error("Erro ao criar post");
  }
  return response.json();
}

// Atualiza um post (requer autenticação)
export async function updatePost(id: string, postData: any, token: string) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar post");
  }
  return response.json();
}

// Exclui um post (requer autenticação)
export async function deletePost(id: string, token: string) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Erro ao excluir post");
  }
  return response.json();
}
