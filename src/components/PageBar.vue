<template>
  <div class="PageBar__container">
    <div class="PageBar">
      <div class="PageBar__buttons">
        <button @click="updatePage(1)" class="PageBar__button PageBar__button--enabled" :class="[currentpage == 1 ? 'PageBar__button--active' : '']">
          <div class="PageBar__step-text">step 1</div>
          <div class="PageBar__square"></div>
          <div class="PageBar__image-wrapper">
            <img class="PageBar__image" src="https://cdn.shopify.com/s/files/1/1363/8433/files/step1.jpg?14267440177445714804" alt="Step 1">
          </div>
        </button>
        <button @click="updatePage(2)" class="PageBar__button" :class="[currentpage == 2 ? 'PageBar__button--active' : '', hasMainProduct ? 'PageBar__button--enabled':'PageBar__button--disabled']">
          <div class="PageBar__step-text">step 2</div>
          <div class="PageBar__square"></div>
          <div class="PageBar__image-wrapper">
            <img class="PageBar__image" src="https://cdn.shopify.com/s/files/1/1363/8433/files/step2.jpg?14267440177445714804" alt="Step 2">
          </div>
        </button>
        <button @click="updatePage(3)" class="PageBar__button" :class="[currentpage == 3 ? 'PageBar__button--active' : '', hasAddonProduct ? 'PageBar__button--enabled':'PageBar__button--disabled']">
          <div class="PageBar__step-text">step 3</div>
          <div class="PageBar__square"></div>
          <div class="PageBar__image-wrapper">
            <img class="PageBar__image" src="https://cdn.shopify.com/s/files/1/1363/8433/files/step3.jpg?14267440177445714804" alt="Step 3">
          </div>
        </button>
      </div>
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
        return `Pick a box`
      }
      if(this.currentpage == 2){
        return `Fill with gifts`
      }
      if(this.currentpage == 3){
        return `Pick a card & write your note`
      }
    }
  }
}
</script>