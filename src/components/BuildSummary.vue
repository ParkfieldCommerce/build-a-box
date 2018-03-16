<template>
  <div class="BuildSummary">
    <div class="BuildSummary__main-product">
      <div>Your Happy Box</div>
      <button class="BuildSummary__change-button" @click="updatePage(1)">
        <i class="fa fa-angle-left"></i><span>Change Your Crate</span>
      </button>
      <div class="BuildSummary__product">
        <img :src="mainProduct | getProductImage" alt="">
        <span class="BuildSummary__product-title">{{mainProduct.title}}</span>
        <span class="BuildSummary__product-size"></span>
        <span class="BuildSummary__product-price">{{mainProduct |moneyFormat}}</span>
      </div>
    </div>
    <ul class="BuildSummary__addon-products">
      <li v-for="addon in addonProducts">
        <div class="BuildSummary__product">
          <img :src="addon | getProductImage" alt="">
          <span class="BuildSummary__product-title">{{addon.title}}({{addon.quantity}})</span>
          <span class="BuildSummary__product-size"></span>
          <span class="BuildSummary__product-price">{{addon | moneyFormat}}</span>
          <button @click="removeAddon(addon)">x</button>
        </div>
      </li>
    </ul>
    <div class="BuildSummary__card-product">
      <img :src="cardProduct | getProductImage" alt="">
      {{cardProduct.title}} - {{cardProduct | moneyFormat}}
      {{cardProduct.message}}
    </div>
    <div class="BuildSummary__total-price">{{totalBuildPrice}}</div>
    <CartButton></CartButton>
  </div>
</template>

<script>
import CartButton from './CartButton';
export default {
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
      this.$emit('changepage', pageNumber);
    }
  }
};
</script>