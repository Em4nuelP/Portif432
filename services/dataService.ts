import { PROFILE_DATA, PROJECTS, EXPERIENCES, SKILLS, EDUCATION, CERTIFICATIONS } from '../constants';

export const fetchPortfolioData = async () => {
  // Currently returning local data directly.
  return {
      profile: PROFILE_DATA,
      projects: PROJECTS,
      experiences: EXPERIENCES,
      skills: SKILLS,
      education: EDUCATION,
      certifications: CERTIFICATIONS
  };
};