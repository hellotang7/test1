<script setup lang="ts">
  import { getCurrentInstance, inject, onMounted, onUnmounted, shallowRef } from "vue";
  import EZUIKit from 'ezuikit-js';
  import { getEzvizLive } from "@/api/iotEquipment";
  import { useRoute } from 'vue-router';


 const route = useRoute()

  // const EZUIKitPlayer = shallowRef({
  //   player:null
  // });

  onMounted(()=>{
    const no = route.query.no;
    getEzvizLive(no as any).then((res)=>{
      if(res.data.success){
        // alert( res.data.data.url)
        // alert( res.data.data.accessToken)
        const EZUIKitPlayer = new EZUIKit.EZUIKitPlayer({
          id: `ezuikit-player`,
          url: res.data.data.url,
          accessToken:res.data.data.accessToken,
        })
      }
    })
  })

  // onUnmounted(()=>{
  //   console.info(EZUIKitPlayer.value.player.stop());
  // })
  //
  // const handleResize = (dom:HTMLElement) => {
  //   EZUIKitPlayer.value.player.reSize(dom.clientWidth,dom.clientHeight)
  // }
</script>

<template>
  <div class="main-content" >
    <div id="ezuikit-player"></div>
  </div>
</template>

<style scoped lang="scss">
  .main-content{
    display: inline-block;
    width: 100%;
    height: 100%;

    #ezuikit-player{
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
</style>
