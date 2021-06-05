export const getTagsAndCategoriesFromWorker = (workers) => {
  let currentCategories = [];
  let currentTags = [];
  workers.forEach((worker) => {
    worker.tags.forEach((tag) => {
      if (currentTags.includes(tag)) return;
      currentTags.push(tag);
    });
    worker.categories.forEach((cat) => {
      if (currentCategories.includes(cat)) return;
      currentCategories.push(cat);
    });
  });

  return { currentCategories, currentTags };
};
