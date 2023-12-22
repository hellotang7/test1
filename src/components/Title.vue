<template>
  <van-nav-bar
    :title="title"
    :left-text="Back ? '返回' : null"
    :left-arrow="Back"
    @click-left="goBack"
  />
</template>

<script setup lang='ts'>
  import { useRouter } from 'vue-router';

  const router = useRouter()

  defineProps({
    title:{
      type:String,
      default:'首页'
    },
    Back:{
      type:Boolean,
      default:true
    },
  });
  const goBack = () => {
    router.go(-1); // 返回上一页
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
