import axios from 'axios' 

const STORE_URL = 'https://happy-box-store.myshopify.com';
const MAIN_PRODUCT_TYPE = 'Box';
const ADDON_PRODUCT_TYPE = 'Gift';
const CARD_PRODUCT_TYPE = 'Card';
const COLLECTION_HANDLE = 'build-a-happy-box';

let actions = {
  getProducts(context){
    axios.get(`${STORE_URL}/collections/${COLLECTION_HANDLE}.json`)
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
        if(product.product_type == MAIN_PRODUCT_TYPE && product.variants[0].available){
          product.maxCapacity = parseInt(product.variants[0].option1);
          return product;
        }
      });

      let addonProductList = totalProductList.filter(product =>{
        if(product.product_type == ADDON_PRODUCT_TYPE && product.variants[0].available){
          let capacityTag = product.tags.find( tag => {
            return tag.indexOf('Capacity_') > -1;
          });
          if(capacityTag != undefined){
            let capacity = parseFloat(capacityTag.split('_')[1]);
            product.capacity = capacity;
          }
          return product;
        }
      });

      let cardProductList = totalProductList.filter(product =>{
        return (product.product_type == CARD_PRODUCT_TYPE && product.variants[0].available);
      });

      context.commit('setMainProducts', mainProductList);
      context.commit('setAddonProducts', addonProductList);
      context.commit('setCardProducts', cardProductList);
    }
  }
};

export default actions;