const state = {
  loginUserId: '',
  // 菜单项
  menuList: [{
      name: 'welcome',
      icon: 'el-icon-d-arrow-right',
      title: '首页'
    },
    // {
    //   name: 'MenuManagement',
    //   icon: 'el-icon-tickets',
    //   title: '栏目管理',
    //   subItems: [{
    //     name: 'MenuList',
    //     icon: 'el-icon-check',
    //     title: '栏目列表'
    //   }]
    // }, 
    {
      name: 'Area',
      icon: 'el-icon-d-arrow-right',
      title: '细银专区'
    },
    {
      name: 'Circle',
      icon: 'el-icon-d-arrow-right',
      title: '发圈'
    },
    {
      name: 'AdminUserManagement',
      icon: 'el-icon-tickets',
      title: '后台用户管理',
      role: 'SUPPER_ADMIN',
      subItems: [{
        name: 'AdminUserList',
        // icon: 'el-icon-check',
        title: '后台用户列表'
      }]
    }
  ],
  tabs: [],
  tabComponents: ['Welcome', 'Area', 'Circle', 'AdminUserList']
}

export default state