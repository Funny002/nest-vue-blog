<template>
  <el-form :model="props.modelValue" :rules="props.rules">
    <dynamic-form-field v-for="fields in props.fields" :fields="fields"/>
  </el-form>
</template>

<script lang="ts">export default { name: 'DynamicForm' };</script>
<script lang="ts" setup>
import DynamicFormField from './src/field.vue';
import { computed, provide } from 'vue';
import { Fields } from './types';

interface Props {
  fields: Fields[],
  rules?: { [key: string]: any[] },
  modelValue: { [k: string]: any };
}

const props = withDefaults(defineProps<Props>(), {
  rules: () => ({}),
  fields: () => ([]),
  modelValue: () => ({}),
});

// 向下传递内容
provide('rules', computed(() => props.rules));
provide('formData', computed(() => props.modelValue));
</script>
