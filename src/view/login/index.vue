<template>

  <div class='wrapper'>

    <div class='title'>管理员登录
      <div class='welcome'>Welcome</div>
    </div>

    <div class='box'></div>


    <van-form  @submit="onSubmit" ref='van-form'>
      <van-cell-group inset>
        <van-field
          v-model='formCustom.username'
          name='validator'
          label='用户名'
          placeholder='用户名'
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model='formCustom.password'
          type='password'
          name='validator'
          label='密码'
          placeholder='密码'
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style='margin: 16px;'>
        <van-button round block type='primary' native-type='submit' >
          提交
        </van-button>
      </div>
    </van-form>




  </div>
</template>

<script setup lang='ts'>
  import { useRouter } from 'vue-router';
  import {useAuthStore} from '@/stores/authStore';
  import { getCurrentInstance, onMounted, ref } from 'vue';
  import { currentUserInfo, loginUserByUsernameAndPassword } from '@/api/auth';
  import { showFailToast, showNotify, showSuccessToast } from 'vant';


  const router = useRouter();
  const { appContext: { config: { globalProperties } } } = getCurrentInstance();

  const authStore = useAuthStore();

  const formCustom = ref({
    username: '',
    password: ''
  });

  const autoLogin = ref(false)


  const onSubmit = async () => {
      loginUserByUsernameAndPassword({
        username: formCustom.value.username,
        password: formCustom.value.password
      }).then((res) => {
        if (res.data.code === 200) {
          authStore.setToken(res.data.data.token);
          localStorage.setItem('token', res.data.data.token);

          showSuccessToast(res.data.msg);
          router.push({ name: 'home' });


        } else{
          // showNotify({ type: 'danger', message: res.data.msg });
          showFailToast(res.data.msg);

          formCustom.value.username = '';
          formCustom.value.password = '';
        }
      }).catch((err) => {
        showNotify({ type: 'danger', message: err.message });
      });

  };



</script>

<style scoped lang='scss'>
  .wrapper {
    width: 100%;
    height: 100%;
    //border: 1px solid red;
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      //margin-top: -18vh;

    }

    .welcome {


    }

    .box {
      background-image: url("@/assets/img/login.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;

      width: 100%;
      height: 30vh;
      margin: 4vh 0;
      //border: 1px solid red;

    }

    .van-form {

      width: 100%;
      .van-cell.van-field{
        height: 68px;
      }
    }

  }


</style>
