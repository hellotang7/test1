<template>
  <van-nav-bar
    :title="dynamicTitle"
    :left-text="leftText"
    :right-text="rightText"
    :left-arrow="showLeftArrow"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<script setup>
  import { showToast } from 'vant';
  import { computed } from 'vue';

  const props = defineProps(['leftArrow', 'dynamicTitle', 'showLeftButton', 'showRightButton','RightButtonText']);
  const emits = defineEmits(['click-right']);

  console.log(props.dynamicTitle);
  // 根据 props 中的值来动态设置相应的属性
  const showLeftArrow = computed(() => props.showLeftButton);
  const leftText = computed(() => (props.showLeftButton ? '返回' : ''));
  const rightText = computed(() => (props.showRightButton ? props.RightButtonText : ''));

  const onClickLeft = () => history.back();
  const onClickRight = () => {
    emits('click-right');
  };
</script>


<style lang='scss' scoped>
  .van-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;

  }

</style>
