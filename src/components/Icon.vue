<template>
  <div class='app-icon' @click='handleClick(appName)' @mousedown.prevent='handleMouseDown' @mouseup.prevent='handleMouseUp'>
    <div class='icon-container'>
      <i class="aion-window-icon" :class='iconSrc'></i>
    </div>
    <div class='label'>{{ appName }}</div>
  </div>
</template>

<script setup lang='ts'>

  defineProps({
    appName: String,
    iconSrc: String,
  });

  const handleClick = (appName) => {
    // 处理图标点击事件
    console.log(`打开应用: ${appName}`);
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
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    transform: translateY(2px);
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
      width: 68px;
      height: 68px;
      border-radius: 15px;
      overflow: hidden;
      margin-bottom: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      .aion-window-icon {
        font-size: 40px;
        //width: 100%;
        //height: 100%;
        //object-fit: cover;
      }
    }

    .label {
      font-size: 14px;
      color: #333;
    }

  }
</style>
