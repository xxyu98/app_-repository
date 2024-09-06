export default defineAppConfig({
  pages: ['pages/home/index', 'pages/profile/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'APP',
    navigationBarTextStyle: 'black',
    backgroundColorTop: '#b1a7f2',
    backgroundColor: '#ffffff',
  },
  tabBar: {
    color: '#c6cad4',
    selectedColor: '#6957f0',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'images/tabbar/home.png',
        selectedIconPath: 'images/tabbar/home_on.png',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'images/tabbar/profile.png',
        selectedIconPath: 'images/tabbar/profile_on.png',
      },
    ],
  },
});
