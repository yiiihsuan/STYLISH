const host = process.env.REACT_APP_HOST
//const port = process.env.REACT_APP_PORT
//const BASE_URL = `https://${host}/api/1.0`;
//const BASE_URL = `https://${host}:${port}/api/1.0`;
const BASE_URL = `http://127.0.0.1:3000/api/1.0`; //for local

export const fetchProducts = async (category) => {
  const response = await fetch(`${BASE_URL}/products/${category}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};


export const fetchkeywordProducts = async (keyword) => {
  const response = await fetch(`${BASE_URL}/products/search?keyword=${keyword}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};


export const fetchProductDetails = async (productId) => {
  const response = await fetch(`${BASE_URL}/products/details?id=${productId}`);
  if (!response.ok) {
    throw new Error(`Error fetching product details: ${response.statusText}`);
  }
  return response.json();
};


