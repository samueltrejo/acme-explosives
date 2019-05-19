import $ from 'jquery';
import types from '../helpers/data/types-data';
import print from '../helpers/util';
import products from '../helpers/data/products-data';
import initProducts from './products';

const toCategories = () => {
  $('#category-page').removeClass('d-none');
  $('#type-page').addClass('d-none');
};

const seeProducts = (event) => {
  const typeId = event.target.closest('.card').id;
  const category = event.target.previousElementSibling.previousElementSibling.textContent;
  initProducts.initProducts(typeId, category);
  $('#type-page').addClass('d-none');
  $('#product-page').removeClass('d-none');
};

const domStringBuilder = (array) => {
  let domString = '';
  array.forEach((item) => {
    domString += '<div class="col-3 p-3">';
    domString += `  <div id=${item.id} class="card">`;
    domString += '    <div class="card-body">';
    domString += `      <h5 class="card-title">${item.name}</h5>`;
    domString += `      <h6 class="category card-subtitle mb-2 text-muted">Category: ${item.categoryName}</h6>`;
    domString += `      <p class="card-text">${item.description}</p>`;
    domString += `      <a href="#" class="card-link see-products">${item.products.length} Products</a>`;
    domString += '    </div>';
    domString += '  </div>';
    domString += '</div>';
  });
  print.printToDom('types', domString);
  $('.see-products').click(seeProducts);
};

const initTypes = (categoryId) => {
  $('#to-categories').click(toCategories);
  types.loadCategoryTypes(categoryId)
    .then(categoryTypes => products.loadTypesWithProducts(categoryTypes))
    .then((matchingTypesWithProducts) => {
      domStringBuilder(matchingTypesWithProducts);
    })
    .catch(error => console.error(error));
};

const initAllTypes = (categories, andProducts) => {
  $('#to-categories').click(toCategories);
  let allTypes = [];
  categories.forEach((category) => {
    types.loadCategoryTypes(category.id, category.name)
      .then(categoryTypes => products.loadTypesWithProducts(categoryTypes))
      .then((matchingTypesWithProducts) => {
        allTypes = allTypes.concat(matchingTypesWithProducts);
        if (!andProducts) {
          domStringBuilder(allTypes);
        } else {
          initProducts.initAllProducts(allTypes);
          $('#type-page').addClass('d-none');
          $('#product-page').removeClass('d-none');
        }
      })
      .catch(error => console.error(error));
  });
};

export default { initTypes, initAllTypes };
