import React from 'react';
import { Home, User, Briefcase, Mail, Moon, Sun } from 'lucide-react';
import { ViewState, Theme } from '../types';

interface MobileNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentView, onNavigate, theme, toggleTheme }) => {
  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'about', label: 'Sobre', icon: User },
    { id: 'projects', label: 'Projetos', icon: Briefcase },
    { id: 'contact', label: 'Contato', icon: Mail },
  ] as const;

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, view: ViewState) => {
      e.currentTarget.blur(); // Remove focus immediately to prevent scroll jump
      onNavigate(view);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 flex items-center justify-between px-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] transition-colors duration-200">
      
      <div className="flex flex-1 justify-around items-center h-full mr-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={(e) => handleNavClick(e, item.id as ViewState)}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? 'text-primary dark:text-primary-dark' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              {/* Optional: Tiny dot for active state if we want minimal */}
              {isActive && <div className="w-1 h-1 bg-current rounded-full mt-1"></div>}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1"></div>

      {/* Theme Toggle */}
      <button 
        onClick={(e) => {
            e.currentTarget.blur();
            toggleTheme();
        }}
        className="ml-2 w-10 h-10 flex items-center justify-center rounded-std text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
         {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

    </div>
  );
};

export default MobileNav;