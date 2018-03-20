import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import style from './assets/app.scss';

Vue.filter('filterValue', option => {
  //Used to split the filter tag and just get the avalue
  return option.split('_').pop();
});

Vue.filter('getProductImage', product => {
  return product.images[0].src;
});

Vue.filter('moneyFormat', product => {
  if(product.variants){
    return `$${product.variants[0].price}`
  }
});

var BuildABoxApp = new Vue({
  el: '#BuildABox',
  data:{
    currentPage:1
  },
  store,
  created(){
    this.$store.dispatch('getProducts');
  },
  render: h => h(App)
})
