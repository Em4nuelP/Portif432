
import { Education, Certification, Course, Project, ProfileData } from '../types';

const CACHE_KEY = 'portfolio_data_v1';
const CACHE_EXPIRATION = 1000 * 60 * 1; // 1 minuto de cache

// URLs das Planilhas do Google Sheets
const TECHS_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2u7fnxCwSYJ8olyFdS_qkBV6BRO2jdbYdCUtx5I7VYKluol3de2-4m_XWQ-MH9Xiaz-eJ9U0rmbjt/pub?gid=0&single=true&output=csv";
const PROFILE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2u7fnxCwSYJ8olyFdS_qkBV6BRO2jdbYdCUtx5I7VYKluol3de2-4m_XWQ-MH9Xiaz-eJ9U0rmbjt/pub?gid=1712267852&single=true&output=csv";
const ABOUT_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2u7fnxCwSYJ8olyFdS_qkBV6BRO2jdbYdCUtx5I7VYKluol3de2-4m_XWQ-MH9Xiaz-eJ9U0rmbjt/pub?gid=1886962865&single=true&output=csv";
const CONTACT_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2u7fnxCwSYJ8olyFdS_qkBV6BRO2jdbYdCUtx5I7VYKluol3de2-4m_XWQ-MH9Xiaz-eJ9U0rmbjt/pub?gid=1275760528&single=true&output=csv";
const PROJECTS_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2u7fnxCwSYJ8olyFdS_qkBV6BRO2jdbYdCUtx5I7VYKluol3de2-4m_XWQ-MH9Xiaz-eJ9U0rmbjt/pub?gid=1758572421&single=true&output=csv";
const TEXTS_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2u7fnxCwSYJ8olyFdS_qkBV6BRO2jdbYdCUtx5I7VYKluol3de2-4m_XWQ-MH9Xiaz-eJ9U0rmbjt/pub?gid=554370619&single=true&output=csv";

const cleanString = (str: string): string => {
    if (!str) return "";
    return str
        .replace(/\uFEFF/g, "")
        .replace(/\uFFFD/g, "")
        .replace(/\r/g, "")
        .trim();
};

