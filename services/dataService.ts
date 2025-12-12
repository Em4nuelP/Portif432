import { PROFILE_DATA, PROJECTS, EXPERIENCES, SKILLS, EDUCATION, CERTIFICATIONS, COURSES } from '../constants';
import { Education, Certification, Course, Project } from '../types';

// 1. URL Tecnologias (GID=0)
const TECHS_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2u7fnxCwSYJ8olyFdS_qkBV6BRO2jdbYdCUtx5I7VYKluol3de2-4m_XWQ-MH9Xiaz-eJ9U0rmbjt/pub?gid=0&single=true&output=csv";

// 2. URL Perfil / Home (GID=1712267852)
const PROFILE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2u7fnxCwSYJ8olyFdS_qkBV6BRO2jdbYdCUtx5I7VYKluol3de2-4m_XWQ-MH9Xiaz-eJ9U0rmbjt/pub?gid=1712267852&single=true&output=csv";

// 3. URL Sobre Mim (GID=1886962865)
const ABOUT_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2u7fnxCwSYJ8olyFdS_qkBV6BRO2jdbYdCUtx5I7VYKluol3de2-4m_XWQ-MH9Xiaz-eJ9U0rmbjt/pub?gid=1886962865&single=true&output=csv";

// 4. URL Contato (GID=1275760528)
const CONTACT_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2u7fnxCwSYJ8olyFdS_qkBV6BRO2jdbYdCUtx5I7VYKluol3de2-4m_XWQ-MH9Xiaz-eJ9U0rmbjt/pub?gid=1275760528&single=true&output=csv";

// 5. URL Projetos (GID=1758572421)
const PROJECTS_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2u7fnxCwSYJ8olyFdS_qkBV6BRO2jdbYdCUtx5I7VYKluol3de2-4m_XWQ-MH9Xiaz-eJ9U0rmbjt/pub?gid=1758572421&single=true&output=csv";

