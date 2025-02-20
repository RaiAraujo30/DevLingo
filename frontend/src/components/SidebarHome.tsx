export default function SidebarHome() {
  return (
    <aside className="w-64 flex-shrink-0 space-y-6">
      {/* Seção de tags */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-bold mb-2">Tags Populares</h3>
        <div className="flex flex-wrap gap-2">
          {["React", "NestJS", "Node", "Database"].map((tag) => (
            <span
              key={tag}
              className="bg-ggom-2 text-white px-2 py-1 rounded text-sm hover:bg-ggom-3 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Seção de top autores */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-bold mb-2">Top Autores</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          {["Fulano", "Ciclano", "Beltrano"].map((author) => (
            <li key={author} className="hover:underline cursor-pointer">
              {author}
            </li>
          ))}
        </ul>
      </div>

      {/* Posts em Destaque */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-bold mb-2">Posts em Destaque</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          {["Post A", "Post B", "Post C"].map((p, i) => (
            <li key={i} className="hover:underline cursor-pointer">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
