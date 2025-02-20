export default function Footer() {
  return (
    <footer className="bg-ggom-1 text-white py-4 mt-6">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <p>© 2025 DevLingo</p>
        <div className="space-x-4 text-sm">
          <a href="/termos" className="hover:underline">
            Termos de Uso
          </a>
          <a href="/contato" className="hover:underline">
            Contato
          </a>
        </div>
      </div>
    </footer>
  );
}
