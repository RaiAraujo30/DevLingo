import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import SidebarHome from "../components/SidebarHome";
import Footer from "../components/Footer";
import { fetchAllPosts } from "../services/postService";
import { useNavigate } from "react-router-dom";

// Tipos de dados (mock)
interface Post {
  id: string;
  content: string;
  type: string;
  user: {
    username: string;
  };
  problem?: {
    title: string;
  };
  created_at: string;
}


export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
      } catch (err) {
        setError("Erro ao carregar posts.");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (error) {
    return <p className="text-center p-4 text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero / Banner */}
      <div className="bg-ggom-1 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Bem-vindo ao DevLingo!
            </h1>
            <p className="text-lg md:text-xl mb-4">
              Aprenda, discuta e compartilhe soluções de programação.
            </p>
            {/* Exemplo de campo de busca */}
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Pesquisar posts..."
                className="rounded-l border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ggom-3 text-black"
              />
              <button className="bg-ggom-2 hover:bg-ggom-3 text-white font-semibold px-4 py-2 rounded-r">
                Buscar
              </button>
            </div>
            {/* Botão de Criar Post */}
            <button
              onClick={() => navigate("/create-post")}
              className="bg-ggom-2 hover:bg-ggom-3 text-white font-semibold px-4 py-2 rounded"
            >
              Criar Post
            </button>
          </div>
          <img
            src="https://via.placeholder.com/300x200/00a/fff?text=DevLingo+Banner"
            alt="Banner"
            className="w-full md:w-1/3 object-cover rounded shadow"
          />
        </div>
      </div>

      {/* Conteúdo principal (Feed + Sidebar) */}
      <div className="flex flex-grow max-w-7xl mx-auto w-full py-8 px-4 gap-6">
        {/* Coluna principal - Feed de Posts */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Posts Recentes</h2>
          {loading ? (
            <p>Carregando posts...</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar (tags, top autores, destaque, etc.) */}
        <SidebarHome />
      </div>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}
