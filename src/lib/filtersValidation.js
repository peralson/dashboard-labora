export const hasIndividualOffers = (projects) => {
  return projects.some((project) => project.projectData.name === null);
};
