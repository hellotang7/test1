<template>
  <div id='app'>
      <router-view />
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
