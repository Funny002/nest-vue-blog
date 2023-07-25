<template>
  <el-select class="var-dynamic__select" v-model="formData[props.prop]" v-bind="bindProps" @change="onChange">
    <el-option v-for="item of props.options" v-bind="item"/>
  </el-select>
</template>

<script lang="ts">export default { name: 'DynamicSelect', inheritAttrs: false };</script>
<script lang="ts" setup>
import { rewriteObj } from '@utils/object';
import { computed, inject } from 'vue';

interface Props {
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

const bindList = ['multiple', 'disabled', 'clearable', 'collapseTags', 'multipleLimit', 'placeholder', 'filterable', 'filterMethod', 'defaultFirstOption'];

const bindProps = computed(() => rewriteObj(props, bindList));

const onChange = () => props.change && props.change(formData[props.prop]);
</script>

<style lang="scss">
.var-dynamic__select {
  width: 100%;
}
</style>
