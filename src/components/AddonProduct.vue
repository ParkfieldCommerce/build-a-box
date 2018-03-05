<template>
  <div class="Product Product--addon" :class="isSelected ? 'Product--selected' : ''">
    <img class="Product__image" :src="product | getProductImage">
    <p class="Product__title">{{product.title}}</p>
    <button class="Product__button" @click="selectProduct">{{buttonActionText}}</button>
    <input type="number" v-model="quantity"/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      added: false,
      quantity: 1
    }
  },
  props:['product'],
  computed:{
    isSelected(){
      return this.$store.getters.isSelectedAddonProduct(this.product);
    },
    buttonActionText(){
      return this.added ? 'Added' : 'Add';
    }
  },
  methods:{
    selectProduct(){
      this.$store.commit('updateSelectedAddonProducts',{product: this.product, quantity: parseInt(this.quantity) });
      this.added = true;
      setTimeout(()=>{
        this.added = false;
      },1500);
    }
  }
}
</script>