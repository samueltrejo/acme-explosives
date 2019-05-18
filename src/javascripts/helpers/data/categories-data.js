import axios from 'axios';

const loadCategories = () => axios.get('../db/categories.json');

export default { loadCategories };
