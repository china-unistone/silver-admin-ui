import Vue from 'vue'
import Vuex from 'vuex'
import stateApp from './vuex/moduleApp/state'
import actionsApp from './vuex/moduleApp/actions'
import gettersApp from './vuex/moduleApp/getters'
import mutationsApp from './vuex/moduleApp/mutations'
import stateData from './vuex/moduleData/state'
import actionsData from './vuex/moduleData/actions'
import gettersData from './vuex/moduleData/getters'
import mutationsData from './vuex/moduleData/mutations'

Vue.use(Vuex)

const moduleApp = {
  state: stateApp,
  actions: actionsApp,
  getters: gettersApp,
  mutations: mutationsApp
}

const moduleData = {
  state: stateData,
  actions: actionsData,
  getters: gettersData,
  mutations: mutationsData
}

export default new Vuex.Store({
  modules: {
    moduleApp,
    moduleData
  }
})
