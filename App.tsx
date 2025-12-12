import React, { useState, useEffect } from 'react';
import { Theme, ViewState, Project, ProfileData, Experience, Education, Certification, Course } from './types';
import { fetchPortfolioData } from './services/dataService';
import Layout from './components/Layout';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import HeroMobile from './components/HeroMobile';
import { Briefcase, Mail, Database, LineChart, Code, Filter, Circle, User } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light'); // Default to light
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTechFilter, setActiveTechFilter] = useState<string>('Todos');
  
  const [data, setData] = useState<{
      profile: ProfileData | null;
      projects: Project[];
      experiences: Experience[];
      skills: string[];
      education: Education[];
      certifications: Certification[];
      courses: Course[];
  }>({ profile: null, projects: [], experiences: [], skills: [], education: [], certifications: [], courses: [] });

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
    setActiveTechFilter('Todos'); // Reset filter when navigating
  };

  if (!data.profile) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400">Loading...</div>;

  // Filter Logic
  // Extract unique technologies, sort them alphabetically, and then prepend 'Todos'
  const uniqueTechs = Array.from(new Set(data.projects.flatMap(p => p.technologies))).sort();
  const allTechnologies = ['Todos', ...uniqueTechs];
  
  const filteredProjects = activeTechFilter === 'Todos' 
    ? data.projects 
    : data.projects.filter(p => p.technologies.includes(activeTechFilter));

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
             // Helper for Section Headers
             const SectionHeader = ({ title }: { title: string }) => (
                <div className="flex items-center mb-6 border-l-4 border-primary dark:border-primary-dark pl-4">
                    <h2 className="text-xl font-bold text-primary dark:text-white">
                        {title}
                    </h2>
                </div>
             );

             // Helper for List Items (Education, Certs, Courses)
             const ListItem = ({ title, subtitle, date }: { title: string, subtitle: string, date: string }) => (
                <div className="flex items-start gap-4">
                    <Circle className="mt-1.5 shrink-0 text-primary dark:text-primary-dark" size={14} strokeWidth={3} />
                    <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {subtitle}
                        </p>
                        <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block">
                            {date}
                        </span>
                    </div>
                </div>
             );

            return (
                <div className="animate-in fade-in duration-300 max-w-5xl">
                     <HeroMobile profile={data.profile} />

                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        <User className="text-primary dark:text-primary-dark" />
                        Sobre
                    </h2>
                     
                     <div className="space-y-12">
                        {/* 1. Resumo */}
                        <section>
                            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                                {data.profile.bio} Tenho forte background em análise estatística e desenvolvimento de soluções de dados escaláveis. Meu foco é entregar valor real ao negócio, garantindo integridade e acessibilidade da informação.
                            </p>
                        </section>

                        {/* 2. Formação */}
                        <section>
                            <SectionHeader title="Formação" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                {data.education && data.education.map((edu) => (
                                    <ListItem 
                                        key={edu.id}
                                        title={edu.degree}
                                        subtitle={edu.institution}
                                        date={edu.period}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* 3. Certificações */}
                        <section>
                            <SectionHeader title="Certificações" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                {data.certifications && data.certifications.map(cert => (
                                    <ListItem 
                                        key={cert.id}
                                        title={cert.name}
                                        subtitle={cert.issuer}
                                        date={cert.year}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* 4. Cursos Relevantes */}
                        <section>
                            <SectionHeader title="Cursos Relevantes" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                {data.courses && data.courses.map(course => (
                                    <ListItem 
                                        key={course.id}
                                        title={course.title}
                                        subtitle={course.institution}
                                        date={course.year}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* 5. Experiência Profissional */}
                        <section>
                            <SectionHeader title="Experiência Profissional" />
                            
                            <div className="space-y-8">
                                {data.experiences.map((exp) => (
                                    <div key={exp.id} className="flex items-start gap-4">
                                        <Circle className="mt-1.5 shrink-0 text-primary dark:text-primary-dark" size={14} strokeWidth={3} />
                                        <div>
                                            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                                                {exp.role}
                                            </h3>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-0.5 mb-2">
                                                {exp.company} <span className="text-gray-300 dark:text-gray-600 mx-2">|</span> {exp.period}
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 6. Tecnologias */}
                        <section>
                            <SectionHeader title="Tecnologias" />
                            <div className="flex flex-wrap gap-2">
                                {data.skills && data.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-md font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                     </div>

                </div>
            );

        case 'projects':
            return (
                <div>
                    <HeroMobile profile={data.profile} />
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <Briefcase className="text-primary dark:text-primary-dark" />
                            Projetos
                        </h2>
                    </div>

                    {/* Filter Bar */}
                    <div className="mb-8 overflow-x-auto pb-2 no-scrollbar">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 mr-2">
                                <Filter size={18} />
                            </span>
                            {allTechnologies.map(tech => (
                                <button
                                    key={tech}
                                    onClick={() => setActiveTechFilter(tech)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                        activeTechFilter === tech
                                            ? 'bg-primary dark:bg-primary-dark text-white shadow-md'
                                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
                                    }`}
                                >
                                    {tech}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map(p => (
                                <ProjectCard key={p.id} project={p} onClick={setSelectedProject} />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
                                Nenhum projeto encontrado com a tecnologia selecionada.
                            </div>
                        )}
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