import $ from 'jquery';
import print from '../helpers/util';
import products from '../helpers/data/products-data';

const toTypes = () => {
  $('#type-page').removeClass('d-none');
  $('#product-page').addClass('d-none');
};

const domStringBuilder = (array) => {
  let domString = '';
  array.forEach((item) => {
    domString += '<div class="col-3 p-3">';
    domString += `  <div id=${item.id} class="card">`;
    domString += '    <div class="card-body">';
    domString += `      <h5 class="card-title">${item.name}</h5>`;
    domString += `      <h6 class="card-subtitle mb-2 text-muted">Category: ${item.categoryName}</h6>`;
    domString += `      <h6 class="card-subtitle mb-2 text-muted">Type: ${item.typeName}</h6>`;
    domString += `      <p class="card-text">${item.description}</p>`;
    domString += '    </div>';
    domString += '  </div>';
    domString += '</div>';
  });
  print.printToDom('products', domString);
};

const initProducts = (typeId, typeName, categoryName) => {
  $('#to-types').click(toTypes);
  products.loadTypeProducts(typeId, typeName, categoryName)
    .then((typeProducts) => {
      console.error(typeProducts);
      domStringBuilder(typeProducts);
    })
    .catch(error => console.error(error));
};

const initAllProducts = (types) => {
  $('#to-types').click(toTypes);
  let allProducts = [];
  types.forEach((type) => {
    products.loadTypeProducts(type.id, type.name, type.categoryName)
      .then((typeProducts) => {
        allProducts = allProducts.concat(typeProducts);
        domStringBuilder(allProducts);
      })
      .catch(error => console.error(error));
  });
};

export default { initProducts, initAllProducts };
