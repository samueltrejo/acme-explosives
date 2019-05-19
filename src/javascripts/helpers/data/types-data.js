import axios from 'axios';

const loadCategoryTypes = (categoryId, cateogryName) => new Promise((resolve, reject) => {
  axios.get('../db/types.json')
    .then((response) => {
      const allTypes = response.data.types;
      const matchingTypes = allTypes.filter(type => type.category === categoryId);
      const newMatchingTypes = matchingTypes.map((matchingType) => {
        const newMatchingType = matchingType;
        newMatchingType.categoryName = cateogryName;
        return newMatchingType;
      });
      resolve(newMatchingTypes);
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
        const newMatchingTypes = matchingTypes.map((matchingType) => {
          const newMatchingType = matchingType;
          newMatchingType.categoryName = category.name;
          return newMatchingType;
        });
        newCategory.types = newMatchingTypes;
        return newCategory;
      });
      resolve(categoriesWithTypes);
    })
    .catch(error => reject(error));
});

export default { loadCategoriesWithTypes, loadCategoryTypes };
