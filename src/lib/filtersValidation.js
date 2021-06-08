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

export const getFilteredProjects = (
  projects,
  search,
  filterCategories,
  onlyOffers,
) => {
  const filteredProjects = projects.filter((project) => {
    const totalFilters = filterCategories.length;
    const { name, location } = project.projectData;
    const { projectOffers } = project;

    if (onlyOffers && totalFilters !== 0) {
      return (
        name === null &&
        filterCategories.every((cat) =>
          projectOffers.some(({ offerData }) =>
            offerData.category.includes(cat),
          ),
        ) &&
        (location.address.toLowerCase().includes(search.toLowerCase()) ||
          projectOffers.some(({ offerData }) =>
            offerData.name.toLowerCase().includes(search.toLowerCase()),
          ))
      );
    }

    if (!onlyOffers && totalFilters !== 0) {
      return name
        ? filterCategories.every((cat) =>
            projectOffers.some(({ offerData }) =>
              offerData.category.includes(cat),
            ),
          ) &&
            (name.toLowerCase().includes(search.toLowerCase()) ||
              location.address.toLowerCase().includes(search.toLowerCase()) ||
              projectOffers.some(({ offerData }) =>
                offerData.name.toLowerCase().includes(search.toLowerCase()),
              ))
        : filterCategories.every((cat) =>
            projectOffers.some(({ offerData }) =>
              offerData.category.includes(cat),
            ),
          ) &&
            (location.address.toLowerCase().includes(search.toLowerCase()) ||
              projectOffers.some(({ offerData }) =>
                offerData.name.toLowerCase().includes(search.toLowerCase()),
              ));
    }

    if (onlyOffers && totalFilters === 0) {
      return (
        name === null &&
        (location.address.toLowerCase().includes(search.toLowerCase()) ||
          projectOffers.some(({ offerData }) =>
            offerData.name.toLowerCase().includes(search.toLowerCase()),
          ))
      );
    }

    return name
      ? name.toLowerCase().includes(search.toLowerCase()) ||
          location.address.toLowerCase().includes(search.toLowerCase()) ||
          projectOffers.some(({ offerData }) =>
            offerData.name.toLowerCase().includes(search.toLowerCase()),
          )
      : location.address.toLowerCase().includes(search.toLowerCase()) ||
          projectOffers.some(({ offerData }) =>
            offerData.name.toLowerCase().includes(search.toLowerCase()),
          );
  });

  return filteredProjects;
};
