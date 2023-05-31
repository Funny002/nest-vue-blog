<template>
  <el-form ref="formRef" :model="props.modelValue" :rules="props.rules">
    <el-row v-bind="getLayout">
      <template v-for="(fields, key) in props.fields">
        <el-col v-show="('show' in fields) ? fields.show : true" v-bind="rewriteObj(fields,['span', 'offset', 'push', 'pull'])">
          <dynamic-form-field :fields="fields" :key="`${key}-${fields.type}`"/>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts">export default { name: 'DynamicForm', inheritAttrs: false };</script>
<script lang="ts" setup>
import DynamicFormField from './src/field.vue';
import { rewriteObj } from '@utils/object';
import { computed, provide, ref } from 'vue';
import { Fields } from './types';

interface Props {
  fields: Fields[],
  rules?: { [key: string]: any[] },
  modelValue: { [k: string]: any };
  //
  gutter?: number,
  align?: 'top' | 'middle' | 'bottom',
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly',
}

const props = withDefaults(defineProps<Props>(), {
  rules: () => ({}),
  fields: () => ([]),
  modelValue: () => ({}),
});

const formRef = ref<any>(null);
const getLayout = computed(() => rewriteObj(props, ['gutter', 'justify', 'align']));

// 向下传递内容
provide('rules', computed(() => props.rules));
provide('formData', computed(() => props.modelValue));

defineExpose({ ref: computed(() => formRef.value) });
</script>
