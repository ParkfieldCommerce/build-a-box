<template>
  <div class="Product Product--main" :class="isSelected ? 'Product--selected' : ''">
    <img class="Product__image" :src="product | getProductImage">
    <button class="Product__button" @click="selectProduct">{{buttonActionText}}</button>
  </div>
</template>

<script>
export default {
  props:{
    product:Object
  },
  computed:{
    isSelected(){
      return this.$store.getters.isSelectedMainProduct(this.product);
    },
    buttonActionText(){
      return this.$store.getters.isSelectedMainProduct(this.product) ? 'Selected' : 'Start Building';
    }
  },
  methods:{
    selectProduct(){
      if(this.$store.state.selectedMainProduct.id == this.product.id){
        this.$store.commit('updateSelectedMainProduct',{});
      }else{
        this.$store.commit('updateSelectedMainProduct',this.product);
        let capacity = parseInt(this.product.variants[0].option1);
        this.$store.commit('updateBoxCapacity', capacity);
      }
    }
  }
};
</script>