<template>
  <div class='EquipmentAddEdit'>
    <Title :dynamicTitle="formData.id ? '编辑设备':'添加设备'" :showLeftButton='true' :showRightButton='false' />
    <van-form @submit='onSubmit'>
      <van-cell-group inset>
        <van-field
          v-model='formData.name'
          name='密码'
          label='设备名称'
          placeholder='设备名称'
          :rules="[{ required: true, message: '必填' }]"
        />
        <van-field
          v-model='formData.no'
          name='用户名'
          label='设备编号'
          placeholder='设备编号'
          :rules="[{ required: true, message: '必填' }]"
        />


        <PopUpPicker v-model='formData.defNo'
                     :label="'设备定义'"
                     :placeholder="'选择设备定义'"
                     :columns='defNoList'
                     :showRules='true' />

      </van-cell-group>

      <div style='margin: 16px;'>
        <van-button round block type='primary' native-type='submit'>
          提交
        </van-button>
        <van-button @click='inDelete' v-if='formData.id' round block type='primary' plain>
          删除
        </van-button>
      </div>

    </van-form>


  </div>
</template>

<script setup lang='ts'>
  import { onMounted, ref } from 'vue';
  import Title from '@/components/Title.vue';
  import PopUpPicker from '@/components/PopUpPicker.vue';
  import { addIotEquipment, delById, findOneById, updateById } from '@/api/system';
  import { loading } from '@/components/isLoading';
  import { showToast } from 'vant';
  import { useRoute } from 'vue-router';

  const route = useRoute();


  const formData = ref({  //用户信息
    id: null,
    no: '',
    name: '',
    defNo: ''
  });


  const defNoList = ref([
    { text: 'NWD防入侵检测盒', value: 'NWD_FRQJCH' },
    { text: 'AION防入侵检测盒', value: 'AION_FRQJCH' },
    { text: 'AION播放器', value: 'AION_PLAYER' },
    { text: '黄石云摄像头', value: 'EZVIZ_CAMERA' }
  ]);

  const inDelete = () => {
    loading(true);
    delById('iotEquipment', { id: formData.value.id }).then((res) => {
      if (res.data.success) {
        showToast({ message: res.data.msg });

      } else {
        showToast({ message: res.data.msg });
      }
    }).catch((res) => {
      showToast({ message: res.data.msg });
    }).finally(() => {
      loading(false);
      history.back();
    });
  };

  const onSubmit = (values) => {
    loading(true);

    if (!formData.value.id) {
      console.log('新增');
      addIotEquipment('iotEquipment', {
        no: formData.value.no,
        name: formData.value.name,
        defNo: formData.value.defNo
      }).then((res) => {
        if (res.data.success) {
          showToast({ message: res.data.msg });
        } else {
          showToast({ message: res.data.msg });
        }
      }).catch((res) => {
        showToast({ message: res.data.msg });

      }).finally(() => {
        loading(false);
        history.back();

      });
    } else {
      console.log(formData.value.id);
      console.log('编辑');
      updateById('iotEquipment', {
        id: formData.value.id,
        no: formData.value.no,
        name: formData.value.name,
        defNo: formData.value.defNo
      }).then((res) => {
        if (res.data.success) {
          showToast({ message: res.data.msg });
        } else {
          showToast({ message: res.data.msg });
        }
      }).catch((res) => {
        showToast({ message: res.data.msg });
      }).finally(() => {
        loading(false);
        history.back();
      });
    }

  };

  onMounted(() => {
    const id = route.query.id;

    if (!id) {
      console.log('进入了新增');

    } else {
      loading(true);
      formData.value.id = id as any;
      console.log('进入了编辑');
      console.log(id);
      //根据id查询接口初始化数据
      findOneById('iotEquipment', { id: id }).then((res) => {
        if (res.data.success) {
          formData.value = { ...res.data.data };
          console.log(formData.value);
        }
      }).catch((res) => {
        showToast({ message: res.data.msg });
      }).finally(() => {
        loading(false);

      });
      ;
    }

  });


</script>

<style lang='scss' scoped>
  .EquipmentAddEdit {
    height: 100%;

    .van-form {
      height: 100%;
      padding-top: 58px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      :deep(.van-cell__title.van-field__label) {

        color: #111;
        font-weight: 600;
      }

      :deep(.van-cell__value.van-field__value) {
        height: 48px;
      }

      .van-button.van-button--primary.van-button--normal.van-button--plain.van-button--block.van-button--round {
        margin-top: 12px;
      }

    }
  }
</style>
