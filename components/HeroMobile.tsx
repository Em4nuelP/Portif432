import React from 'react';
import { ProfileData } from '../types';

interface HeroMobileProps {
  profile: ProfileData;
}

const HeroMobile: React.FC<HeroMobileProps> = ({ profile }) => {
  return (
    <div className="md:hidden flex items-center space-x-4 mb-8 pt-4">
      <img 
        src={profile.avatar} 
        alt={profile.name} 
        className="w-[88px] h-[88px] rounded-std object-cover shadow-sm"
      />
      <div className="flex flex-col items-start text-left">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Olá, eu sou
        </span>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-none mb-0.5">
            {profile.name.split(' ')[0]}
        </h1>
        <p className="text-sm text-primary dark:text-primary-dark font-semibold uppercase tracking-wide">
            {profile.role}
        </p>
      </div>
    </div>
  );
};

export default HeroMobile;