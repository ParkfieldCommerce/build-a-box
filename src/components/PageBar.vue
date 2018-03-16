<template>
  <div class="PageBar">
    <button @click="updatePage(1)" class="PageBar__button PageBar__button--enabled" :class="[currentpage == 1 ? 'PageBar__button--active' : '']">
      1. Pick a box
    </button>
    <button @click="updatePage(2)" class="PageBar__button" :class="[currentpage == 2 ? 'PageBar__button--active' : '', hasMainProduct ? 'PageBar__button--enabled':'PageBar__button--disabled']">
      2. Fill with gifts
    </button>
    <button @click="updatePage(3)" class="PageBar__button" :class="[currentpage == 3 ? 'PageBar__button--active' : '', hasAddonProduct ? 'PageBar__button--enabled':'PageBar__button--disabled']">
      3. Pick a card & write
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