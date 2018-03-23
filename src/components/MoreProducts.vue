<template>
  <transition name="fade">
    <div v-show="show" class="MoreProducts">
      <p>Scroll to see more products</p>
      <img src="https://cdn.shopify.com/s/files/1/3105/1134/files/Down_Arrow.png?3790420542992020787" alt="">
    </div>
  </transition>
</template>

<script>
export default {
  data(){
    return{
      show: true
    }
  },
  methods:{
    scrollFade(){
      if(document.documentElement.scrollTop > 300){
        this.show = false;
        window.removeEventListener('scroll',this.scrollFade);
      }else{
        this.show = true;
      }
    }
  },
  mounted(){
    if(this.$store.state.selectedAddonProducts.length === 0 && this.$store.state.selectedCardProduct.id == undefined){
      window.addEventListener('scroll', this.scrollFade);
    }else{
      this.show = false;
    }
  },
  beforeDestroy(){
    window.removeEventListener('scroll',this.scrollFade);
  }
};
</script>