import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">AI Video Creation Platform</h1>
      <div className="space-y-4">
        <Link 
          href="/projects"
          className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          My Projects
        </Link>
      </div>
    </main>
  )
}
