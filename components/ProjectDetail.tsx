
import React, { useState } from 'react';
import { Project } from '../types';
import { ArrowLeft, ExternalLink, ZoomIn, X } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  // Inicializa com a thumbnail do projeto
  const [currentImage, setCurrentImage] = useState<string>(project.thumbnail);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="animate-in fade-in duration-300">
      
      {/* Modal de Zoom (Apenas Desktop se ativado) */}
      {isModalOpen && (
        <div 
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out animate-in fade-in duration-200"
            onClick={() => setIsModalOpen(false)}
        >
            <button 
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                onClick={() => setIsModalOpen(false)}
            >
                <X size={32} />
            </button>
            <img 
                src={currentImage} 
                alt="Full View" 
                className="max-w-full max-h-full object-contain rounded-std shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Evita fechar se clicar na imagem
            />
        </div>
      )}

      {/* Botão Voltar (Topo) */}
      <div className="mb-6">
        <button 
            onClick={onBack}
            className="inline-flex items-center text-gray-500 hover:text-primary dark:hover:text-primary-dark transition-colors font-medium"
        >
            <ArrowLeft size={20} className="mr-2" />
            Voltar para Projetos
        </button>
      </div>

      {/* Seção Hero e Detalhes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Imagem Principal - Oculta no Mobile (md:block) */}
        {/* Ao clicar, abre o modal */}
        <div className="hidden md:block lg:col-span-2 group relative cursor-zoom-in" onClick={() => setIsModalOpen(true)}>
            <div className="aspect-video w-full rounded-std overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <img 
                    src={currentImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.01]" 
                />
                {/* Overlay Hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 translate-y-2 group-hover:translate-y-0 transform">
                        <ZoomIn size={16} /> Ampliar
                    </div>
                </div>
            </div>
        </div>
        
        {/* Informações do Projeto */}
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h1>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary dark:text-primary-dark rounded-full text-sm font-semibold">
                    {project.category}
                </span>
            </div>

            <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-3">Tecnologias</h3>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Botão Desktop (Visível apenas em md+) */}
            {project.link && (
                <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hidden md:flex items-center justify-center w-full py-3 px-4 bg-primary dark:bg-primary-dark text-white rounded-std font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
                >
                    Abrir Projeto <ExternalLink size={18} className="ml-2" />
                </a>
            )}
        </div>
      </div>

      {/* Galeria (Acima da descrição) */}
      {project.images.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Galeria</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 
                   Desktop: Funciona como seletor para a imagem principal.
                   Mobile: Apenas exibe as imagens (sem clique/ampliação).
                */}
                {project.images.map((img, idx) => (
                    <div 
                        key={idx} 
                        className={`aspect-video rounded-std overflow-hidden transition-all duration-200
                            pointer-events-none md:pointer-events-auto cursor-pointer
                            ${currentImage === img 
                                ? 'opacity-100 ring-0' 
                                : 'opacity-100 md:opacity-60 md:hover:opacity-100'
                            }
                        `}
                        onClick={() => setCurrentImage(img)}
                    >
                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
          </div>
      )}

      {/* Botão Mobile (Visível apenas em mobile, abaixo da galeria) */}
      {project.link && (
        <div className="md:hidden mb-10">
            <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 px-4 bg-primary dark:bg-primary-dark text-white rounded-std font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
                Abrir Projeto <ExternalLink size={18} className="ml-2" />
            </a>
        </div>
      )}

      {/* Descrição */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            Sobre o Projeto
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            {project.description}
        </p>
      </div>

      {/* Botão Voltar (Rodapé da página) */}
      <div className="pt-6 border-t border-gray-100 dark:border-gray-800 mb-8">
        <button 
            onClick={onBack}
            className="inline-flex items-center text-gray-500 hover:text-primary dark:hover:text-primary-dark transition-colors font-medium"
        >
            <ArrowLeft size={20} className="mr-2" />
            Voltar para Projetos
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;