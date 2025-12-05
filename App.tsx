import React, { useState, useEffect } from 'react';
import { Theme, ViewState, Project, ProfileData, Experience } from './types';
import { fetchPortfolioData } from './services/dataService';
import Layout from './components/Layout';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import HeroMobile from './components/HeroMobile';
import { Briefcase, User, Mail, Database, LineChart, Code } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light'); // Default to light
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const [data, setData] = useState<{
      profile: ProfileData | null;
      projects: Project[];
      experiences: Experience[];
  }>({ profile: null, projects: [], experiences: [] });

  // Load Data
  useEffect(() => {
    const loadData = async () => {
        const result = await fetchPortfolioData();
        setData(result);
    };
    loadData();
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    // Small timeout ensures the DOM has updated before scrolling
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);
  }, [currentView, selectedProject]);

  // Handle Theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleNavigate = (view: ViewState) => {
    setSelectedProject(null);
    setCurrentView(view);
  };

  if (!data.profile) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400">Loading...</div>;

  // Views Content
  const renderContent = () => {
    if (selectedProject) {
        return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />;
    }

    switch (currentView) {
        case 'home':
            return (
                <div className="space-y-12">
                    <HeroMobile profile={data.profile} />
                    
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Transformando dados em <span className="text-primary dark:text-primary-dark">estratégia</span>.
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                            {data.profile.bio}
                        </p>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-std shadow-sm border border-gray-100 dark:border-gray-700">
                            <Database className="text-primary dark:text-primary-dark mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Engenharia de Dados</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Pipelines ETL robustos, modelagem dimensional e armazéns de dados.</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-std shadow-sm border border-gray-100 dark:border-gray-700">
                            <LineChart className="text-primary dark:text-primary-dark mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Business Intelligence</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Dashboards interativos, storytelling com dados e KPIs estratégicos.</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-std shadow-sm border border-gray-100 dark:border-gray-700">
                            <Code className="text-primary dark:text-primary-dark mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Automação</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Scripts Python/SQL para automatizar relatórios e processos manuais.</p>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Briefcase size={24} className="text-primary dark:text-primary-dark" />
                                Projetos Recentes
                            </h2>
                            <button 
                                onClick={() => handleNavigate('projects')}
                                className="text-sm font-medium text-primary dark:text-primary-dark hover:underline"
                            >
                                Ver todos
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.projects.slice(0, 3).map(p => (
                                <ProjectCard key={p.id} project={p} onClick={setSelectedProject} />
                            ))}
                        </div>
                    </section>
                </div>
            );

        case 'about':
            return (
                <div>
                     <HeroMobile profile={data.profile} />
                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        <User className="text-primary dark:text-primary-dark" />
                        Experiência
                    </h2>
                    
                    <div className="space-y-8 relative pl-2">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                        {data.experiences.map((exp, idx) => (
                            <div key={exp.id} className="relative pl-8">
                                {/* Timeline Dot */}
                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-4 border-primary dark:border-primary-dark"></div>
                                
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-std shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                                        <span className="text-sm font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <h4 className="text-primary dark:text-primary-dark font-medium mb-3">{exp.company}</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'projects':
            return (
                <div>
                    <HeroMobile profile={data.profile} />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        <Briefcase className="text-primary dark:text-primary-dark" />
                        Projetos
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.projects.map(p => (
                            <ProjectCard key={p.id} project={p} onClick={setSelectedProject} />
                        ))}
                    </div>
                </div>
            );

        case 'contact':
            return (
                <div className="max-w-xl">
                    <HeroMobile profile={data.profile} />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        <Mail className="text-primary dark:text-primary-dark" />
                        Contato
                    </h2>
                    
                    <div className="space-y-4">
                        <a 
                            href={`mailto:${data.profile.social.email}`}
                            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-std shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 group"
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full text-primary dark:text-primary-dark mr-4 group-hover:scale-110 transition-transform">
                                <Mail size={24} />
                            </div>
                            <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                {data.profile.social.email}
                            </span>
                        </a>

                        <a 
                            href={data.profile.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-std shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 group"
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full text-primary dark:text-primary-dark mr-4 group-hover:scale-110 transition-transform">
                                <Briefcase size={24} />
                            </div>
                            <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                LinkedIn
                            </span>
                        </a>

                         <a 
                            href={data.profile.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-std shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 group"
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full text-primary dark:text-primary-dark mr-4 group-hover:scale-110 transition-transform">
                                <Code size={24} />
                            </div>
                            <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                GitHub
                            </span>
                        </a>
                    </div>
                </div>
            );
            
        default:
            return null;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={handleNavigate} 
      theme={theme} 
      toggleTheme={toggleTheme}
      profile={data.profile}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
