import { useEffect, useState } from "react";
import { getUserProfile, updateProfilePicture } from "../services/userService";

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();
        console.log("Resposta do backend:", data);
        setUser(data);
      } catch (err) {
        setError("Erro ao carregar dados do usuário");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const data = await updateProfilePicture(selectedFile);
        setUser(data); // Atualiza os dados com a nova foto
      } catch (err) {
        setError("Erro ao atualizar a foto de perfil");
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Monta a URL final para exibir a imagem
  console.log(user.profile_picture);
  const profileImageUrl = `http://localhost:3000/uploads/profile-pictures/${user.profile_picture}`;
  // ou: `${import.meta.env.VITE_API_URL}/uploads/profile-pictures/${user.profile_picture}`;

  return (
    <div style={styles.container}>
      <h2>Perfil do Usuário</h2>
      <img
        src={profileImageUrl}
        alt="Foto de perfil"
        style={styles.profileImage}
      />
      <p><strong>Nome:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
      <div style={styles.uploadContainer}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} style={styles.uploadButton}>
          Atualizar Foto de Perfil
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  uploadContainer: {
    marginTop: "20px",
  },
  uploadButton: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#282c34",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};

export default UserProfile;
