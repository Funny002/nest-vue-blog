<template>
  <dynamic-form-item :fields="props.fields" v-if="data.component">
    <component :is="data.component" v-bind="props.fields"/>
  </dynamic-form-item>
</template>

<script lang="ts">export default { name: 'DynamicFormField', inheritAttrs: false };</script>
<script lang="ts" setup>
import { onMounted, reactive, shallowRef, watch } from 'vue';
import DynamicFormItem from './item.vue';
import * as Module from './module';
import { Fields } from '../types';

interface Props {fields: Fields;}

const props = withDefaults(defineProps<Props>(), {});

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
</script>
