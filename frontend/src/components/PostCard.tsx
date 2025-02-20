interface Post {
  id: string;
  content: string;
  type: string;
  user: {
    username: string;
    [key: string]: any;
  };
  problem?: {
    title: string;
    [key: string]: any;
  };
  created_at: string;
  // ... outros campos
}

export default function PostCard({ post }: { post: Post }) {
  const postTitle = post.problem ? post.problem.title : "Post sem problema vinculado";
  const authorName = post.user ? post.user.username : "Anônimo";
  const date = new Date(post.created_at).toLocaleString();

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-xl font-semibold mb-2">{postTitle}</h3>
      <p className="text-gray-600 text-sm mb-2">{post.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Autor: {authorName}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}
