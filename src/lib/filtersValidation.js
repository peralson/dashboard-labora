export const hasIndividualOffers = (projects) => {
  return projects.some((project) => project.projectData.name === null);
};

export const getCategoriesFromProjects = (projects) => {
  let categories = [];
  projects.forEach((project) => {
    project.projectOffers.forEach((offer) => {
      if (!categories.includes(offer.offerData.category)) {
        categories.push(offer.offerData.category);
      }
    });
  });
  return categories;
};
