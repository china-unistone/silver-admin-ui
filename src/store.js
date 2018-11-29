import Vue from 'vue'
import Vuex from 'vuex'
import stateApp from './vuex/moduleApp/state'
import actionsApp from './vuex/moduleApp/actions'
import gettersApp from './vuex/moduleApp/getters'
import mutationsApp from './vuex/moduleApp/mutations'

Vue.use(Vuex)

const moduleApp = {
  state: stateApp,
  actions: actionsApp,
  getters: gettersApp,
  mutations: mutationsApp
}

export default new Vuex.Store({
  modules: {
    moduleApp
  }
})
