export const getTagsAndCategoriesFromWorker = (workers) => {
  let categories = [];
  let tags = [];
  workers.forEach((worker) => {
    worker.tags.forEach((tag) => {
      if (tags.includes(tag)) return;
      tags.push(tag);
    });
    worker.categories.forEach((cat) => {
      if (categories.includes(cat)) return;
      categories.push(cat);
    });
  });

  return { categories, tags };
};
