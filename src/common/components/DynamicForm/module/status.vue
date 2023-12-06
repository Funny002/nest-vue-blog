<template>
  <el-switch class="var-dynamic__status" v-model="formData[props.prop]" size="default" v-bind="bindProps" @change="onChange"/>
</template>

<script lang="ts">export default { name: 'DynamicStatus', inheritAttrs: false };</script>
<script lang="ts" setup>
import { rewriteObj } from '@utils/object';
import { computed, inject } from 'vue';

interface Props {
  prop: string;
  loading?: boolean;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  inlinePrompt?: boolean;
  width?: string | number;
  change?: (state: boolean) => void;
  activeValue?: boolean | string | number;
  inactiveValue?: boolean | string | number;
}

const formData = inject<{ [name: string]: any }>('formData', {});

const props = withDefaults(defineProps<Props>(), {
  width: 50,
  activeText: 'on',
  activeValue: true,
  inlinePrompt: true,
  inactiveText: 'off',
  inactiveValue: false,
});

const bindList: string[] = ['width', 'disabled', 'loading', 'activeText', 'inactiveText', 'inlinePrompt', 'activeValue', 'inactiveValue'];

const bindProps = computed(() => rewriteObj(props, bindList));

const onChange = () => () => props.change && props.change(formData[props.prop]);
</script>

<style>
.var-dynamic__status {
  height: 24px;
}
</style>
