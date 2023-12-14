<template>


    <van-row :gutter='[20, 20]'>
      <van-col span='6'>
        <Icon appName='设备管理' iconSrc='icon-xiangmuguanli' />
      </van-col>
      <van-col span='6'>
        <Icon appName='播放' iconSrc='icon-dianshiju-copy-copy-copy' />
      </van-col>
      <van-col span='6'>
        <Icon appName='监控' iconSrc='icon-jiankong-copy' />
      </van-col>

    </van-row>




</template>

<script setup lang='ts'>


</script>

<style lang='scss' scoped>


  .van-row {
    border: 1px solid red;
    height: 100%;
    //background-image: url("@/assets/img/desktopWallpaper.jpg");
    overflow: hidden;
    background-position: center;
    background-size: cover;
    padding: 20px  20px  80px  20px;
  }


</style>
