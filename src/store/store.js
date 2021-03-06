import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    mainProducts:[],
    addonProducts:[],
    cardProducts:[],
    selectedFilters:[],
    selectedMainProduct:{},
    selectedAddonProducts:[],
    selectedCardProduct:{}
  },
  getters,
  mutations,
  actions
});

export default store;