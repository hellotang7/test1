<template>
  <div class='app-icon' @click='handleClick(appName)' @touchstart='handleMouseDown' @touchend='handleMouseUp'>
    <div class='icon-container'>
      <van-icon :name="name" />
<!--      <i class="aion-window-icon" :class='iconSrc'></i>-->
    </div>
    <div class='label'>{{ appName }}</div>
  </div>
</template>

<script setup lang='ts'>

  defineProps({
    appName: String,
    name: String,
  });

  const handleClick = (appName) => {
    // 处理图标点击事件

    console.log(appName ? `打开应用: ${appName}`:'切换了nav');
  };

  const handleMouseDown = () => {
    // 处理图标按下效果
    const iconContainer = document.querySelector('.icon-container');
    if (iconContainer) {
      iconContainer.classList.add('pressed');
    }
  };

  const handleMouseUp = () => {
    // 处理图标抬起效果
    const iconContainer = document.querySelector('.icon-container');
    if (iconContainer) {
      iconContainer.classList.remove('pressed');
    }
  };
</script>

<style scoped lang='scss'>
  .pressed {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 0.8), inset 18px 18px 48px rgba(0, 0, 0, 0.1), inset 0px 4px 30px rgb(255, 255, 255);

    transition: all .2s ease-out;
  }

  .app-icon {
    text-align: center;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    .icon-container {
      width: 58px;
      height: 58px;
      border-radius: 15px;
      overflow: hidden;
      margin-bottom: 5px;
      //box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #00F9E5, #6772FF);
      //.aa{
      //  border-radius: 10px;
      box-shadow: 18px 19px 27px rgba(0, 0, 0, 0.2), -2px -9px 110px rgb(243, 255, 255);

      &:hover {
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 0.8), inset 18px 18px 48px rgba(0, 0, 0, 0.1), inset 0px 4px 30px rgb(255, 255, 255);
        transition: all .2s ease-out;
        }
      //}

      .van-icon {
        font-size: 38px;
        color: #e9edf0;
      }
    }

    .label {
      font-size: 14px;
      color: #fff;
    }

  }
</style>
