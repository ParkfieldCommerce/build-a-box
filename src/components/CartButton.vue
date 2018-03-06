<template>
  <button @click="addToCart">
    Build my Bundle
  </button>
</template>

<script>
import axios from 'axios';

export default {
  methods:{
    addToCart(){
      let mainProduct = this.$store.state.selectedMainProduct;
      let addonProducts = this.$store.state.selectedAddonProducts;
      let cardProduct = this.$store.state.selectedCardProduct;
      let cartQueue = [];
      if(mainProduct.variants){
        cartQueue.push(mainProduct);
      }
      if(addonProducts.length > 0){
        addonProducts.forEach( addon => {
          cartQueue.push(addon);
        });
      }
      if(cardProduct.variants){
        cartQueue.push(cardProduct);
      }
      console.log(cartQueue);
  /*    addToCart(){
        axios.get('/cart/add.js').
          .then((response)=>{
          console.log(response);
        })
      }*/
    }
  }
};
</script>