import $ from 'jquery';
import print from '../helpers/util';
import products from '../helpers/data/products-data';

const toTypes = () => {
  $('#type-page').removeClass('d-none');
  $('#product-page').addClass('d-none');
};

const domStringBuilder = (array, type, category) => {
  let domString = '';
  array.forEach((item) => {
    domString += '<div class="col-3 p-3">';
    domString += `  <div id=${item.id} class="card">`;
    domString += '    <div class="card-body">';
    domString += `      <h5 class="card-title">${item.name}</h5>`;
    domString += `      <h6 class="card-subtitle mb-2 text-muted">${category}</h6>`;
    domString += `      <h6 class="card-subtitle mb-2 text-muted">Type: ${type}</h6>`;
    domString += `      <p class="card-text">${item.description}</p>`;
    domString += '    </div>';
    domString += '  </div>';
    domString += '</div>';
  });
  print.printToDom('products', domString);
};

const initProducts = (typeId, categoryId) => {
  $('#to-types').click(toTypes);
  products.loadTypeProducts(typeId)
    .then((typeProducts) => {
      domStringBuilder(typeProducts, typeId, categoryId);
    })
    .catch(error => console.error(error));
};

const initAllProducts = (types) => {
  // let allProducts = [];
  types.forEach((type) => {
    products.loadTypeProducts(type.id)
      .then((typeProducts) => {
        console.error(typeProducts, type);
      })
      .catch(error => console.error(error));
  });
};

export default { initProducts, initAllProducts };
