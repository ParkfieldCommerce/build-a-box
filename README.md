# buildabox

> Shopify Build A Box Application Template

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Configuration
### Shopify Setup

 1. Create a collection the handle 'all' (This is where we are pulling the products from)
 2. Give a unique product type to the main product, the addon products that are bundled with the main product, as well as the card product

### Project Setup
In /store/actions.js configure these variables
```
//Your Shopify Store URL
const STORE_URL = 'https://happy-box-product-builder-app-test.myshopify.com';

//Shopify Product Type of the Featured Product
const MAIN_PRODUCT_TYPE = 'Box';

//Shopify Product Type of the Addon Products that are bundled with the Featured Product
const ADDON_PRODUCT_TYPE = 'Gift'; 

//Shopify Product Type of the Customizable Card Product
const CARD_PRODUCT_TYPE = 'Card';
```
