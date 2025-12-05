import { PROFILE_DATA, PROJECTS, EXPERIENCES } from '../constants';

export const fetchPortfolioData = async () => {
  // Currently returning local data directly.
  // This structure allows for easy re-integration of an API or Google Sheets later.
  return {
      profile: PROFILE_DATA,
      projects: PROJECTS,
      experiences: EXPERIENCES
  };
};