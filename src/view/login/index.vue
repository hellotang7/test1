<template>

  <div class='wrapper'>
    <div class='title'>管理员登录

      <div class='welcome'>Welcome</div>
    </div>

    <div class='box'></div>


    <van-form ref='form'>
      <van-cell-group inset>
        <van-field
          v-model='formCustom.username'
          name='用户名'
          label='用户名'
          placeholder='用户名'
          :rules="[{ required: true, message: '请填写用户名' }]"
          @keyup.enter='login(form)'
        />
        <van-field
          v-model='formCustom.password'
          type='password'
          name='密码'
          label='密码'
          placeholder='密码'
          :rules="[{ required: true, message: '请填写密码' }]"
          @keyup.enter='login(form)'
        />
      </van-cell-group>
      <div style='margin: 16px;'>
        <van-button round block type='primary' native-type='submit' @click='login(form)'>
          提交
        </van-button>
      </div>
    </van-form>


  </div>
</template>

<script setup lang='ts'>
  import { useRouter } from 'vue-router';
  // import {useAuthStore} from '@/stores/authStore';
  import { getCurrentInstance, ref } from 'vue';
  import { loginUserByUsernameAndPassword } from '@/api/auth';
  // import {Message} from 'view-ui-plus';
  // import request from '@/api/request';
  // import {loginUserByUsernameAndPassword} from '@/api/auth';

  const router = useRouter();
  const { appContext: { config: { globalProperties } } } = getCurrentInstance();

  // const authStore = useAuthStore();

  const formCustom = ref({
    username: '',
    password: ''
  });


  const ruleInline = {
    username: [
      { required: true, message: '请填写用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请填写密码', trigger: 'blur' }

    ]
  };

  // const autoLogin = ref(false)

  const form = ref();
  const login = async () => {


          loginUserByUsernameAndPassword({
            username: formCustom.value.username,
            password: formCustom.value.password
          }).then((res) => {
            if (res.data.code === 200) {
              authStore.setToken(res.data.data.token);
              localStorage.setItem('token', res.data.data.token);

              Message.success(res.data.msg);
              console.log(res.data);

              router.push({ name: 'desktop' });
            } else {
              Message.error(res.data.msg);
              formCustom.value.username = '';
              formCustom.value.password = '';
            }
          }).catch((err) => {
            Message.error(err.message);

          });

  };

</script>

<style scoped lang='scss'>
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      margin-top: -18vh;

    }

    .box {
      background-image: url("@/assets/img/login.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;

      width: 100%;
      height: 30vh;
      margin: 4vh 0;
    }

    .welcome {
    }

    .van-form {
      width: 100%;
      .van-cell.van-field{
        height: 68px;
      }
    }

  }

  //.wrapper {
  //  z-index: 100;
  //  top: 0;
  //  left: 0;
  //  width: 100%;
  //  height: 100%;
  //  background-color: rgba(0, 0, 0, .7);
  //  transition: opacity 0.3s ease;
  //
  //  display: inline-flex;
  //  justify-content: center;
  //  align-items: center;
  //}
  //
  //.main-container {
  //  width: 100vw;
  //  height: 100vh;
  //  background-image: url("@/assets/img/bmg.jpg");
  //  background-size: cover;
  //  background-repeat: no-repeat;
  //
  //
  //  .login-box {
  //    padding: 40px;
  //    display: flex;
  //    width: 800px;
  //    height: 460px;
  //    background-color: white;
  //    border-radius: 12px;
  //    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  //
  //    .box-left {
  //      background-image: url("@/assets/img/login.png");
  //      background-repeat: no-repeat;
  //      background-size: contain;
  //      background-position: center;
  //
  //      width: 50%;
  //      height: 100%;
  //      color: #F5F5F5;
  //
  //    }
  //
  //    .box-right {
  //      padding: 40px;
  //      width: 50%;
  //      height: 100%;
  //      color: #F5F5F5;
  //      display: flex;
  //      flex-direction: column;
  //      justify-content: center;
  //      align-items: center;
  //
  //      .welcome {
  //        text-align: center;
  //        color: black;
  //      }
  //
  //      .zh {
  //        font-size: 30px;
  //        font-weight: 400;
  //      }
  //
  //      .ivu-form {
  //        padding-top: 30px;
  //        width: 340px;
  //
  //        .ivu-form-item {
  //          &:nth-child(4) {
  //            margin-top: 40px;
  //          }
  //        }
  //      }
  //
  //    }
  //
  //  }
  //}
</style>
