<template>
  <div class="BuildABox">
    <div class="BuildABox__main">
      <PageBar @changepage="changePage($event)"></PageBar>
      <div v-if="currentPage == 1" class="BuildABox__page BuildABox__page--mainProducts">
        <ul class="BuildABox__main-products">
          <li v-for="product in mainProducts" :key="product.id">
            <MainProduct :product="product"></MainProduct>
          </li>
        </ul>
      </div>
      <div v-if="currentPage == 2" class="BuildABox__page BuildABox__page--addonProducts">
        <ProductFilter :page="currentPage" :options="addonFilterOptions"></ProductFilter>
        <ul class="BuildABox__addon-products">
          <li v-for="product in addonProducts" :key="product.id">
            <AddonProduct :product="product"></AddonProduct>
          </li>
        </ul>
      </div>
      <div v-if="currentPage == 3" class="BuildABox__page BuildABox__page--cardProducts">
        <ProductFilter :page="currentPage" :options="cardFilterOptions"></ProductFilter>
        <ul class="BuildABox__card-products">
          <li v-for="product in cardProducts" :key="product.id">
            <CardProduct :product="product"></CardProduct>
          </li>
        </ul>
      </div>
    </div>
    <div class="BuildABox__sidebar">
    <BuildSummary></BuildSummary>
    <CartButton></CartButton>
    </div>
  </div>
</template>

<script>
import AddonProduct from './components/AddonProduct.vue'
import BuildSummary from './components/BuildSummary.vue'
import CardProduct from './components/CardProduct.vue'
import MainProduct from './components/MainProduct.vue'
import PageBar from './components/PageBar.vue'
import ProductFilter from './components/ProductFilter.vue'
import CartButton from './components/CartButton.vue'
import { mapGetters } from 'vuex'

export default {
  components:{
    AddonProduct,
    BuildSummary,
    CardProduct,
    MainProduct,
    PageBar,
    ProductFilter,
    CartButton
  },
  data () {
    return {
      currentPage:1
    }
  },
  computed:{
    mainProducts(){
      return this.$store.state.mainProducts;
    },
    ...mapGetters([
      'addonProducts',
      'cardProducts',
      'addonFilterOptions',
      'cardFilterOptions'
    ])
  },
  methods:{
    changePage(page){
      this.currentPage = page;
    }
  }
}
</script>

<style lang="scss">

$accent-color: #2196F3;
.BuildABox{
  display: flex;
  &__main{
    width: 80%;
  }
  &__sidebar{
    width: 20%;
  }
  &__main-products{
    display: flex;
    flex-flow: row wrap;
    li{
      width: 50%;
    }
  }
  &__addon-products,
  &__card-products{
    display: flex;
    flex-flow: row wrap;
    li{
      width: 25%;
    }
  }
}
.Product{
  text-align: center;
  &--selected{
    border: 2px solid $accent-color;
  }
  &__card-popup{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    &__content{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 2;
    }
    &__overlay{
      content:'';
      display: block;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0,0,0,.3);
    }
  }
}
</style>
