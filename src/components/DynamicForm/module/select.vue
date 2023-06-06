<template>
  <el-select class="var-dynamic__select" v-model="formData[props.prop]" v-bind="bindProps">
    <!--    <el-option></el-option>-->
  </el-select>
</template>

<script lang="ts">export default { name: 'DynamicSelect', inheritAttrs: false };</script>
<script lang="ts" setup>
import { rewriteObj } from '@utils/object';
import { computed, inject } from 'vue';

interface Props {
  prop: string;
  keyEnter?: any;
  clearable?: boolean;
  placeholder?: string;
}

const formData = inject('formData');

const props = withDefaults(defineProps<Props>(), {});

const bindList = ['multiple', 'disabled', 'clearable', 'collapseTags', 'multipleLimit', 'placeholder', 'filterable', 'filterMethod', 'defaultFirstOption'];
const bindProps = computed(() => rewriteObj(props, bindList));
</script>

<style lang="scss">
.var-dynamic__select {
  width: 100%;
}
</style>
