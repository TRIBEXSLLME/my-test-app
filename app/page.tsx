import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Test Runner Home</h1>
      <Link 
        href="/test" 
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Go to Test Runner
      </Link>
    </main>
  );
}