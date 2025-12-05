import React from 'react';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
        className="group relative bg-white dark:bg-gray-800 rounded-std overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
        onClick={() => onClick(project)}
    >
      {/* Image Container */}
      <div className="aspect-video w-full overflow-hidden relative">
        <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-primary/90 dark:bg-primary-dark/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-medium flex items-center gap-2 px-4 py-2 border border-white/30 rounded-full">
                Ver Detalhes <ArrowRight size={16} />
            </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
            {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mt-3">
            {project.technologies.slice(0, 3).map((tech, idx) => (
                <span 
                    key={idx} 
                    className="text-xs font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
                >
                    {tech}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
