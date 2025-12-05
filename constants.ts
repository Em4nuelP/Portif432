import { ProfileData, Project, Experience } from './types';

export const PROFILE_DATA: ProfileData = {
  name: "ALEXANDRE SILVA",
  role: "Especialista em B.I. & Dados",
  bio: "Transformo dados complexos em insights acionáveis através de visualizações limpas e engenharia de dados robusta.",
  avatar: "https://picsum.photos/id/1005/400/400",
  banner: "https://picsum.photos/id/197/800/300",
  social: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "contato@alexandresilva.dev"
  }
};

export const EXPERIENCES: Experience[] = [
  {
    id: "1",
    role: "Senior Data Analyst",
    company: "Tech Solutions Inc.",
    period: "2021 - Presente",
    description: "Liderança na migração de dashboards para Power BI, otimizando a tomada de decisão em 40%."
  },
  {
    id: "2",
    role: "BI Analyst",
    company: "Retail Group",
    period: "2019 - 2021",
    description: "Desenvolvimento de pipelines ETL em Python e SQL para análise de vendas diárias."
  },
  {
    id: "3",
    role: "Junior Data Scientist",
    company: "StartUp Data",
    period: "2018 - 2019",
    description: "Análise preditiva de churn de clientes utilizando modelos de Machine Learning."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Dashboard de Vendas Corporativas",
    category: "Business Intelligence",
    thumbnail: "https://picsum.photos/id/48/800/450",
    images: [
      "https://picsum.photos/id/48/800/600",
      "https://picsum.photos/id/20/800/600",
      "https://picsum.photos/id/3/800/600"
    ],
    description: "Um dashboard interativo completo desenvolvido no Power BI para monitorar KPIs de vendas em tempo real. Inclui análise de coorte e projeção de faturamento.",
    technologies: ["Power BI", "SQL", "DAX"],
    link: "https://google.com"
  },
  {
    id: "p2",
    title: "Pipeline de ETL Automatizado",
    category: "Engenharia de Dados",
    thumbnail: "https://picsum.photos/id/60/800/450",
    images: [
      "https://picsum.photos/id/60/800/600",
      "https://picsum.photos/id/180/800/600",
      "https://picsum.photos/id/96/800/600"
    ],
    description: "Automação de processamento de dados utilizando Python e Airflow, reduzindo o tempo de carga de dados em 70%.",
    technologies: ["Python", "Airflow", "AWS"],
    link: "https://github.com"
  },
  {
    id: "p3",
    title: "Análise de Sentimento de Mercado",
    category: "Data Science",
    thumbnail: "https://picsum.photos/id/119/800/450",
    images: [
      "https://picsum.photos/id/119/800/600",
      "https://picsum.photos/id/201/800/600",
      "https://picsum.photos/id/4/800/600"
    ],
    description: "Modelo de NLP para analisar sentimentos em redes sociais sobre lançamentos de produtos tecnológicos.",
    technologies: ["Python", "Pandas", "Scikit-Learn"],
    link: "https://github.com"
  },
  {
    id: "p4",
    title: "Relatório Financeiro Q3",
    category: "Reporting",
    thumbnail: "https://picsum.photos/id/20/800/450",
    images: [
      "https://picsum.photos/id/20/800/600",
      "https://picsum.photos/id/1/800/600",
      "https://picsum.photos/id/160/800/600"
    ],
    description: "Relatório executivo automatizado gerado via scripts R Markdown para diretoria financeira.",
    technologies: ["R", "Excel", "VBA"],
    link: "#"
  }
];
