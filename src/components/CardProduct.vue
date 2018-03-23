<template>
  <div class="Product Product--card" :class="isSelected ? 'Product--selected' : ''">
    <div class="Product__hover-container">
      <div class="Product__image-container">
        <img @click="selectProduct" class="Product__image" :src="product | getProductImage">
      </div>
      <button class="Product__button" @click="selectProduct">{{buttonActionText}}</button>
    </div>
    <p class="Product__title">{{product.title}}</p>
    <div v-if="popupIsActive" class="Product__card-popup">
      <span class="Product__card-popup__overlay" @click="closePopup"></span>
      <div class="Product__card-popup__content">
        <div class="Product__card-popup__image-container">
          <img class="Product__card-popup__image" :src="product | getProductImage">
        </div>
        <div class="Product__card-popup__text">
          <h3 class="Product__card-popup__heading">Write your card</h3>
          <p class="Product__card-popup__body">Your message will be handwritten by our team. Please make sure you wrote everything as you'd like it to appear!</p>
          <textarea @keyup="validateMessage" placeholder="Up to 320 charachters" v-if="!isBlank" v-model="message" name="message" cols="30" rows="5"></textarea>
          <div class="Product__card-popup__input-container">
            <input name="BlankCard" type="checkbox" v-model="isBlank" @change="clearMessage"/>
            <label for="BlankCard">Click here if you want your card blank</label>
          </div>
          <button :disabled="!validMessage" class="Product__card-popup__button" @click="updateMessage">All Set</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    product:Object
  },
  data(){
    return{
      popupIsActive: false,
      message:'',
      isBlank: false,
      validMessage: true
    }
  },
  computed:{
    buttonActionText(){
      return this.$store.getters.isSelectedCardProduct(this.product) ? 'Edit' : 'Select Card';
    },
    isSelected(){
      return this.$store.getters.isSelectedCardProduct(this.product);
    }
  },
  methods:{
    validateMessage(e){
      this.validMessage = e.target.value.length < 320;
    },
    selectProduct(){
      this.popupIsActive = true;
      this.$store.commit('updateSelectedCardProduct',this.product);
    },
    clearMessage(e){
      if(this.isBlank){
        this.message = '';
      }
    },
    updateMessage(){
      this.$store.commit('updateSelectedCardMessage', this.message);
      this.closePopup();
    },
    closePopup(){
      this.popupIsActive = false;
    }
  }
};
</script>