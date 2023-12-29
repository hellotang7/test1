<template>
  <div id='app' :style="{ height: appHeight }">
      <router-view />
  </div>
</template>

<script lang='ts' setup>
  import { ref, onMounted } from 'vue';

  //自动计算高度
  const appHeight = ref('100vh');
  onMounted(() => {
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
  });

  function setViewportHeight() {
    const viewportHeight = window.innerHeight;
    appHeight.value = `${viewportHeight}px`;
  }
</script>

<style scoped lang='scss'>


</style>
