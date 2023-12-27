<template>
  <div>
    <van-field
      v-model='fieldValue'
      is-link
      readonly
      :label='label'
      :placeholder='placeholder'
      @click='showPicker = true'
    />
    <van-popup v-model:show='showPicker' round position='bottom'>
      <van-picker
        :columns='columns'
        @cancel='onCancel'
        @confirm='onConfirm'
      />
    </van-popup>
  </div>
</template>

<script setup>
  import { ref, defineProps, defineEmits, watch } from 'vue';

  const props = defineProps(['label', 'placeholder', 'columns', 'modelValue']);
  const emit = defineEmits(['update:modelValue']);

  const fieldValue = ref(null);


  watch(() => props.modelValue, (newValue, oldValue) => {

    const options = [
      { text: '在线', value: 1 },
      { text: '离线', value: 0 },
      { text: '开', value: 'true' },
      { text: '关', value: 'false' },
      { text: 'NWD防入侵检测盒', value: 'NWD_FRQJCH' },
      { text: 'AION防入侵检测盒', value: 'AION_FRQJCH' },
      { text: 'AION播放器', value: 'AION_PLAYER' },
      { text: '黄石云摄像头', value: 'EZVIZ_CAMERA' }
    ];

    const matchingOption = options.find(option => option.value === props.modelValue);

    fieldValue.value = matchingOption ? matchingOption.text : null;


  });

  const showPicker = ref(false);

  const columns = ref([props.columns]);

  const onCancel = () => {
    showPicker.value = false;
  };

  const onConfirm = ({ selectedOptions }) => {
    showPicker.value = false;
    fieldValue.value = selectedOptions[0].text;
    emit('update:modelValue', selectedOptions[0].value);
  };
</script>
