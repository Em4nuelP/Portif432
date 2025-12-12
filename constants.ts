import { ProfileData, Project, Experience, Education, Certification, Course } from './types';

export const PROFILE_DATA: ProfileData = {
  name: "EMANUEL PEDROSA",
  role: "Analista de B.I.",
  bio: "Traduzo dados complexos em insights acionáveis por meio de análises estruturadas e visualizações focadas na experiência do usuário, garantindo que cada dashboard conte uma história clara e útil para a tomada de decisão.",
  // Link otimizado para CDN do Google (lh3)
  avatar: "https://lh3.googleusercontent.com/d/1kRtL4O8chfp8QFHE_LFFSWyIfZ5weo4P",
  // Link otimizado para CDN do Google (lh3)
  banner: "https://lh3.googleusercontent.com/d/1qcDlCJC0SCChNCttDRktlwVazsqltwm0",
  social: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "contato@emanuelpedrosa.dev"
  }
};

export const SKILLS: string[] = [
  "Power BI", "SQL Server", "Python (Pandas, NumPy)", "ETL / ELT", 
  "Data Warehousing", "DAX", "Google Analytics", "Azure Data Factory", 
  "Tableau", "Git", "Excel Avançado / VBA"
];

export const EDUCATION: Education[] = [
  {
    id: "e1",
    degree: "Pós-graduação em Data Science",
    institution: "Universidade Tecnológica",
    period: "2020 - 2021"
  },
  {
    id: "e2",
    degree: "Bacharelado em Sistemas de Informação",
    institution: "Faculdade Estadual",
    period: "2015 - 2019"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "c1",
    name: "Microsoft Certified: Power BI Data Analyst Associate",
    issuer: "Microsoft",
    year: "2022"
  },
  {
    id: "c2",
    name: "Google Data Analytics Professional Certificate",
    issuer: "Coursera / Google",
    year: "2021"
  },
  {
    id: "c3",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2020"
  }
];

export const COURSES: Course[] = [
  {
    id: "cr1",
    title: "SQL for Data Science",
    institution: "Coursera",
    year: "2021"
  },
  {
    id: "cr2",
    title: "Machine Learning A-Z",
    institution: "Udemy",
    year: "2022"
  },
  {
    id: "cr3",
    title: "Advanced DAX for Power BI",
    institution: "SQLBI",
    year: "2021"
  },
  {
    id: "cr4",
    title: "Python for Data Analysis",
    institution: "DataCamp",
    year: "2020"
  }
];

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