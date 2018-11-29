<template>
<div id="app">
  <router-view v-wechat-title="$route.meta.title" img-set="/static/img/logo.png" />
</div>
</template>

<script>
// import axios from 'axios'
// import API from './api/api'
// import router from './router'

import './assets/css/app.less'

export default {
  name: 'app',
  created: function () {
    this.init()
    this.tabComponents.forEach(tabComp => {
      this.$options.components[tabComp] = () => import(`./views/${tabComp}.vue`)
    })
  },
  data() {
    return {
      subMenuItemCls: 'custom-sub-item',
      activeTabsValue: '',
      activeMenuItemName: this.$route.name,
      isTabClosable: true
      // adminName:localStorage.getItem('AdmInCookies'),
    }
  },
  watch: {
    tabs: function () {
      // tab只有一页的时候禁止删除
      if (this.tabs.length > 1) {
        this.isTabClosable = true
      } else {
        this.isTabClosable = false
      }
    }
  },
  computed: {
    isFullPage: {
      get() {
        return this.$store.getters.isFullPage
      }
    },
    menuList: {
      get() {
        return this.$store.getters.menuList
      }
    },
    tabs: {
      get() {
        return this.$store.getters.tabs
      }
    },
    tabComponents: {
      get() {
        return this.$store.getters.tabComponents
      }
    },
    loginUserId: {
      get() {
        return this.$store.getters.loginUserId
      }
    }
  },
  methods: {
    init() {
      // 设置默认tab
      if (this.menuList && this.menuList.length > 0) {
        let defaultTab = null

        this.menuList.forEach((menu) => {
          if (menu.name === this.activeMenuItemName) {
            defaultTab = menu
          }
          // 遍历子菜单
          const subItems = menu.subItems
          subItems && subItems.forEach((subMenu) => {
            if (subMenu.name === this.activeMenuItemName) {
              defaultTab = subMenu
            }
          })
        })
        // 如果没有选中的tab，则默认选择第一个
        if (!defaultTab) {
          if (this.menuList[0].subItems && this.menuList[0].subItems.length > 0) {
            defaultTab = this.menuList[0].subItems[0]
          } else {
            defaultTab = this.menuList[0]
          }
        }

        this.$store.dispatch('resetTabs', {
          tabItem: defaultTab
        })
        this.activeTabsValue = defaultTab.name
      }
    },
    addTab(tabName) {
      const menuList = this.menuList

      menuList.forEach((menu) => {
        if (menu.name === tabName) {
          // 一级菜单
          this.$store.dispatch('addTab', {
            tabItem: menu
          })
          // 跳转到指定页
          this.changeToPage(tabName)
        } else {
          // 二级菜单
          if (menu.subItems) {
            let subMenuList = menu.subItems
            subMenuList.forEach((subMenu) => {
              if (subMenu.name === tabName) {
                this.$store.dispatch('addTab', {
                  tabItem: subMenu
                })
                // 跳转到指定页
                this.changeToPage(tabName)
              }
            })
          }
        }
      })
    },
    removeTab(tabName) {
      let tabs = this.tabs
      let activeName = this.activeTabsValue

      if (activeName === tabName) {
        tabs.forEach((tab, index) => {
          if (tab.name === tabName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.changeToPage(activeName)
      this.$store.dispatch('removeTab', {
        tabName: tabName
      })
    },
    /*
     * 跳转到指定name的页面
     * 
     */
    changeToPage(name) {
      this.activeTabsValue = name
      this.activeMenuItemName = name
    },
    /*
     * 菜单项选中事件
     * key-当前key, 跟路由里面的name要一一对应 keyPath-自己和父层级的key
     * */
    handleMenuSelect(key, keyPath) {
      console.log(key, keyPath)
      if (key === this.activeTabsValue) {
        //选中的菜单项没有变化
        return
      }
      //添加至tab
      this.addTab(key)
    },
    tabClick(tab) {
      console.log("tabClick tab: ", tab.name)
      this.changeToPage(tab.name)
    },
    loginOut() {
      // 退出登录
      // axios.get(API.Logout)
      //localStorage.removeItem('AdmInCookies')
      this.$store.dispatch('setLoginUserId', {
        loginUserId: ''
      })
      this.$message({
        'message': '您已安全退出登录',
        'type': 'success'
      })
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<style lang="less">
.custom-sub-item {
  background: #444 !important;
}
</style>
