<template>
  <div class="Product Product--card">
    <div v-if="activate" class="Product__card-popup">
      <span class="Product__card-popup__overlay" @click="closePopup"></span>
      <div class="Product__card-popup__content">
        <div class="Product__card-popup__image-container">
          <img class="Product__card-popup__image" :src="product | getProductImage">
        </div>
        <div class="Product__card-popup__text">
          <h3 class="Product__card-popup__heading">
          <img class="Product__card-popup__heading-image" src="https://cdn.shopify.com/s/files/1/3105/1134/files/step3.jpg?7669629119457782060" alt="">
          <span>Write your card</span></h3>
          <p class="Product__card-popup__body">Your message will be handwritten by our team. Please make sure you wrote everything as you'd like it to appear!</p>
          <span v-if="!isBlank">Characters remaining: {{characterCheck}}</span>
          <textarea @keyup="validateMessage" placeholder="Up to 350 characters" v-if="!isBlank" v-model="message" name="message" cols="30" rows="5"></textarea>
          <div class="Product__card-popup__input-container">
            <input name="BlankCard" type="checkbox" v-model="isBlank" @change="clearMessage"/>
            <label for="BlankCard">Click here if you want your card blank</label>
          </div>
          <button class="Product__card-popup__button" @click="closePopup">Back</button>
          <button :disabled="!validMessage" class="Product__card-popup__button" @click="updateMessage">Add & Review Box</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    product:Object,
    activate: Boolean
  },
  data(){
    return{
      message:'',
      isBlank: false,
      validMessage: true
    }
  },
  watch:{
    activate(currentValue, nextValue){
      this.message = this.$store.state.selectedCardProduct.message;

      let body = document.querySelector('body');
      let mainContent = document.querySelector('.main-content');
      if(nextValue == true){
        mainContent.classList.remove('active');
        body.classList.remove('active');
      }else{
        mainContent.classList.add('active');
        body.classList.add('active');
        window.scrollTo(0,10);
      }
    }
  },
  computed:{
    characterCheck(){
      let currentLength = this.message == undefined ? 0 : this.message.length;
      if(currentLength <= 350){
        return 350 - currentLength;
      }else{
        return 'Message too long';
      }
    }
  },
  methods:{
    validateMessage(e){
      this.message = e.target.value;
      return this.validMessage = e.target.value.length < 350;
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
      this.$emit('deactivate', true);
    }
  }
};
</script>