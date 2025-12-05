import React, { useState } from 'react';
import { Project } from '../types';
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="animate-in fade-in duration-300">
      {/* Header / Back */}
      <div className="mb-6">
        <button 
            onClick={onBack}
            className="inline-flex items-center text-gray-500 hover:text-primary dark:hover:text-primary-dark transition-colors font-medium"
        >
            <ArrowLeft size={20} className="mr-2" />
            Voltar para Projetos
        </button>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
            <div 
                className="aspect-video w-full rounded-std overflow-hidden shadow-sm cursor-pointer"
                onClick={() => setSelectedImage(project.thumbnail)}
            >
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
            </div>
        </div>
        
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

            {project.link && (
                <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-3 px-4 bg-primary dark:bg-primary-dark text-white rounded-std font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
                >
                    Abrir Projeto <ExternalLink size={18} className="ml-2" />
                </a>
            )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            Sobre o Projeto
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            {project.description}
        </p>
      </div>

      {/* Gallery */}
      {project.images.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Galeria</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.images.map((img, idx) => (
                    <div 
                        key={idx} 
                        className="aspect-video rounded-std overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border border-gray-100 dark:border-gray-800"
                        onClick={() => setSelectedImage(img)}
                    >
                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
          </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
        >
            <div className="relative max-w-5xl w-full max-h-screen">
                <img 
                    src={selectedImage} 
                    alt="Full View" 
                    className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl" 
                />
                <button 
                    className="absolute top-4 right-4 text-white hover:text-gray-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <span className="sr-only">Fechar</span>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
