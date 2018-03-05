<template>
  <div class="BuildABox">
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
    <BuildSummary></BuildSummary>
  </div>
</template>

<script>
import AddonProduct from './components/AddonProduct.vue';
import BuildSummary from './components/BuildSummary.vue';
import CardProduct from './components/CardProduct.vue';
import MainProduct from './components/MainProduct.vue';
import PageBar from './components/PageBar.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  components:{
    AddonProduct,
    BuildSummary,
    CardProduct,
    MainProduct,
    PageBar,
    ProductFilter
  },
  data () {
    return {
      currentPage:2
    }
  },
  computed:{
    mainProducts(){
      return this.$store.state.mainProducts;
    },
    addonProducts(){
      return this.$store.getters.addonProducts;
    },
    cardProducts(){
      return this.$store.getters.cardProducts;
    },
    addonFilterOptions(){
      return this.$store.getters.addonFilterOptions;
    },
    cardFilterOptions(){
      return this.$store.getters.cardFilterOptions;
    }
  },
  methods:{
    changePage(page){
      this.currentPage = page;
    }
  }
}
</script>

<style lang="scss">

</style>
