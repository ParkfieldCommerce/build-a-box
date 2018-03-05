<template>
  <div class="BuildSummary">
    {{mainProduct.title}}
    <ul>
      <li v-for="addon in addonProducts">
        {{addon.title}}
      </li>
    </ul>
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