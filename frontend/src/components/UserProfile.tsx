import { useEffect, useState } from "react";
import { getUserProfile, updateProfilePicture } from "../services/userService";

interface User {
  id: string;
  username: string;
  email: string;
  profile_picture?: string;
  // outros campos...
}

interface LeetStats {
  status: string;
  message: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
  // ex: { "1677715200": 2, ... } => "timestamp (segundos)": qtd de submissões
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [leetStats, setLeetStats] = useState<LeetStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

 

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 1) Buscar dados do usuário local
  // 2) Usar o username para buscar dados do LeetCode
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);

        if (userData.username) {
          const leetData = await fetchLeetStats(userData.username);
          setLeetStats(leetData);
        }
      } catch (err) {
        setError("Erro ao carregar dados do usuário ou do LeetCode.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

   // Lida com seleção de arquivo
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Faz o upload da foto
  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const data = await updateProfilePicture(selectedFile);
        setUser(data); // Atualiza o user com a nova foto
      } catch (err) {
        setError("Erro ao atualizar a foto de perfil");
      }
    }
  };

  if (loading) {
    return <p className="text-center p-4">Carregando...</p>;
  }
  if (error) {
    return <p className="text-center p-4 text-red-500">{error}</p>;
  }

   // Monta URL para a foto de perfil
   const profileImageUrl = user?.profile_picture
   ? `http://localhost:3000/uploads/profile-pictures/${user.profile_picture}`
   : "https://via.placeholder.com/150";

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Seção 1: Dados do usuário */}
      <div className="bg-white shadow rounded p-6 flex items-center gap-6">
        <img
          src={profileImageUrl}
          alt="Foto de perfil"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{user?.username}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
        {/* Upload de foto */}
        <div className="flex flex-col items-center gap-2">
          <input type="file" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            className="bg-ggom-2 hover:bg-ggom-3 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Atualizar Foto
          </button>
        </div>
      </div>

      {/* Seção 2: Estatísticas do LeetCode */}
      {leetStats && (
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-xl font-bold mb-4">LeetCode Stats</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              label="Total Solved"
              value={`${leetStats.totalSolved}/${leetStats.totalQuestions}`}
            />
            <StatCard
              label="Easy"
              value={`${leetStats.easySolved}/${leetStats.totalEasy}`}
            />
            <StatCard
              label="Medium"
              value={`${leetStats.mediumSolved}/${leetStats.totalMedium}`}
            />
            <StatCard
              label="Hard"
              value={`${leetStats.hardSolved}/${leetStats.totalHard}`}
            />
            <StatCard
              label="Acceptance"
              value={`${leetStats.acceptanceRate.toFixed(2)}%`}
            />
            <StatCard
              label="Ranking"
              value={leetStats.ranking.toLocaleString()}
            />
            <StatCard
              label="Points"
              value={leetStats.contributionPoints.toString()}
            />
            <StatCard
              label="Reputation"
              value={leetStats.reputation.toString()}
            />
          </div>
        </div>
      )}

      {/* Seção 3: Calendário de Submissões (tipo GitHub) */}
      {leetStats && (
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-xl font-bold mb-4">Calendário de Submissões</h3>
          <SubmissionCalendar
            submissionCalendar={leetStats.submissionCalendar}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Componente de card para exibir uma estatística (label e value).
 */
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ggom-1 text-white p-4 rounded shadow text-center flex flex-col">
      <span className="font-bold text-lg">{value}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
}

/**
 * Busca estatísticas do LeetCode via API https://leetcode-stats-api.herokuapp.com/<USERNAME>
 */
async function fetchLeetStats(username: string): Promise<LeetStats> {
  const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error("Falha ao buscar estatísticas do LeetCode");
  }
  const data = await resp.json();
  if (data.status !== "success") {
    throw new Error("API do LeetCode retornou erro.");
  }
  return data;
}

/**
 * Calendário simplificado tipo GitHub, mostrando os últimos 35 dias.
 * `submissionCalendar` é um objeto { "timestamp": count }.
 */
function SubmissionCalendar({
  submissionCalendar,
}: {
  submissionCalendar: Record<string, number>;
}) {
  // Obter os últimos 35 dias (5 semanas)
  const now = new Date();
  const daysArray = Array.from({ length: 35 })
    .map((_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - i); // dias para trás
      return d;
    })
    .reverse(); // inverter para o mais antigo à esquerda

  // Função para obter cor de fundo com base no count
  function getColor(count: number) {
    if (count === 0) return "bg-gray-200";
    if (count < 2) return "bg-ggom-3";
    if (count < 5) return "bg-ggom-4";
    return "bg-ggom-2";
  }

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-35 gap-1" style={{ minWidth: "400px" }}>
        {daysArray.map((date, idx) => {
          const timestamp = Math.floor(date.getTime() / 1000); // seg
          const count = submissionCalendar[timestamp] || 0;
          return (
            <div
              key={idx}
              className={`w-6 h-6 rounded ${getColor(count)} tooltip relative`}
            >
              <span className="tooltip-text absolute bottom-full mb-1 hidden bg-black text-white text-xs p-1 rounded">
                {date.toDateString()} — {count} submissões
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-sm text-gray-500 mt-2">(Mostrando últimos 35 dias)</p>
    </div>
  );
}
