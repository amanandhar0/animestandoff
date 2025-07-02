'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">🎴 Anime Standoff</h1>

      <p className="mb-4">Choose a game mode:</p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push('/game?mode=onepiece')}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl"
        >
          One Piece
        </button>
        <button
          onClick={() => router.push('/game?mode=all')}
          className="px-6 py-2 bg-green-600 text-white rounded-xl"
        >
          All Anime
        </button>
      </div>
    </main>
  );
}
