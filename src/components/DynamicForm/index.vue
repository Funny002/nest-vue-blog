<template>
  <el-form ref="formRef" :model="props.modelValue" v-bind="bindAttrs">
    <el-row v-bind="getLayout">
      <template v-for="(fields, key) in props.fields">
        <el-col v-show="('show' in fields) ? fields.show : true" v-bind="rewriteObj(fields,['span', 'offset', 'push', 'pull'])">
          <dynamic-form-field :fields="fields" :key="`${key}-${fields.type}`"/>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts">export default { name: 'DynamicForm', inheritAttrs: true };</script>
<script lang="ts" setup>
import DynamicFormField from './src/field.vue';
import { computed, provide, ref } from 'vue';
import { rewriteObj } from '@utils/object';
import { Fields } from './types';

interface Props {
  fields: Fields[];
  inline?: boolean;
  disabled?: boolean;
  labelWidth?: string;
  showMessage?: boolean;
  scrollToError?: boolean;
  inlineMessage?: boolean;
  labelPosition?: 'left' | 'right';
  rules?: { [key: string]: any[] };
  modelValue: { [k: string]: any };
  //
  gutter?: number,
  align?: 'top' | 'middle' | 'bottom',
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly',
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  rules: () => ({}),
  fields: () => ([]),
  showMessage: true,
  scrollToError: true,
  labelPosition: 'right',
  modelValue: () => ({}),
});
const bindAttrs = computed(() => {
  const bindList = ['rules', 'disabled', 'labelWidth', 'labelPosition', 'scrollToError', 'showMessage', 'inner'];
  return rewriteObj(props, bindList);
});
const formRef = ref<any>(null);
const getLayout = computed(() => rewriteObj(props, ['gutter', 'justify', 'align']));

// 向下传递内容
provide('rules', computed(() => props.rules));
provide('formData', computed(() => props.modelValue));

defineExpose({ ref: computed(() => formRef.value) });
</script>
