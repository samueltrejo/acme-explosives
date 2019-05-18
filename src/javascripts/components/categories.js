import $ from 'jquery';
import categories from '../helpers/data/categories-data';
import types from '../helpers/data/types-data';
import util from '../helpers/util';
import initTypes from './types';

const seeTypes = (event) => {
  const categoryId = event.target.closest('.card').id;
  initTypes.initTypes(categoryId);
  $('#category-page').addClass('d-none');
  $('#type-page').removeClass('d-none');
};

const domStringBuilder = (array) => {
  let domString = '';
  array.forEach((item) => {
    domString += '<div class="col-3 p-3">';
    domString += `<div id=${item.id} class="card">`;
    domString += `<h3>${item.name}</h3>`;
    domString += `<button class="btn btn-dark col-3 m-auto see-types">${item.types.length} Types</button>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('categories', domString);
  $('.see-types').click(seeTypes);
};

const showAllTypes = (event) => {
  const buttonId = event.target.id;
  categories.loadCategories()
    .then((response) => {
      if (buttonId !== 'all-products') {
        initTypes.initAllTypes(response.data.categories);
      } else if (buttonId === 'all-products') {
        initTypes.initAllTypes(response.data.categories, true);
      }
    })
    .catch(error => console.error(error));
  $('#category-page').addClass('d-none');
  $('#type-page').removeClass('d-none');
};

const initCategories = () => {
  $('#all-types').click(showAllTypes);
  $('#all-products').click(showAllTypes);
  categories.loadCategories()
    .then(response => types.loadCategoriesWithTypes(response.data.categories))
    .then((categoriesWithTypes) => {
      domStringBuilder(categoriesWithTypes);
    })
    .catch(error => console.error(error));
};

export default { initCategories };
