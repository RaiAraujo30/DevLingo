import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [type, setType] = useState("text");
  const [problemId, setProblemId] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token") || "";
      const newPost = await createPost({ content, type, problemId }, token);
      console.log("Post criado:", newPost);
      // Redireciona para home (ou para o post criado)
      navigate("/");
    } catch (err) {
      alert("Erro ao criar post");
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Criar Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Digite o conteúdo do post"
          className="w-full border p-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select
          className="w-full border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="text">Texto</option>
          <option value="image">Imagem</option>
          {/* etc. */}
        </select>
        <input
          type="text"
          placeholder="Problem ID (opcional)"
          className="w-full border p-2 rounded"
          value={problemId}
          onChange={(e) => setProblemId(e.target.value)}
        />
        <button className="bg-ggom-2 hover:bg-ggom-3 text-white font-semibold px-4 py-2 rounded">
          Criar Post
        </button>
      </form>
    </div>
  );
}