// Função utilitária para limpar e ajustar links
const normalizeUrl = (rawUrl: string | undefined): string => {
    if (!rawUrl) return "";
    let url = rawUrl.replace(/["']/g, '').trim();

    if (url.includes('drive.google.com')) {
        let idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (!idMatch) idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (idMatch && idMatch[1]) return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    }

    if (url.includes('onedrive.live.com')) {
        if (url.includes('view.aspx')) return url.replace('view.aspx', 'download');
        if (url.includes('embed')) return url;
        return url.replace('redir=0', 'redir=1'); 
    }
    return url;
};

// Função auxiliar para processar CSV respeitando aspas
const splitCSVLine = (line: string) => {
    const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    return parts.map(p => p.replace(/^"|"$/g, '').trim());
};

export const fetchPortfolioData = async () => {
  let profile = { ...PROFILE_DATA };
  let newEducation: Education[] = [];
  let newCertifications: Certification[] = [];
  let newCourses: Course[] = [];
  let newSkills: string[] = [];
  let newProjects: Project[] = [];

  // Chaves reservadas para ignorar na lista de skills (caso tenham sobrado na aba antiga)
  const ignoredSkillKeys = ['avatar', 'banner', 'bio', 'name', 'role', 'linkedin', 'github', 'email', 'social', 'technologies', 'tecnologias', 'key', 'value'];

  // 1. BUSCAR PERFIL (NOVO GID)
  try {
      const response = await fetch(PROFILE_SHEET_URL);
      if (response.ok) {
          const text = await response.text();
          const lines = text.split('\n');
          
          lines.forEach(line => {
              if (!line) return;
              const parts = splitCSVLine(line);
              if (parts.length < 2) return; // Precisa de chave e valor

              const keyLower = parts[0].toLowerCase().replace(/:/g, '').trim();
              const value = parts[1];

              if (!value) return;

              if (keyLower === 'avatar') {
                  const url = normalizeUrl(value);
                  if (url.startsWith('http')) profile.avatar = url;
              }
              else if (keyLower === 'banner') {
                  const url = normalizeUrl(value);
                  if (url.startsWith('http')) profile.banner = url;
              }
              else if (keyLower === 'bio') profile.bio = value;
              else if (keyLower === 'name') profile.name = value;
              else if (keyLower === 'role') profile.role = value;
              // Os contatos serão carregados prioritariamente da aba 4, mas mantemos aqui como fallback
              else if (keyLower === 'linkedin') profile.social.linkedin = value;
              else if (keyLower === 'github') profile.social.github = value;
              else if (keyLower === 'email') profile.social.email = value;
          });
      }
  } catch (error) {
      console.warn("Erro ao carregar Perfil:", error);
  }

  // 2. BUSCAR TECNOLOGIAS (GID 0)
  try {
      const response = await fetch(TECHS_SHEET_URL);
      if (response.ok) {
          const text = await response.text();
          const lines = text.split('\n');
          
          lines.forEach(line => {
              if (!line) return;
              const parts = splitCSVLine(line);
              if (parts.length < 1) return;

              const possibleSkill = parts[0].trim();
              const possibleKeyCheck = possibleSkill.toLowerCase();

              // Se não for vazio e não for uma chave de configuração antiga
              if (possibleSkill && !ignoredSkillKeys.includes(possibleKeyCheck)) {
                  newSkills.push(possibleSkill);
              }
          });
      }
  } catch (error) {
      console.warn("Erro ao carregar Tecnologias:", error);
  }

  // 3. BUSCAR DADOS SOBRE MIM (GID 188...)
  try {
      const response = await fetch(ABOUT_SHEET_URL);
      if (response.ok) {
          const text = await response.text();
          const lines = text.split('\n');
          
          lines.forEach((line, index) => {
              if (!line) return;
              const parts = splitCSVLine(line);
              
              if (parts.length < 2) return;

              const type = parts[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
              const colB = parts[1] || "";
              const colC = parts[2] || "";
              const colD = parts[3] || "";

              if (type === 'formacao') {
                  newEducation.push({
                      id: `edu-sheet-${index}`,
                      degree: colB,
                      institution: colC,
                      period: colD
                  });
              }
              else if (type === 'certificacao') {
                  newCertifications.push({
                      id: `cert-sheet-${index}`,
                      name: colB,
                      issuer: colC,
                      year: colD
                  });
              }
              else if (type === 'curso') {
                  newCourses.push({
                      id: `course-sheet-${index}`,
                      title: colB,
                      institution: colC,
                      year: colD
                  });
              }
          });
      }
  } catch (error) {
      console.warn("Erro ao carregar 'Sobre Mim':", error);
  }

  // 4. BUSCAR CONTATO (GID 127...)
  try {
      const response = await fetch(CONTACT_SHEET_URL);
      if (response.ok) {
          const text = await response.text();
          const lines = text.split('\n');
          
          lines.forEach(line => {
              if (!line) return;
              const parts = splitCSVLine(line);
              if (parts.length < 2) return; // Type, Contact

              const type = parts[0].toLowerCase().trim();
              const value = parts[1].trim();

              if (!value) return;

              if (type.includes('linkedin')) profile.social.linkedin = value;
              else if (type.includes('github')) profile.social.github = value;
              else if (type.includes('email')) profile.social.email = value;
          });
      }
  } catch (error) {
      console.warn("Erro ao carregar Contato:", error);
  }

  // 5. BUSCAR PROJETOS (GID 175...)
  try {
      const response = await fetch(PROJECTS_SHEET_URL);
      if (response.ok) {
          const text = await response.text();
          const lines = text.split('\n');
          
          lines.forEach((line, index) => {
              if (!line) return;
              const parts = splitCSVLine(line);
              
              // Verifica se tem título (Col A)
              const title = parts[0]?.trim();
              
              // Pula se título vazio ou for o cabeçalho
              // Normalizamos removendo ':' para garantir que 'title:' ou 'title' sejam pegos
              if (!title || title.toLowerCase().replace(':', '').trim() === 'title') return;

              const category = parts[1]?.trim() || "Geral";
              // Tecnologias (Col C) - separadas por vírgula
              const technologies = parts[2] ? parts[2].split(',').map(t => t.trim()).filter(Boolean) : [];
              const description = parts[3]?.trim() || "";
              const link = parts[4]?.trim();

              // Imagens (Col F, G, H)
              const img1 = normalizeUrl(parts[5]);
              const img2 = normalizeUrl(parts[6]);
              const img3 = normalizeUrl(parts[7]);

              const images = [img1, img2, img3].filter(Boolean);
              
              // Thumbnail: usa image1, ou um placeholder se não existir
              const thumbnail = img1 || "https://placehold.co/600x400?text=No+Image";

              newProjects.push({
                  id: `proj-sheet-${index}`,
                  title,
                  category,
                  technologies,
                  description,
                  link: link || undefined,
                  thumbnail,
                  images: images.length > 0 ? images : [thumbnail]
              });
          });
      }
  } catch (error) {
      console.warn("Erro ao carregar Projetos:", error);
  }

  const uniqueSkills = Array.from(new Set(newSkills));

  return {
      profile: profile,
      projects: newProjects.length > 0 ? newProjects : PROJECTS,
      experiences: EXPERIENCES,
      skills: uniqueSkills.length > 0 ? uniqueSkills : SKILLS,
      education: newEducation.length > 0 ? newEducation : EDUCATION,
      certifications: newCertifications.length > 0 ? newCertifications : CERTIFICATIONS,
      courses: newCourses.length > 0 ? newCourses : COURSES
  };
};