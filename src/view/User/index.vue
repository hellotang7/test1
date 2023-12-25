<template>
  <div class="user">
    <h1>个人中心</h1>
    <van-button @click="userQuit" type="primary">退出登录</van-button>


  </div>
  <Nav/>

</template>

<script lang="ts" setup>
  import Nav from '@/components/Navbar.vue'
  import { useAuthStore } from '@/stores/authStore';
  import { currentUserInfo, logout } from '@/api/auth';
  import router from '@/router';
  import { showFailToast, showSuccessToast } from 'vant';
  import { onMounted } from 'vue';

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


  const userQuit = async () => {
    const isAuthenticated = localStorage.getItem('Authenticated')

    console.log(isAuthenticated);
    if (isAuthenticated) {
      logout().then((res) => {
        router.push({name: 'login'});
        useAuthStore().clearUserInfo();

        showSuccessToast(res.data.msg);



      });
    } else {
      useAuthStore().clearUserInfo();
      showFailToast('已退出，请勿频繁点击');
      router.push({name: 'login'});
    }
  };


</script>

<style lang="scss">
  .user{
    height: 100%;
    background-image: url("@/assets/img/ios-bg.jpg");
    background-position: center;
    background-size: cover;
display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &::before {
      content: "";
      position: absolute; /* 一定要用绝对定位 */
      width: 100%;
      height: 100%;
      backdrop-filter: blur(3px); /* 模糊半径 */
    }
  }
</style>



