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
  removeSelectedAddonProduct(state, payload){
    let indexToUpdate = state.selectedAddonProducts.findIndex( addon => {
      return addon.id == payload.id;
    });
    if(payload.quantity > 1){
      state.selectedAddonProducts[indexToUpdate].quantity = payload.quantity -1;
    }else{
      state.selectedAddonProducts.splice(indexToUpdate, 1);
    }
  },
  updateSelectedCardProduct(state,payload){
    state.selectedCardProduct = payload;
  },
  updateSelectedCardMessage(state,payload){
    Vue.set(state.selectedCardProduct,'message',payload);
  },
  updateFilters(state, payload){
    state.selectedFilters = payload;
  },
  clearFilters(state){
    state.selectedFilters = 'all';
  }
};

export default mutations;