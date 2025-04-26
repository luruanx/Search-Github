'use client';

import { useState } from 'react';
import Image from 'next/image';

type GitHubUser = {
    name: string;
    avatar_url: string;
    bio: string;
};

export default function GitHubSearch() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState<GitHubUser | null>(null);
    const [error, setError] = useState('');

    const fetchUser = async () => {
        if (!username) return;

        try {
            const res = await fetch(`https://api.github.com/users/${username}`);
            if (!res.ok) throw new Error('Usuário não encontrado');
            const data = await res.json();
            setUserData(data);
            setError('');
        } catch (err) {
            setUserData(null);
            setError('Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente.');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') fetchUser();
    };

    return (
        <div className="bg-[#0c0c0c] max-w-[800px] w-full h-[450px] rounded-xl p-6 space-y-6 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            <Image src="/logo.png" alt="Logo" width={58} height={58} />
            <h1 className="text-white text-5xl font-light">Perfil <span className='font-semibold'>GitHub</span></h1>
          </div>
      
          <div className="relative flex justify-center items-center">
            <input
              type="text"
              placeholder="Digite um usuário do GitHub"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-[379px] h-[48px] py-2 px-4 pr-12 rounded-lg border border-gray-300 text-black placeholder:text-gray-500"
            />
            <button
              onClick={fetchUser}
              className="absolute right-[1px] top-1/2 -translate-y-1/2 p-1 bg-[#005CFF] rounded-lg p-[11px]"
            >
              <Image src="/search-icon.png" alt="Buscar" width={24} height={24} />
            </button>
          </div>
      
          {error && (
            <div className="bg-gray-300 text-red-600 text-sm p-3 rounded w-[550px] h-[80px] flex justify-center items-center ">
              {error}
            </div>
          )}
      
          {userData && (
            <div className="bg-gray-300 p-4 rounded-lg flex gap-4 items-start w-[550px] h-[180px] justify-center items-center">
              <Image
                src={userData.avatar_url}
                alt={`Foto de perfil de ${userData.name}`}
                width={64}
                height={64}
                className="rounded-full w-36 h-36 border-2 border-[#005CFF]"
              />
              <div className="flex flex-col justify-center gap-3">
                <h2 className="text-[#005CFF] text-lg font-bold">{userData.name}</h2>
                <p className="text-black text-xs font-light ">{userData.bio || 'Sem bio disponível.'}</p>
              </div>
            </div>
          )}
        </div>
      );
      
      
    }      