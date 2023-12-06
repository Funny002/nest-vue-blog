<template>
  <el-tree-select class="var-dynamic__selectTree" v-model="formData[props.prop]" v-bind="bindProps" @change="onChange" :data="props.options"/>
</template>

<script lang="ts">export default { name: 'DynamicSelect', inheritAttrs: false };</script>
<script lang="ts" setup>
import { rewriteObj } from '@utils/object';
import { computed, inject } from 'vue';

interface Props {
  props?: any;
  prop: string;
  keyEnter?: any;
  multiple?: boolean;
  disabled?: boolean;
  filterable?: boolean;
  clearable?: boolean;
  placeholder?: string;
  collapseTags?: boolean;
  multipleLimit?: number;
  defaultFirstOption?: boolean;
  change?: (value: any) => void;
  filterMethod?: (value: any) => void;
  options?: { label: string; value: any }[];
}

const formData = inject<{ [name: string]: any }>('formData', {});

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择',
  options: () => [],
});

const bindList = ['multiple', 'disabled', 'clearable', 'collapseTags', 'multipleLimit', 'placeholder', 'filterable', 'filterMethod', 'defaultFirstOption', 'props'];

const bindProps = computed(() => rewriteObj(props, bindList));

const onChange = () => props.change && props.change(formData[props.prop]);
console.log(props);
</script>

<style lang="scss">
.var-dynamic__selectTree {
  width: 100%;
}
</style>
