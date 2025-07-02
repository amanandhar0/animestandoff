'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import characters from '@/data/characters.json';

type Character = {
  name: string;
  anime: string;
  image: string;
  power: number;
};

export default function GamePage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'all';

  const [character, setCharacter] = useState<Character | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  const maxRounds = 20;

  useEffect(() => {
    loadNewCharacter();
  }, []);

  const loadNewCharacter = () => {
    const filtered = mode === 'onepiece'
      ? characters.filter(c => c.anime.toLowerCase() === 'onepiece')
      : characters;

    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setCharacter(random);
  };

  const handleResult = (outcome: 'win' | 'loss' | 'skip') => {
    if (outcome === 'win') setScore(prev => prev + 1);
    if (outcome === 'loss') setScore(prev => prev - 1);
    if (outcome !== 'skip') setRound(prev => prev + 1);

    if (round < maxRounds || outcome === 'skip') {
      loadNewCharacter();
    }
  };

  if (round > maxRounds) {
    return (
      <main className="flex flex-col items-center justify-center h-screen p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Game Over</h1>
        <p className="mb-6 text-lg">Your final score: {score}</p>
        <div className="flex gap-4">
          <button onClick={() => location.reload()} className="bg-blue-500 px-4 py-2 rounded text-white">
            Replay
          </button>
          <a href="/" className="bg-gray-700 px-4 py-2 rounded text-white">
            Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-4">
      <h1 className="text-xl font-semibold">Round {round} of {maxRounds}</h1>
      <h2 className="text-2xl font-bold">Score: {score}</h2>

      {character && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={character.image}
            alt={character.name}
            className="w-[240px] h-[360px] object-cover rounded-xl border-2 shadow-md"
          />
          <p className="text-lg font-medium">{character.name}</p>
        </div>
      )}

      <div className="flex justify-center gap-4 mt-4 w-full max-w-xs">
        <button
          onClick={() => handleResult('win')}
          className="flex-1 bg-green-600 py-3 rounded-xl text-white text-xl"
        >
          ➕
        </button>
        <button
          onClick={() => handleResult('skip')}
          className="flex-1 bg-gray-500 py-3 rounded-xl text-white text-xl"
        >
          ⏭
        </button>
        <button
          onClick={() => handleResult('loss')}
          className="flex-1 bg-red-600 py-3 rounded-xl text-white text-xl"
        >
          ➖
        </button>
      </div>
    </main>
  );
}
