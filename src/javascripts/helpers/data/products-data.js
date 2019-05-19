import axios from 'axios';

const loadTypeProducts = (typeId, typeName, categoryName) => new Promise((resolve, reject) => {
  axios.get('../db/products.json')
    .then((response) => {
      const allProducts = Object.values(response.data.products[0]);
      const matchingProducts = allProducts.filter(product => product.type === typeId);
      const newMatchingProducts = matchingProducts.map((matchingProduct) => {
        const newMatchingProduct = matchingProduct;
        newMatchingProduct.typeName = typeName;
        newMatchingProduct.categoryName = categoryName;
        return newMatchingProduct;
      });
      resolve(newMatchingProducts);
    })
    .catch(error => reject(error));
});

const loadTypesWithProducts = types => new Promise((resolve, reject) => {
  axios.get('../db/products.json')
    .then((response) => {
      const products = Object.values(response.data.products[0]);
      const typesWithProducts = types.map((type) => {
        const newType = type;
        const matchingProducts = products.filter(product => product.type === type.id);
        newType.products = matchingProducts;
        return newType;
      });
      resolve(typesWithProducts);
    })
    .catch(error => reject(error));
});

export default { loadTypesWithProducts, loadTypeProducts };
