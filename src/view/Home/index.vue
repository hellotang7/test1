<template>

  <div class='home'>
<!--    <Title title='首页' :Black='false' />-->

    <van-row :gutter='[20, 20]'>
      <van-col span='6'>

        <RouterLink to='/equipment'>
          <Icon appName='设备管理' name='newspaper-o' />
        </RouterLink>
      </van-col>

<!--      <van-col span='6'>-->
<!--        <RouterLink to='/1'>-->
<!--          <Icon appName='试验' name='warn-o' />-->
<!--        </RouterLink>-->

<!--      </van-col>-->

    </van-row>


    <Nav />
  </div>
</template>

<script setup lang='ts'>
  import Nav from '@/components/Navbar.vue';
  // import Icon from '@/components/Icon.vue'

  import { onMounted } from 'vue';
  import { currentUserInfo } from '@/api/auth';
  import { useAuthStore } from '@/stores/authStore';
  import { showFailToast } from 'vant';

  const authStore = useAuthStore();


  onMounted(() => {
    currentUserInfo()
      .then((res) => {
          if (res.data.code === 200) {
            authStore.setUserInfo(res.data.data.user);
            authStore.setAuthenticated(res.data.success);
          }
        }
      )
      .catch((error) => {
        showFailToast(error.data.msg);

      });

  });

</script>

<style lang='scss' scoped>

  .home {
    height: 100%;
    width: 100%;
    background-image: url("@/assets/img/ios-bg.jpg");
    background-position: center;
    background-size: cover;

    &::before {
      content: "";
      position: absolute; /* 一定要用绝对定位 */
      width: 100%;
      height: 100%;
      //backdrop-filter: blur(1.4px); /* 模糊半径 */
    }
  }

  .van-row {
    overflow: hidden;
    padding: 20px 20px 80px 20px;


  }


</style>
