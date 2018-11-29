/**
 * Created by Jeff on 18/08/07.
 */
import * as types from '../mutation-types'

const actions = {
  setLoginUserId: ({ commit }, payload) => {
    commit(types.SET_LOGIN_USER_ID, payload.loginUserId)
  },
  setMenuList: ({ commit }, payload) => {
    commit(types.SET_MENU_LIST, payload.menuList)
  },
  resetTabs: ({ commit }, payload) => {
    commit(types.RESET_TABS, payload.tabItem)
  },
  addTab: ({ commit }, payload) => {
    commit(types.ADD_TAB, payload.tabItem)
  },
  removeTab: ({ commit }, payload) => {
    commit(types.REMOVE_TAB, payload.tabName)
  }
}

export default actions
