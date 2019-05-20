import axios from 'axios';

const loadCategories = () => axios.get('../db/categories.json');

const loadSpecificCategory = categoryId => new Promise((resolve, reject) => {
  axios.get('../db/categories.json')
    .then((response) => {
      const { categories } = response.data;
      const matchingCategory = categories.filter(category => category.id === categoryId);
      resolve(matchingCategory);
    })
    .catch(error => reject(error));
});

export default { loadCategories, loadSpecificCategory };
