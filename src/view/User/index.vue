<template>

  <section class='overlay'>

    <div class='userIcon'>
      <van-image
        class='icon'
        :src='ImageUrl'
        fit='contain'

      />
    </div>
    <div class='userCurrent'>
      <h2>{{ formData.username }}</h2>
      <p>欢迎用户</p>
      <van-button class='button' @click='userQuit' type='primary'>退出登录</van-button>
    </div>


  </section>

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

  .overlay {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url("@/assets/img/ios-bg.jpg");
    background-position: center;
    background-size: cover;
    height: 100%;

    .userIcon {
      font-size: 5.28vh;
      height: 11.15vh;
      width: 11.15vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 6vh;

      background-color: #D5D8DE;
      border: 0.29vh solid white;
      color: #fff;
      box-shadow: 2px 4px 11px #00000040;
      margin-top: 6vh;
      overflow: hidden;

      .icon {
        color: white;
      }
    }

    .userCurrent {

      text-align: center;

      margin-top: 4vh;

      > p {
        margin-top: 2vh;

      }

      .button {
        margin-top: 12vh;
        width: calc(100vw - 128px);
      }
    }
  }
</style>



