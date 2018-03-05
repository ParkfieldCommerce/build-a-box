import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import {polyfill} from 'es6-promise';
polyfill();

Vue.filter('getProductImage', product => {
  return product.images[0].src;
});

Vue.filter('getPrice', product => {
  if(product.variants){
    return `$${product.variants[0].price}`
  }
});

new Vue({
  el: '#BuildABox',
  data:{
    currentPage:2
  },
  store,
  created(){
    this.$store.dispatch('getProducts');
  },
  render: h => h(App)
})
