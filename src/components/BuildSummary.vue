<template>
  <div class="BuildSummary">
    <span class="BuildSummary__box-title">Your Happy Box</span>
    <div class="BuildSummary__fill-meter">
      <div class="BuildSummary__fill-amount" :style="{width: buildCapacity + '%'}">
      </div>
      <div class="BuildSummary__fill-text">{{fillAmountText}}</div>
    </div>
    <div class="BuildSummary__total-price">Subtotal: {{totalBuildPrice}}</div>
    <button class="BuildSummary__change-button" @click="updatePage(1)">
      <i class="fa fa-angle-left"></i><span>Switch Box Design</span>
    </button>
    <div class="BuildSummary__main-product">
      <div class="BuildSummary__product" v-if="itemExists(mainProduct)">
        <img class="BuildSummary__product-image" :src="mainProduct | getProductImage" alt="">
        <div class="BuildSummary__product-text">
          <span class="BuildSummary__product-title">{{mainProduct.title}}</span>
          <span class="BuildSummary__product-size"></span><br>
          <span class="BuildSummary__product-price">{{mainProduct |moneyFormat}}</span>
        </div>
      </div>
    </div>
    <ul class="BuildSummary__addon-products" v-if="itemExists(addonProducts)">
      <li v-for="addon in addonProducts">
        <div class="BuildSummary__product">
          <img class="BuildSummary__product-image" :src="addon | getProductImage" alt="">
          <div class="BuildSummary__product-text">
            <span class="BuildSummary__product-title">{{addon.title}}</span><br>
            <span class="BuildSummary__product-size">Qty: {{addon.quantity}}</span><br>
            <span class="BuildSummary__product-price">{{addon | moneyFormat}}</span>
          </div>
          <button class="BuildSummary__product-remove" @click="removeAddon(addon)"><i class="fa fa-times-thin fa-2x" aria-hidden="true"></i></button>
        </div>
      </li>
    </ul>
    <div class="BuildSummary__card-product" v-if="itemExists(cardProduct)">
      <div class="BuildSummary__product">
        <img class="BuildSummary__product-image" :src="cardProduct | getProductImage" alt="">
        <div class="BuildSummary__product-text">
          <span class="BuildSummary__product-title">{{cardProduct.title}}</span><br>
          <span class="BuildSummary__product-price">{{cardProduct | moneyFormat}}</span><br>
          <span v-if="cardProduct.message != ''">Message: {{cardProduct.message}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      fillAmountText: 0
    }
  },
  computed:{
    mainProduct(){
      return this.$store.state.selectedMainProduct;
    },
    addonProducts(){
      return this.$store.state.selectedAddonProducts;
    },
    cardProduct(){
      return this.$store.state.selectedCardProduct;
    },
    totalBuildPrice(){
      return this.$store.getters.totalBuildPrice;
    },
    buildCapacity(){
      let maxCapacity = this.mainProduct.maxCapacity;
      if(this.addonProducts.length > 0){
        var currentCapacity = 0;
        this.addonProducts.forEach( addon => {
          let capacityTag = addon.tags.find( tag => {
            return tag.indexOf('capacity_') > -1;
          });
          let capacity = parseInt(capacityTag.split('_')[1]);
          let quantity = addon.quantity;
          currentCapacity += capacity * quantity;
        })
      }else{
        currentCapacity = 0;
      }
      if(currentCapacity > maxCapacity){
        this.fillAmountText = 'Overfull'
      }else if(currentCapacity == maxCapacity){
        this.fillAmountText = 'Full'
      }else{
        this.fillAmountText = `${Math.floor((currentCapacity/maxCapacity)*100)} %`;
      }
      return (currentCapacity/maxCapacity)*100;
    }
  },
  methods:{
    removeAddon(product){
      this.$store.commit('removeSelectedAddonProduct', product);
    },
    updatePage(pageNumber){
      this.$emit('changepage', pageNumber);
    },
    itemExists(product){
      var pass = false;
      if(Array.isArray(product)){
        if(product.length > 0){
          pass = true;
        }
      }else{
        if(product.id != null){
          pass = true;
        }
      }
      return pass;
    }
  }
};
</script>