let getters = {
  isSelectedMainProduct(state){
    return (product) =>{
      return state.selectedMainProduct.id == product.id;
    }
  },
  isSelectedCardProduct(state){
    return (product) =>{
      return state.selectedCardProduct.id == product.id;
    }
  },
  isSelectedAddonProduct(state){
    return (product) =>{
      let found = false;
      for(let i = 0; i < state.selectedAddonProducts.length; i++){
        if(state.selectedAddonProducts[i].id === product.id){
          found = true;
          break;
        }
      }
      return found;
    }
  },
  addonProducts(state){
    if(state.selectedFilters == 'all'){
      return state.addonProducts;
    }else{
      return state.addonProducts.filter(product => {
        let pass = true;
        if(product.tags.indexOf(state.selectedFilters) === -1){
          pass = false;
        }
        return pass;
      });
    }
  },
  addonFilterOptions(state){
    let tags = [];
    for(let i = 0; i < state.addonProducts.length; i++){
      let tagsToAdd = state.addonProducts[i].tags.filter( tag => {
        return tags.indexOf(tag) == -1;
      });
      tags = [...tags, ...tagsToAdd];
    }
    return tags;
  },
  cardProducts(state){
    if(state.selectedFilters == 'all'){
      return state.cardProducts;
    }else{
      return state.cardProducts.filter(product => {
        let pass = true;
        if(product.tags.indexOf(state.selectedFilters) === -1){
          pass = false;
        }
        return pass;
      });
    }
  },
  cardFilterOptions(state){
    let tags = [];
    for(let i = 0; i < state.cardProducts.length; i++){
      let tagsToAdd = state.cardProducts[i].tags.filter( tag => {
        return tags.indexOf(tag) === -1;
      });
      tags = [...tags, ...tagsToAdd];
    }
    return tags;
  }
};

export default getters;