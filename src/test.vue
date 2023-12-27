<template>




  <van-button type="primary" @click="x = true">
   开始时间
  </van-button>

  <van-button type="primary" @click="x = true">
   结束时间
  </van-button>
  <van-picker-group
    v-show='x'
    v-model:active-tab="activeTab"
    title="预约日期"
    :tabs="['选择日期', '选择时间']"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <van-date-picker
      v-model="currentDate"
      :min-date="minDate"
      :max-date="maxDate"
    />
    <van-time-picker v-model="currentTime" />
  </van-picker-group>

  <van-picker-group
    v-show='xx'
    v-model:active-tab="activeTab"
    title="预约日期"
    :tabs="['选择日期', '选择时间']"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <van-date-picker
      v-model="currentDate"
      :min-date="minDate"
      :max-date="maxDate"
    />
    <van-time-picker v-model="currentTime" />
  </van-picker-group>





</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { closeToast, showToast } from 'vant';







  const minDate = new Date(2020, 0, 1);
  const maxDate = new Date(2025, 5, 1);

  const x = ref(false)
  const xx = ref(false)

  const activeTab = ref(0);
  const currentDate = ref(['2022', '06', '01']);
  const currentTime = ref(['12', '00']);


  const onConfirm = () => {
    showToast(`${currentDate.value.join('/')} ${currentTime.value.join(':')}`);
    console.log(`${currentDate.value.join('/')} ${currentTime.value.join(':')}`);
    x.value = false
    xx.value = false
  };




  const onCancel = () => {
    showToast('cancel');
  };
</script>
