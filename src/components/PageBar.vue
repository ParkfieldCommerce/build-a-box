<template>
  <div class="PageBar__container">
    <div class="PageBar">
      <button @click="updatePage(1)" class="PageBar__button PageBar__button--enabled" :class="[currentpage == 1 ? 'PageBar__button--active' : '']">
        <div class="PageBar__step-text">step 1</div>
        <div class="PageBar__square"></div>
        <div class="PageBar__image-wrapper">
          <img class="PageBar__image" src="https://cdn.shopify.com/s/files/1/3105/1134/files/step1.jpg?7669629119457782060" alt="">
        </div>
      </button>
      <button @click="updatePage(2)" class="PageBar__button" :class="[currentpage == 2 ? 'PageBar__button--active' : '', hasMainProduct ? 'PageBar__button--enabled':'PageBar__button--disabled']">
        <div class="PageBar__step-text">step 2</div>
        <div class="PageBar__square"></div>
        <div class="PageBar__image-wrapper">
          <img class="PageBar__image" src="https://cdn.shopify.com/s/files/1/3105/1134/files/step2.jpg?7669629119457782060" alt="">
        </div>
      </button>
      <button @click="updatePage(3)" class="PageBar__button" :class="[currentpage == 3 ? 'PageBar__button--active' : '', hasAddonProduct ? 'PageBar__button--enabled':'PageBar__button--disabled']">
        <div class="PageBar__step-text">step 3</div>
        <div class="PageBar__square"></div>
        <div class="PageBar__image-wrapper">
          <img class="PageBar__image" src="https://cdn.shopify.com/s/files/1/3105/1134/files/step3.jpg?7669629119457782060" alt="">
        </div>
      </button>
    </div>
    <div class="PageBar__description">
      <h3>Step {{currentpage}}</h3>
      <p>{{stepDescription}}</p>
    </div>
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
    },
    stepDescription(){
      if(this.currentpage == 1){
        return `We've hand-selected the best box products in one place`
      }
      if(this.currentpage == 2){
        return `We've hand-selected the best addon products in one place`
      }
      if(this.currentpage == 3){
        return `We've hand-selected the best card products in one place`
      }
    }
  }
}
</script>