'use client';

import React from 'react';
import GitHubSearch from '@/app/components/GitHubSearch';

const Home = () => {
  return (
    <div className="bg-[#1f1f1f] min-h-screen flex justify-center items-center">
      <GitHubSearch />
    </div>
  );
};

export default Home;
