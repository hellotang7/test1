<template>
  <div class='user'>
    <div>
      <span><div><img :src='ImageUrl'></div></span>
    </div>
    <div>
      <span>用户名：</span>
      <span>{{ formData.username }}</span>
    </div>
    <div>
      <span>昵称：</span>
      <span>{{ formData.nickname }}</span>
    </div>


    <van-button @click='userQuit' type='primary'>退出登录</van-button>


  </div>
  <Nav />

</template>

<script lang='ts' setup>
  import Nav from '@/components/Navbar.vue';
  import { useAuthStore } from '@/stores/authStore';
  import { currentUserInfo, logout } from '@/api/auth';
  import router from '@/router';
  import { showFailToast, showSuccessToast } from 'vant';
  import { onMounted, ref } from 'vue';

  const ImageUrl = ref(`/api/auth/getAvatar?t=${new Date().getTime()}`);


  const formData = ref({
    username: useAuthStore().userInfo.username,
    nickname: useAuthStore().userInfo.nickName

  });


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
    const isAuthenticated = useAuthStore().isAuthenticated;

    console.log(isAuthenticated);
    if (isAuthenticated) {
      logout().then((res) => {
        router.push({ name: 'login' });
        useAuthStore().clearUserInfo();

        showSuccessToast(res.data.msg);


      });
    } else {
      useAuthStore().clearUserInfo();
      showFailToast('已退出，请勿频繁点击');
      router.push({ name: 'login' });
    }
  };


</script>

<style lang='scss'>
  .user {

    height: 100%;
    background-image: url("@/assets/img/ios-bg.jpg");
    background-position: center;
    background-size: cover;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    //border: 1px solid red;


    div{

      width: 100%;
      display: flex;
      justify-content: center;
      padding: 20px 0;
      margin-bottom: 30px;
        div{

          height: 150px;
          width: 150px;
      }
    }
  }
</style>



