<template>
  <div class="Product Product--addon" :class="[isSelected ? 'Product--selected' : '', ableToAddMore ? '' : 'Product--disabled']">
    <div class="Product__hover-container">
    <div class="Product__image-container">
      <span class="Product__quantity-added" v-show="product.quantity > 0"><span>{{quantityAdded}}</span></span>
      <img @click="updateCartQuantity(true)" class="Product__image" :src="product | getProductImage">
      <div v-if="hasAltImage" class="Product__image Product__image--alt" :style="{ 'backgroundImage': 'url(' + product.images[1].src + ')' }"></div>
    </div>
      <div v-if="quantityAdded" class="Product__button-container Product__button-container--active">
        <div class="Product__quantity">
          <button class="Product__quantity-btn" @click="updateCartQuantity(false)">-</button>
          <span class="Product__quantity-status">{{product.quantity}} in box</span>
          <button :class="ableToAddMore ? '': 'Product__quantity-btn--disabled'" class="Product__quantity-btn" @click="updateCartQuantity(true)">+</button>

        </div>
      </div>
      <div v-else>
        <div class="Product__button-container">
          <button class="Product__add-btn" @click="updateCartQuantity(true)">{{buttonText}}</button>
        </div>
      </div>
    </div>
    <p class="Product__title">{{product.title}}</p>
    <span class="Product__price">{{product | moneyFormat}}</span>
  </div>
</template>

<script>
export default {
  data(){
    return{
      added: false
    }
  },
  props:{
    product:Object
  },
  computed:{
    buttonText(){
      return this.ableToAddMore ? 'Add To Box' : `Won't fit`;
    },
    quantityAdded(){
      if(this.product.quantity > 0){
        return this.product.quantity;
      }
    },
    isSelected(){
      return this.$store.getters.isSelectedAddonProduct(this.product);
    },
    ableToAddMore(){
      let maxCapacity = this.$store.state.selectedMainProduct.maxCapacity;
      if(this.$store.state.selectedAddonProducts.length > 0){
        var currentCapacity = 0;
        this.$store.state.selectedAddonProducts.forEach( addon => {
          let capacity = addon.capacity;
          let quantity = addon.quantity;
          currentCapacity += capacity * quantity;
        })
      }else{
        currentCapacity = 0;
      }
      return maxCapacity >= currentCapacity + this.product.capacity;
    },
    hasAltImage(){
      return this.product.images.length > 1;
    }
  },
  methods:{
    updateCartQuantity(increment){
      if(increment){
        if(this.ableToAddMore){
          this.$store.commit('updateSelectedAddonProducts',{product: this.product, quantity: 1});
        }
      }else{
        this.$store.commit('removeSelectedAddonProduct', this.product);
      }
    }
  }
}
</script>