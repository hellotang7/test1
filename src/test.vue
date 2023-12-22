<template>
  <div>
    <MyPicker v-model='selectedCity' :label="'城市'" :placeholder="'选择城市'" :columns='columns'  />
    <p>选择的城市是: {{ selectedCity }}</p>
  </div>
</template>

<script setup>
  import MyPicker from '@/components/CityPicker.vue';
  import { ref } from 'vue';

  const selectedCity = ref('');
  const columns = ref([
    { text: '杭州', value: 'Hangzhou' },
    { text: '宁波', value: 'Ningbo' },
    { text: '温州', value: 'Wenzhou' },
    { text: '绍兴', value: 'Shaoxing' },
    { text: '湖州', value: 'Huzhou' }
  ]);

</script>
