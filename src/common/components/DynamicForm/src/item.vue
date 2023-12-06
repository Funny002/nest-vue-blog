<template>
  <el-form-item v-bind="bindProps" :style="hasShow">
    <slot/>
  </el-form-item>
</template>

<script lang="ts">export default { name: 'DynamicFormItem', inheritAttrs: false };</script>
<script lang="ts" setup>
import { rewriteObj } from '@utils/object';
import { Fields } from '../types';
import { computed } from 'vue';

interface Props {fields: Fields;}

const props = withDefaults(defineProps<Props>(), {});

const hasShow = computed(() => {
  const state = 'show' in props.fields ? props.fields.show : true;
  return { display: state ? 'flex' : 'none' };
});

const bindProps = computed(() => rewriteObj(props.fields, ['label', 'prop', 'labelWidth']));
</script>
