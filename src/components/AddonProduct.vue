<template>
  <div class="Product Product--addon" :class="isSelected ? 'Product--selected' : ''">
    <div class="Product__image-container">
      <span class="Product__quantity-added" v-show="product.quantity > 0">{{quantityAdded}}</span>
      <img class="Product__image" :src="product | getProductImage">
      <div v-if="quantityAdded">
        <div class="Product__button-container Product__button-container--active">
          <div class="Product__quantity">
            <button class="Product__quantity-btn" @click="updateCartQuantity(true)">+</button>
            <span class="Product__quantity-status">{{product.quantity}} in box</span>
            <button class="Product__quantity-btn" @click="updateCartQuantity(false)">-</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="Product__button-container">
          <button class="Product__add-btn" @click="updateCartQuantity(true)">Add to Box</button>
        </div>
      </div>
    </div>
    <p class="Product__title">{{product.title}}</p>
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
    quantityAdded(){
      if(this.product.quantity > 0){
        return this.product.quantity;
      }
    },
    isSelected(){
      return this.$store.getters.isSelectedAddonProduct(this.product);
    }
  },
  methods:{
    selectProduct(){
      this.$store.commit('updateSelectedAddonProducts',{product: this.product, quantity: 1});
    },
    updateCartQuantity(increment){
      if(increment){
        this.$store.commit('updateSelectedAddonProducts',{product: this.product, quantity: 1});
      }else{
        this.$store.commit('removeSelectedAddonProduct', this.product);
      }
    }
  }
}
</script>