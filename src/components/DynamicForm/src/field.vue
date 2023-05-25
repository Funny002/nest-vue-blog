<template>
  <el-form-item v-if="data.component" v-bind="bindProps" :style="hasShow">
    <component :is="data.component" v-bind="props.fields" @click="onClick"/>
  </el-form-item>
</template>

<script lang="ts">export default { name: 'DynamicFormField', inheritAttrs: false };</script>
<script lang="ts" setup>
import { computed, onMounted, reactive, shallowRef, watch } from 'vue';
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

const data = reactive({ component: undefined, keys: '' });

function setComponent() {
  if ('type' in props.fields) {
    data.keys = props.fields.type as string;
    const component = (Module as { [K: string]: any })[data.keys];
    if (component) {
      data.component = shallowRef(component);
      return true;
    }
  }
  data.component = undefined;
  return false;
}

watch(() => props, props => {
  if (props.fields.type !== data.keys) setComponent();
}, { deep: true });

onMounted(() => setComponent());

const emits = defineEmits(['click']);

function onClick(...args: any[]) {
  emits('click', ...args);
}
</script>
