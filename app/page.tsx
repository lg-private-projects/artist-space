export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Artist Space</h1>
        <p className="text-gray-600">Plataforma para Artistas</p>
        <div className="mt-8 space-x-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Explorar Artistas
          </button>
          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            Registrarte como Artista
          </button>
        </div>
      </div>
    </main>
  )
}