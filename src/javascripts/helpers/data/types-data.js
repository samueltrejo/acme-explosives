import axios from 'axios';

const loadCategoryTypes = categoryId => new Promise((resolve, reject) => {
  axios.get('../db/types.json')
    .then((response) => {
      const allTypes = response.data.types;
      const matchingTypes = allTypes.filter(type => type.category === categoryId);
      resolve(matchingTypes);
    })
    .catch(error => reject(error));
});

const loadCategoriesWithTypes = categories => new Promise((resolve, reject) => {
  axios.get('../db/types.json')
    .then((response) => {
      const { types } = response.data;
      const categoriesWithTypes = categories.map((category) => {
        const newCategory = category;
        const matchingTypes = types.filter(type => type.category === category.id);
        newCategory.types = matchingTypes;
        return newCategory;
      });
      resolve(categoriesWithTypes);
    })
    .catch(error => reject(error));
});

export default { loadCategoriesWithTypes, loadCategoryTypes };
