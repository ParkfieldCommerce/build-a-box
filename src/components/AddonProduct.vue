<template>
  <div class="Product Product--addon" :class="[isSelected ? 'Product--selected' : '', ableToAddMore ? '' : 'Product--disabled']">
    <div class="Product__hover-container">
    <div class="Product__image-container">
      <span class="Product__quantity-added" v-show="product.quantity > 0">{{quantityAdded}}</span>
      <img class="Product__image" :src="product | getProductImage">
    </div>
      <div v-if="quantityAdded" class="Product__button-container Product__button-container--active">
        <div class="Product__quantity">
          <button :class="ableToAddMore ? '': 'Product__quantity-btn--disabled'" class="Product__quantity-btn" @click="updateCartQuantity(true)">+</button>
          <span class="Product__quantity-status">{{product.quantity}} in box</span>
          <button class="Product__quantity-btn" @click="updateCartQuantity(false)">-</button>
        </div>
      </div>
      <div v-else>
        <div class="Product__button-container">
          <button class="Product__add-btn" @click="updateCartQuantity(true)">{{buttonText}}</button>
        </div>
      </div>
    </div>
    <p class="Product__title">{{product.title}}<br>{{product | moneyFormat}}</p>
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
    }
  },
  methods:{
    selectProduct(){
      this.$store.commit('updateSelectedAddonProducts',{product: this.product, quantity: 1});
    },
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