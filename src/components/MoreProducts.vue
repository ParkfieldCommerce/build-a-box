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
      console.log(document.documentElement.scrollTop);
      if(document.documentElement.scrollTop > 300){
        this.show = false;
        window.removeEventListener('scroll',this.scrollFade);
      }else{
        this.show = true;
      }
    }
  },
  mounted(){
    window.addEventListener('scroll', this.scrollFade);
  },
  beforeDestroy(){
    window.removeEventListener('scroll',this.scrollFade);
  }
};
</script>