const normalizeUrl = (rawUrl: string | undefined): string => {
    if (!rawUrl) return "";
    let url = cleanString(rawUrl).replace(/["']/g, '');

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

const splitCSVLine = (line: string) => {
    const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    return parts.map(p => cleanString(p.replace(/^"|"$/g, '')));
};

const fetchSafe = async (url: string): Promise<string> => {
    try {
        const response = await fetch(url);
        if (!response.ok) return "";
        let text = await response.text();
        return cleanString(text);
    } catch (error) {
        console.warn(`Erro ao carregar dados da URL: ${url}`, error);
        return "";
    }
};

export const fetchPortfolioData = async (ignoreCache = false) => {
    if (!ignoreCache) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_EXPIRATION) {
                return data;
            }
        }
    }

    const [profileText, techsText, aboutText, contactText, projectsText, extraTexts] = await Promise.all([
        fetchSafe(PROFILE_SHEET_URL),
        fetchSafe(TECHS_SHEET_URL),
        fetchSafe(ABOUT_SHEET_URL),
        fetchSafe(CONTACT_SHEET_URL),
        fetchSafe(PROJECTS_SHEET_URL),
        fetchSafe(TEXTS_SHEET_URL)
    ]);

    let profile: ProfileData = { 
        name: "", 
        role: "", 
        bio: "", 
        aboutText: "",
        avatar: "", 
        banner: "", 
        social: { linkedin: "", github: "", email: "" } 
    };
    
    let newEducation: Education[] = [];
    let newCertifications: Certification[] = [];
    let newCourses: Course[] = [];
    let newSkills: string[] = [];
    let newProjects: Project[] = [];

    const ignoredSkillKeys = ['avatar', 'banner', 'bio', 'name', 'nome', 'role', 'cargo', 'linkedin', 'github', 'email', 'social', 'technologies', 'tecnologias', 'key', 'value', 'sobre'];

    // Processamento da aba de textos (Bio, Sobre, Nome, Cargo)
    if (extraTexts) {
        extraTexts.split('\n').forEach(line => {
            const trimmedLine = cleanString(line);
            if (!trimmedLine) return;
            const parts = splitCSVLine(trimmedLine);
            if (parts.length < 2) return;
            const keyLower = parts[0].toLowerCase().replace(/:/g, '').trim();
            const value = parts[1];
            if (!value) return;

            if (keyLower === 'bio') profile.bio = value;
            else if (keyLower === 'sobre') profile.aboutText = value;
            else if (keyLower === 'nome' || keyLower === 'name') profile.name = value;
            else if (keyLower === 'cargo' || keyLower === 'role') profile.role = value;
        });
    }

    // Processamento da aba de perfil (Avatar, Banner, Social, e Nome/Cargo se não preenchidos acima)
    if (profileText) {
        profileText.split('\n').forEach(line => {
            const trimmedLine = cleanString(line);
            if (!trimmedLine) return;
            const parts = splitCSVLine(trimmedLine);
            if (parts.length < 2) return;
            const keyLower = parts[0].toLowerCase().replace(/:/g, '').trim();
            const value = parts[1];
            if (!value) return;

            if (keyLower === 'avatar') profile.avatar = normalizeUrl(value);
            else if (keyLower === 'banner') profile.banner = normalizeUrl(value);
            else if ((keyLower === 'name' || keyLower === 'nome') && !profile.name) profile.name = value;
            else if ((keyLower === 'role' || keyLower === 'cargo') && !profile.role) profile.role = value;
            else if (keyLower === 'linkedin') profile.social.linkedin = value;
            else if (keyLower === 'github') profile.social.github = value;
            else if (keyLower === 'email') profile.social.email = value;
            else if (keyLower === 'bio' && !profile.bio) profile.bio = value;
        });
    }

    if (techsText) {
        techsText.split('\n').forEach(line => {
            const trimmedLine = cleanString(line);
            if (!trimmedLine) return;
            const parts = splitCSVLine(trimmedLine);
            if (parts.length < 1) return;
            const possibleSkill = parts[0];
            if (possibleSkill && !ignoredSkillKeys.includes(possibleSkill.toLowerCase())) {
                newSkills.push(possibleSkill);
            }
        });
    }

    if (aboutText) {
        aboutText.split('\n').forEach((line, index) => {
            const trimmedLine = cleanString(line);
            if (!trimmedLine) return;
            const parts = splitCSVLine(trimmedLine);
            if (parts.length < 2) return;
            const type = parts[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
            const colB = parts[1] || "";
            const colC = parts[2] || "";
            const colD = parts[3] || "";

            if (type === 'formacao') {
                newEducation.push({ id: `edu-sheet-${index}`, degree: colB, institution: colC, period: colD });
            } else if (type === 'certificacao') {
                newCertifications.push({ id: `cert-sheet-${index}`, name: colB, issuer: colC, year: colD });
            } else if (type === 'curso') {
                newCourses.push({ id: `course-sheet-${index}`, title: colB, institution: colC, year: colD });
            }
        });
    }

    if (contactText) {
        contactText.split('\n').forEach(line => {
            const trimmedLine = cleanString(line);
            if (!trimmedLine) return;
            const parts = splitCSVLine(trimmedLine);
            if (parts.length < 2) return;
            const type = parts[0].toLowerCase();
            const value = parts[1];
            if (!value) return;

            if (type.includes('linkedin')) profile.social.linkedin = value;
            else if (type.includes('github')) profile.social.github = value;
            else if (type.includes('email')) profile.social.email = value;
        });
    }

    if (projectsText) {
        projectsText.split('\n').forEach((line, index) => {
            const trimmedLine = cleanString(line);
            if (!trimmedLine) return;
            const parts = splitCSVLine(trimmedLine);
            const title = parts[0];
            if (!title || title.toLowerCase().replace(':', '').trim() === 'title') return;

            const category = parts[1] || "Geral";
            const technologies = parts[2] ? parts[2].split(',').map(t => cleanString(t)).filter(Boolean) : [];
            const description = parts[3] || "";
            const link = parts[4];
            const images = [normalizeUrl(parts[5]), normalizeUrl(parts[6]), normalizeUrl(parts[7])].filter(Boolean);
            const thumbnail = images[0] || "https://placehold.co/600x400?text=No+Image";

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

    const result = {
        profile,
        projects: newProjects,
        experiences: [],
        skills: Array.from(new Set(newSkills)),
        education: newEducation,
        certifications: newCertifications,
        courses: newCourses
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: result,
        timestamp: Date.now()
    }));

    return result;
};
