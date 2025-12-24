
import React from 'react';
import { ProfileData } from '../types';

interface HeroMobileProps {
  profile: ProfileData;
}

const HeroMobile: React.FC<HeroMobileProps> = ({ profile }) => {
  return (
    <div className="md:hidden flex items-center space-x-4 mb-10 pt-4">
      <img 
        src={profile.avatar || "https://placehold.co/100x100?text=Avatar"} 
        alt={profile.name} 
        className="w-[88px] h-[88px] rounded-std object-cover shadow-sm border-2 border-white dark:border-gray-800"
      />
      <div className="flex flex-col items-start text-left flex-1">
        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
            Olá, eu sou
        </span>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-0.5 break-words w-full">
            {profile.name || "Carregando..."}
        </h1>
        <p className="text-sm text-primary dark:text-primary-dark font-semibold tracking-wide">
            {profile.role}
        </p>
      </div>
    </div>
  );
};

export default HeroMobile;
