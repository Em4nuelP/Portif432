import React from 'react';
import { ViewState, Theme, ProfileData } from '../types';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  theme: Theme;
  toggleTheme: () => void;
  profile: ProfileData;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  onNavigate, 
  theme, 
  toggleTheme,
  profile
}) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={onNavigate} 
        theme={theme} 
        toggleTheme={toggleTheme}
        profile={profile}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-0 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
            {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNav 
        currentView={currentView} 
        onNavigate={onNavigate} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
    </div>
  );
};

export default Layout;
