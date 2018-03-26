<template>
  <div class="Product Product--card" :class="isSelected ? 'Product--selected' : ''">
    <div class="Product__hover-container">
      <div class="Product__image-container">
        <img @click="selectProduct" class="Product__image" :src="product | getProductImage">
      </div>
      <button class="Product__button" @click="selectProduct">{{buttonActionText}}</button>
    </div>
    <p class="Product__title">{{product.title}}</p>
    <CardProductPopup @deactivate="closePopup()" :activate="popupIsActive" :product="product"></CardProductPopup>
  </div>
</template>

<script>
import CardProductPopup from './CardProductPopup.vue';

export default {
  props:{
    product:Object
  },
  data(){
    return{
      popupIsActive: false,
    }
  },
  components:{
    'CardProductPopup':CardProductPopup
  },
  computed:{
    buttonActionText(){
      return this.$store.getters.isSelectedCardProduct(this.product) ? 'Edit' : 'Select Card';
    },
    isSelected(){
      return this.$store.getters.isSelectedCardProduct(this.product);
    }
  },
  methods:{
    selectProduct(){
      this.popupIsActive = true;
      this.$store.commit('updateSelectedCardProduct',this.product);
    },
    closePopup(){
      this.popupIsActive = false;
    }
  }
};
</script>