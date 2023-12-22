<template>
  <div>
    <van-field
      v-model="fieldValue"
      is-link
      readonly
      :label="label"
      :placeholder="placeholder"
      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script setup>
  import { ref, defineProps, defineEmits } from 'vue';

  const props = defineProps(['label', 'placeholder','columns']);
  const emit = defineEmits(['update:modelValue']);

  const fieldValue = ref('');
  const showPicker = ref(false);

  const columns = ref([props.columns]);

  const onCancel = () => {
    showPicker.value = false;
  };

  const onConfirm = ({ selectedOptions }) => {
    fieldValue.value = selectedOptions[0].text;
    showPicker.value = false;
    emit('update:modelValue', selectedOptions[0].value);
  };
</script>
