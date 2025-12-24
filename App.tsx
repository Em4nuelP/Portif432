
import React, { useState, useEffect, useMemo } from 'react';
import { Theme, ViewState, Project, ProfileData, Experience, Education, Certification, Course } from './types';
import { fetchPortfolioData } from './services/dataService';
import Layout from './components/Layout';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import HeroMobile from './components/HeroMobile';
import { Briefcase, Mail, Database, LineChart, Code, Filter, Circle, User, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTechFilter, setActiveTechFilter] = useState<string>('Todos');
  const [isLoading, setIsLoading] = useState(true);
  
  const [data, setData] = useState<{
      profile: ProfileData;
      projects: Project[];
      experiences: Experience[];
      skills: string[];
      education: Education[];
      certifications: Certification[];
      courses: Course[];
  }>({ 
      profile: { name: "", role: "", bio: "", aboutText: "", avatar: "", banner: "", social: { linkedin: "", github: "", email: "" } },
      projects: [],
      experiences: [],
      skills: [],
      education: [],
      certifications: [],
      courses: []
  });

  useEffect(() => {
    const loadData = async () => {
        const cached = localStorage.getItem('portfolio_data_v1');
        if (cached) {
            const { data: cachedData } = JSON.parse(cached);
            setData(cachedData);
            setIsLoading(false);
        }

        try {
            const result = await fetchPortfolioData(true);
            setData(result);
        } catch (err) {
            console.error("Failed to refresh data", err);
        } finally {
            setIsLoading(false);
        }
    };
    loadData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView, selectedProject]);

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
    setActiveTechFilter('Todos');
  };

  const allTechnologies = useMemo(() => {
    const uniqueTechs = Array.from(new Set(data.projects.flatMap(p => p.technologies))).sort();
    return ['Todos', ...uniqueTechs];
  }, [data.projects]);
  
  const filteredProjects = useMemo(() => {
    return activeTechFilter === 'Todos' 
      ? data.projects 
      : data.projects.filter(p => p.technologies.includes(activeTechFilter));
  }, [data.projects, activeTechFilter]);

  if (isLoading && !data.profile.name) {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark text-primary dark:text-primary-dark">
              <Loader2 className="animate-spin mb-4" size={48} />
              <p className="text-lg font-medium animate-pulse">Sincronizando com Google Sheets...</p>
          </div>
      );
  }

  const renderContent = () => {
    if (selectedProject) {
        return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />;
    }

    switch (currentView) {
        case 'home':
            return (
                <div className="space-y-12 animate-in fade-in duration-500">
                    {/* O HeroMobile agora só aparece aqui (Tela de Início) */}
                    <HeroMobile profile={data.profile} />
                    
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Transformando dados em <span className="text-primary dark:text-primary-dark">estratégia</span>.
                        </h2>
                        <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {data.profile.bio}
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-std shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                            <Database className="text-primary dark:text-primary-dark mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Análise de Dados</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">SQL, Python e técnicas de análise para responder perguntas de negócio e apoiar decisões.</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-std shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                            <LineChart className="text-primary dark:text-primary-dark mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Business Intelligence</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Criação de KPIs estratégicos e visualizações intuitivas com foco na experiência do usuário.</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-std shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                            <Code className="text-primary dark:text-primary-dark mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Automação & Eficiência</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Scripts em Python/SQL para automatizar processos e relatórios.</p>
                        </div>
                    </section>

                    {data.projects.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Briefcase size={24} className="text-primary dark:text-primary-dark" />
                                    Projetos Recentes
                                </h2>
                                <button onClick={() => handleNavigate('projects')} className="text-sm font-medium text-primary dark:text-primary-dark hover:underline">
                                    Ver todos
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.projects.slice(0, 3).map(p => (
                                    <ProjectCard key={p.id} project={p} onClick={setSelectedProject} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            );

        case 'about':
             const SectionHeader = ({ title }: { title: string }) => (
                <div className="flex items-center mb-6 border-l-4 border-primary dark:border-primary-dark pl-4">
                    <h2 className="text-xl font-bold text-primary dark:text-white">{title}</h2>
                </div>
             );

             const ListItem = ({ title, subtitle, date }: { title: string, subtitle: string, date: string }) => (
                <div className="flex items-start gap-4">
                    <Circle className="mt-1.5 shrink-0 text-primary dark:text-primary-dark" size={14} strokeWidth={3} />
                    <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">{title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
                        <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block">{date}</span>
                    </div>
                </div>
             );

            return (
                <div className="animate-in fade-in duration-500 max-w-5xl">
                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        <User className="text-primary dark:text-primary-dark" />
                        Sobre
                    </h2>
                     
                     <div className="space-y-12">
                        <section>
                            <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify whitespace-pre-wrap">
                                {data.profile.aboutText || data.profile.bio}
                            </div>
                        </section>

                        {data.education.length > 0 && (
                            <section>
                                <SectionHeader title="Formação" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                    {data.education.map((edu) => (
                                        <ListItem key={edu.id} title={edu.degree} subtitle={edu.institution} date={edu.period} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.certifications.length > 0 && (
                            <section>
                                <SectionHeader title="Certificações" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                    {data.certifications.map(cert => (
                                        <ListItem key={cert.id} title={cert.name} subtitle={cert.issuer} date={cert.year} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.courses.length > 0 && (
                            <section>
                                <SectionHeader title="Cursos" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                    {data.courses.map(course => (
                                        <ListItem key={course.id} title={course.title} subtitle={course.institution} date={course.year} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.skills.length > 0 && (
                            <section>
                                <SectionHeader title="Tecnologias" />
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-std font-medium border border-gray-100 dark:border-gray-700">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                     </div>
                </div>
            );

        case 'projects':
            return (
                <div className="animate-in fade-in duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <Briefcase className="text-primary dark:text-primary-dark" />
                            Projetos
                        </h2>
                    </div>

                    {allTechnologies.length > 1 && (
                        <div className="mb-8 overflow-x-auto pb-2 no-scrollbar">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 mr-2"><Filter size={18} /></span>
                                {allTechnologies.map(tech => (
                                    <button key={tech} onClick={() => setActiveTechFilter(tech)} className={`whitespace-nowrap px-4 py-2 rounded-std text-sm font-medium transition-all duration-200 ${activeTechFilter === tech ? 'bg-primary dark:bg-primary-dark text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'}`}>
                                        {tech}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map(p => <ProjectCard key={p.id} project={p} onClick={setSelectedProject} />)
                        ) : (
                            <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
                                Nenhum projeto encontrado.
                            </div>
                        )}
                    </div>
                </div>
            );

        case 'contact':
            return (
                <div className="max-w-xl animate-in fade-in duration-500">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        <Mail className="text-primary dark:text-primary-dark" />
                        Contato
                    </h2>
                    
                    <div className="space-y-4">
                        {data.profile.social.email && (
                            <a href={`mailto:${data.profile.social.email}`} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-std shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 group">
                                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full text-primary dark:text-primary-dark mr-4 group-hover:scale-110 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <span className="text-lg font-medium text-gray-800 dark:text-gray-200">Email</span>
                            </a>
                        )}

                        {data.profile.social.linkedin && (
                            <a href={data.profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-std shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 group">
                                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full text-primary dark:text-primary-dark mr-4 group-hover:scale-110 transition-transform">
                                    <Briefcase size={24} />
                                </div>
                                <span className="text-lg font-medium text-gray-800 dark:text-gray-200">LinkedIn</span>
                            </a>
                        )}

                        {data.profile.social.github && (
                             <a href={data.profile.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-std shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 group">
                                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full text-primary dark:text-primary-dark mr-4 group-hover:scale-110 transition-transform">
                                    <Code size={24} />
                                </div>
                                <span className="text-lg font-medium text-gray-800 dark:text-gray-200">GitHub</span>
                            </a>
                        )}
                    </div>
                </div>
            );
            
        default:
            return null;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={handleNavigate} theme={theme} toggleTheme={toggleTheme} profile={data.profile}>
      {renderContent()}
    </Layout>
  );
};

export default App;
