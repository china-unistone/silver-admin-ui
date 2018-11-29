/**
 * Created by Jeff on 17/10/29.
 */
import * as types from '../mutation-types'

const mutations = {
  [types.SET_LOGIN_USER_ID] (state, loginUserId) {
    state.loginUserId = loginUserId
  },
  // 设置菜单项
  [types.SET_MENU_LIST] (state, menuList) {
    console.log('menuList: ', menuList)
    state.menuList = [...menuList]
  },
  // 将tab列表设置为指定的项
  [types.RESET_TABS] (state, tabItem) {
    console.log('tabs: ', tabItem)
    state.tabs = [tabItem]
  },
  [types.ADD_TAB] (state, tabItem) {
    console.log('add tab: ', tabItem)
    let isTabExisted = false

    state.tabs.forEach((tab) => {
      if (tab.name === tabItem.name) {
        isTabExisted = true
      }
    })
    // 不存在才加入列表中
    if (!isTabExisted) {
      state.tabs.push(tabItem)
    }
  },
  [types.REMOVE_TAB] (state, tabName) {
    console.log('remove tab: ', tabName)
    state.tabs = state.tabs.filter(tab => tab.name !== tabName)
  }
}

export default mutations
