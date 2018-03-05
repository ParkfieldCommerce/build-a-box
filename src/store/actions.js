import axios from 'axios' 

const STORE_URL = 'https://happy-box-product-builder-app-test.myshopify.com';
const MAIN_PRODUCT_TYPE = 'Box';
const ADDON_PRODUCT_TYPE = 'Gift';
const CARD_PRODUCT_TYPE = 'Card';


let actions = {
  getProducts(context){
    axios.get(`${STORE_URL}/collections/all.json`)
    .then( response => {
      return response.data;
    })
    .then( data => {
      //Figure out how many pages of data we have to pull
      let numOfPages = Math.ceil(data.collection.products_count/250);
      fetchProducts(numOfPages,[]);
    })
    .catch( err =>{
      console.log('***Error Fetching NumOfProducts***');
    });

    function fetchProducts(pageNum, productList){
      //Recursive function that gets the full list of products
      if(pageNum != 0){
        axios.get(`${STORE_URL}/products.json?limit=250&page=${pageNum}`)
        .then( response => {
          return response.data;
        })
        .then( data => {
          let updatedProductList = [...productList, ...data.products];
          fetchProducts(pageNum - 1, updatedProductList);
        })
        .catch( err =>{
          console.log('***Error Fetching Products***');
        });
      }else{
        sortFetchedProducts(productList)
      }
    }

    function sortFetchedProducts(totalProductList){
      let mainProductList = totalProductList.filter(product =>{
        return product.product_type == MAIN_PRODUCT_TYPE;
      });

      let addonProductList = totalProductList.filter(product =>{
        return product.product_type == ADDON_PRODUCT_TYPE;
      });

      let cardProductList = totalProductList.filter(product =>{
        return product.product_type == CARD_PRODUCT_TYPE;
      });

      context.commit('setMainProducts', mainProductList);
      context.commit('setAddonProducts', addonProductList);
      context.commit('setCardProducts', cardProductList);
    }
  }
};

export default actions;