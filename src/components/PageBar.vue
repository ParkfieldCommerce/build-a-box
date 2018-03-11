<template>
  <div class="PageBar">
    <button @click="updatePage(1)" :class="[currentpage == 1 ? 'active' : '']">
      1. Pick a box
    </button>
    <button @click="updatePage(2)" :class="[currentpage == 2 ? 'active' : '']">
      2. Fill with gifts
    </button>
    <button @click="updatePage(3)" :class="[currentpage == 3 ? 'active' : '']">
      3. Pick a card & write
    </button>
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
      if(pageNumber == 2) {
        this.$emit('changepage', pageNumber);
      }
      if(pageNumber == 3) {
        this.$emit('changepage', pageNumber);
      }
    }
  }
};
</script>