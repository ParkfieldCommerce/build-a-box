<template>
  <div class="BuildSummary">
    <div class="BuildSummary__main-product">
      {{mainProduct.title}}-{{mainProduct | getPrice}}
    </div>
    <ul class="BuildSummary__addon-products">
      <li v-for="addon in addonProducts">
        {{addon.title}} - {{addon.quantity}}
        {{addon | getPrice}}
      </li>
    </ul>
    <div class="BuildSummary__card-product">
      {{cardProduct.title}} - {{cardProduct | getPrice}}
    </div>
  </div>
</template>

<script>
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
    }
  }
};
</script>