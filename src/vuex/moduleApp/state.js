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
          icon: 'el-icon-tickets',
          title: '发圈',
          role: 'Circle_Bursting',
          subItems: [
              {
              name: 'Bursting',
              title: '每日爆款'
              },
              {
                  name: 'Source',
                  title: '宣传素材'
              },
              {
                  name: 'School',
                  title: '细银学堂'
              }]
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
  tabComponents: ['Welcome', 'Area', 'Circle','Bursting','Source','School','AdminUserList']
}

export default state