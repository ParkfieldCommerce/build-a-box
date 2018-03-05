<template>
  <select v-model="selected" class="Filter" @change="updateFilters">
    <option value="all" selected>View All</option>
    <option v-for="option in options" :value="option">{{option}}</option>
  </select>
</template>

<script>
export default {
  data(){
    return{
      selected:'all'
    }
  },
  watch:{
    page(){
      this.selected = 'all';
    }
  },
  props:['options','page'],
  methods:{
    updateFilters(e){
      this.$store.commit('updateFilters', e.target.value);
    }
  }
};
</script>