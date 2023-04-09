<template>
  <el-form-item v-if="data.component" v-bind="bindProps" :style="hasShow">
    <component :is="data.component" v-bind="props.fields" @click="onClick"/>
  </el-form-item>
</template>

<script lang="ts">export default { name: 'DynamicFormField' };</script>

<script lang="ts" setup>
import { computed, reactive, shallowRef } from 'vue';
import { rewriteObj } from '@utils/object';
import * as Module from './module';
import { Fields } from '../types';

interface Props {fields: Fields;}

const props = withDefaults(defineProps<Props>(), {});

const hasShow = computed(() => {
  const state = 'show' in props.fields ? props.fields.show : true;
  return { display: state ? 'block' : 'none' };
});

const bindProps = computed(() => rewriteObj(props.fields, ['label', 'prop', 'labelWidth']));

const data = reactive({ component: undefined });

const type = props.fields.type || '';

const module = (Module as { [k: string]: any })[type];

if (module) data.component = shallowRef(module);

const emits = defineEmits(['click']);

function onClick(...args: any[]) {
  emits('click', ...args);
}
</script>
