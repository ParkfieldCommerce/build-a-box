<template>
  <transition name="fade">
    <div v-if="showArrow" class="MoreProducts">
      <p>Scroll to see more products</p>
      <img src="https://cdn.shopify.com/s/files/1/1363/8433/files/Down_Arrow.png?14267440177445714804" alt="More Products Below">
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
  props:{
    currentpage:Number
  },
  computed:{
    showArrow(){
      return this.show && this.currentpage === 2;
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
    if(this.$store.state.selectedAddonProducts.length === 0){
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