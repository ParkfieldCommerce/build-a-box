<template>
  <div class="PageBar">
    <button @click="updatePage(1)" class="PageBar__button PageBar__button--enabled" :class="[currentpage == 1 ? 'PageBar__button--active' : '']">
      1. Pick a box
      <img class="PageBar__image" src="https://cdn.shopify.com/s/files/1/3105/1134/files/step1.jpg?7669629119457782060" alt="">
    </button>
    <button @click="updatePage(2)" class="PageBar__button" :class="[currentpage == 2 ? 'PageBar__button--active' : '', hasMainProduct ? 'PageBar__button--enabled':'PageBar__button--disabled']">
      2. Fill with gifts
      <img class="PageBar__image" src="https://cdn.shopify.com/s/files/1/3105/1134/files/step2.jpg?7669629119457782060" alt="">
    </button>
    <button @click="updatePage(3)" class="PageBar__button" :class="[currentpage == 3 ? 'PageBar__button--active' : '', hasAddonProduct ? 'PageBar__button--enabled':'PageBar__button--disabled']">
      3. Pick a card & write
      <img class="PageBar__image" src="https://cdn.shopify.com/s/files/1/3105/1134/files/step3.jpg?7669629119457782060" alt="">
    </button>
  </div>
</template>

<script>
export default {
  props:{
    currentpage: Number
  },
  methods:{
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
    }
  },
  computed:{
    hasMainProduct(){
      return this.$store.state.selectedMainProduct.id !== undefined;
    },
    hasAddonProduct(){
      return this.$store.state.selectedAddonProducts.length > 0;
    }
  }
}
</script>