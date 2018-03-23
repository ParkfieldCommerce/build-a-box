<template>
  <div class="MobileBuildSummary" :class="cartView ? 'MobileBuildSummary--active' : ''">
    <div class="MobileBuildSummary__total-price">
      <span class="MobileBuildSummary__total-price-text">Subtotal: {{totalBuildPrice}}</span>
      <button @click="cartView = !cartView" class="MobileBuildSummary__view-box">{{cartView ? 'Keep Building' : 'View Box'}}</button>
    </div>
    <div v-if="currentpage == 1 && !cartView" class="MobileBuildSummary__buttons">
      <button v-if="hasMainProduct" class="MobileBuildSummary__page-button MobileBuildSummary__page-button--next" @click="updatePage(2)">Next</button>
      <button v-else class="MobileBuildSummary__page-button MobileBuildSummary__page-button--info">Choose Box</button>
    </div>
    <div v-else-if="currentpage == 2 && !cartView" class="MobileBuildSummary__buttons">
      <button class="MobileBuildSummary__page-button MobileBuildSummary__page-button--prev" @click="updatePage(1)">Back</button>
      <button v-if="hasAddonProduct" class="MobileBuildSummary__page-button MobileBuildSummary__page-button--next" @click="updatePage(3)">Next</button>
      <button v-else class="MobileBuildSummary__page-button MobileBuildSummary__page-button--info">Choose Gifts</button>
    </div>
    <div v-else-if="currentpage == 3 && !cartView" class="MobileBuildSummary__buttons">        
      <button class="MobileBuildSummary__page-button MobileBuildSummary__page-button--prev" @click="updatePage(2)">Back</button>
      <CartButton v-if="hasCardProduct && hasAddonProduct"></CartButton>
      <button v-else-if="hasCardProduct && !hasAddonProduct" class="MobileBuildSummary__page-button MobileBuildSummary__page-button--next" @click="updatePage(2)">Choose Gifts</button>
      <button v-else class="MobileBuildSummary__page-button MobileBuildSummary__page-button--info">Choose a Card</button>
    </div>
    <div class="MobileBuildSummary__fill-meter">
      <div class="MobileBuildSummary__fill-amount" :style="{width: buildCapacity + '%'}">
      </div>
      <div class="MobileBuildSummary__fill-text">{{fillAmountText}}</div>
    </div>
    <div class="MobileBuildSummary__products">
      <div class="MobileBuildSummary__main-product">
        <div class="MobileBuildSummary__product" v-if="itemExists(mainProduct)">
          <img class="MobileBuildSummary__product-image" :src="mainProduct | getProductImage" alt="">
          <div class="MobileBuildSummary__product-text">
            <span class="MobileBuildSummary__product-title">{{mainProduct.title}}</span>
            <span class="MobileBuildSummary__product-size"></span><br>
            <span class="MobileBuildSummary__product-price">{{mainProduct |moneyFormat}}</span>
          </div>
        </div>
      </div>
      <ul class="MobileBuildSummary__addon-products" v-if="itemExists(addonProducts)">
        <li v-for="addon in addonProducts">
          <div class="MobileBuildSummary__product">
            <img class="MobileBuildSummary__product-image" :src="addon | getProductImage" alt="">
            <div class="MobileBuildSummary__product-text">
              <span class="MobileBuildSummary__product-title">{{addon.title}}</span><br>
              <span class="MobileBuildSummary__product-size">Qty: {{addon.quantity}}</span><br>
              <span class="MobileBuildSummary__product-price">{{addon | moneyFormat}}</span>
            </div>
            <button class="MobileBuildSummary__product-remove" @click="removeAddon(addon)">Remove</button>
          </div>
        </li>
      </ul>
      <div class="MobileBuildSummary__card-product" v-if="itemExists(cardProduct)">
        <div class="MobileBuildSummary__product">
          <img class="MobileBuildSummary__product-image" :src="cardProduct | getProductImage" alt="">
          <div class="MobileBuildSummary__product-text">
            <span class="MobileBuildSummary__product-title">{{cardProduct.title}}</span><br>
            <span class="MobileBuildSummary__product-price">{{cardProduct | moneyFormat}}</span><br>
            <span>Message: {{cardProduct.message}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartButton from './CartButton';
export default {
  props:{
    currentpage: Number
  },
  data(){
    return{
      fillAmountText: 0,
      cartView: false
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
    hasMainProduct(){
      return this.$store.state.selectedMainProduct.id !== undefined;
    },
    hasAddonProduct(){
      return this.$store.state.selectedAddonProducts.length > 0;
    },
    hasCardProduct(){
      return this.$store.state.selectedCardProduct.id !== undefined;
    },
    totalBuildPrice(){
      return this.$store.getters.totalBuildPrice;
    },
    buildCapacity(){
      let maxCapacity = this.mainProduct.maxCapacity;
      if(this.mainProduct.maxCapacity == undefined){
        maxCapacity = 1;
      }
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
  components:{
    'CartButton':CartButton
  },
  methods:{
    removeAddon(product){
      this.$store.commit('removeSelectedAddonProduct', product);
    },
    updatePage(pageNumber){
      if(pageNumber == 1){
        this.$emit('changepage', pageNumber);
      }
      if(pageNumber == 2 && this.hasMainProduct) {
        this.$emit('changepage', pageNumber);
      }
      if(pageNumber == 3 && this.hasAddonProduct) {
        this.$emit('changepage', pageNumber);
      }
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