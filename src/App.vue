<template>
  <div id='app'>
<!--    <van-nav-bar-->
<!--      title="首页"-->
<!--    />-->
<!--    <div class='desktop'>-->
      <router-view />
<!--    </div>-->


<!--    <van-tabbar route>-->
<!--      <van-tabbar-item replace to='/home' icon='home-o'>首页</van-tabbar-item>-->
<!--      <van-tabbar-item replace to='/user' icon='user-o'>个人中心</van-tabbar-item>-->
<!--    </van-tabbar>-->

  </div>
</template>

<style lang='scss'>
  #app {
    width: 100vw;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    .desktop {
      height: calc(100vh - 50px);
    }
  }

  body {
    /*font-size: 16px;*/
    /*background-color: #f8f8f8;*/
    /*-webkit-font-smoothing: antialiased;*/
  }
</style>
