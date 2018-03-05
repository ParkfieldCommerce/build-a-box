import Vue from 'vue';

let mutations = {
  setMainProducts(state, payload){
    state.mainProducts = payload;
  },
  setAddonProducts(state, payload){
    state.addonProducts = payload;
  },
  setCardProducts(state, payload){
    state.cardProducts = payload;
  },
  setFilteredAddonProducts(state, payload){
    state.filteredAddonProducts = payload;
  },
  setFilteredCardProducts(state, payload){
    state.filteredCardProducts = payload;
  },
  updateSelectedMainProduct(state,payload){
    state.selectedMainProduct = payload;
  },
  updateSelectedAddonProducts(state,payload){
    let found = false;
    for(let i = 0; i < state.selectedAddonProducts.length; i++){
      if(state.selectedAddonProducts[i].id == payload.product.id){
        found = true;
        state.selectedAddonProducts[i].quantity += payload.quantity;
        break;
      }
    }
    if(!found){
      Vue.set(payload.product,'quantity',payload.quantity);
      //payload.product.quantity = payload.quantity;
      state.selectedAddonProducts.push(payload.product);
    }
  },
  updateSelectedCardProduct(state,payload){
    state.selectedCardProduct = payload;
  },
  updateSelectedCardMessage(state,payload){
    state.selectedCardProduct.message = payload;
  },
  updateFilters(state, payload){
    state.selectedFilters = payload;
  },
  clearFilters(state){
    state.selectedFilters = 'all';
  }
};

export default mutations;