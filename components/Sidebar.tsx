import React from 'react';
import { Home, User, Briefcase, Mail, Moon, Sun, Github, Linkedin } from 'lucide-react';
import { ViewState, Theme, ProfileData } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  theme: Theme;
  toggleTheme: () => void;
  profile: ProfileData;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, theme, toggleTheme, profile }) => {
  
  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'about', label: 'Sobre', icon: User },
    { id: 'projects', label: 'Projetos', icon: Briefcase },
    { id: 'contact', label: 'Contato', icon: Mail },
  ] as const;

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white dark:bg-[#1f2937] border-r border-gray-200 dark:border-gray-800 z-50">
      
      {/* Header with Banner & Profile */}
      <div className="relative mb-16">
        <div className="h-24 w-full overflow-hidden">
            <img src={profile.banner} alt="Banner" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-12 left-6">
            <img 
                src={profile.avatar} 
                alt="Profile" 
                className="w-24 h-24 rounded-std border-4 border-white dark:border-[#1f2937] shadow-md object-cover"
            />
        </div>
      </div>

      <div className="px-6 mb-8">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight leading-tight">
            {profile.name}
        </h1>
        <div className="inline-block mt-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                {profile.role}
            </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ViewState)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-std transition-all duration-200 group ${
                isActive 
                  ? 'bg-primary dark:bg-primary-dark text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <Icon 
                size={20} 
                className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
              />
              <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
            <div className="flex space-x-3">
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors">
                    <Linkedin size={20} />
                </a>
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors">
                    <Github size={20} />
                </a>
            </div>
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle Theme"
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
