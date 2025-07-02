// app/game/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import characters from '@/data/characters.json';
import Image from 'next/image';
import Link from 'next/link';

type Character = {
  name: string;
  anime: string;
  image: string;
  power: number;
};

const TOTAL_ROUNDS = 20;

export default function GamePage() {
  const searchParams = useSearchParams();
  const mode = (searchParams.get('mode') || 'onepiece') as 'onepiece' | 'all';

  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [character, setCharacter] = useState<Character | null>(null);
  const [usedCharacters, setUsedCharacters] = useState<Set<string>>(new Set());
  const [gameOver, setGameOver] = useState(false);

  const loadNewCharacter = () => {
    const filtered = mode === 'onepiece'
      ? characters.filter(c => c.anime.toLowerCase() === 'onepiece')
      : characters;

    const remaining = filtered.filter(c => !usedCharacters.has(c.image));

    if (remaining.length === 0) {
      setGameOver(true);
      return;
    }

    const random = remaining[Math.floor(Math.random() * remaining.length)];
    setCharacter(random);
    setUsedCharacters(prev => new Set(prev).add(random.image));
  };

  const handleResult = (result: 'win' | 'loss' | 'skip') => {
    if (result === 'win') setScore(score + 1);
    else if (result === 'loss') setScore(score - 1);

    if (result !== 'skip') setRound(round + 1);
    loadNewCharacter();
  };

  useEffect(() => {
    loadNewCharacter();
  }, []);

  if (gameOver || round > TOTAL_ROUNDS) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-4xl font-bold">🎮 Game Over</h1>
        <p className="text-xl">Final Score: {score}</p>
        <button
          onClick={() => {
            setScore(0);
            setRound(1);
            setUsedCharacters(new Set());
            setGameOver(false);
            loadNewCharacter();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Replay
        </button>
        <Link href="/" className="text-blue-500 underline">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6">
      <h1 className="text-3xl font-bold mb-2">🎴 Anime Standoff</h1>
      <p className="mb-4 text-sm">Round {round} / {TOTAL_ROUNDS}</p>

      <p className="text-xl font-bold mb-2">Score: {score}</p>

      {character && (
        <>
          <Image
            src={character.image}
            alt={character.name}
            width={240}
            height={320}
            className="object-cover rounded mb-4 border"
          />
          <h2 className="text-2xl font-semibold mb-4">{character.name}</h2>
        </>
      )}

      <div className="flex justify-center gap-4 mt-4 w-full max-w-xs">
        <button
          onClick={() => handleResult('win')}
          className="bg-green-600 hover:bg-green-400 text-white font-bold py-3 px-6 rounded shadow-md active:shadow-none"
        >
          WIN ✅
        </button>
        <button
          onClick={() => handleResult('skip')}
          className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold py-3 px-6 rounded shadow-md active:shadow-none"
        >
          SKIP ℹ️
        </button>
        <button
          onClick={() => handleResult('loss')}
          className="bg-red-500 hover:bg-red-300 text-white font-bold py-3 px-6 rounded shadow-md active:shadow-none"
        >
          LOSS ❌
        </button>
      </div>
    </div>
  );
}
