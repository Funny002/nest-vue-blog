<template>
  <el-input class="var-dynamic__text"  v-model="formData[props.prop]" v-bind="bindProps"/>
</template>

<script lang="ts">export default { name: 'DynamicText', inheritAttrs: false };</script>
<script lang="ts" setup>
import { rewriteObj } from '@utils/object';
import { computed, inject } from 'vue';

interface Props {
  prop: string;
  clearable?: boolean;
  placeholder?: string;
}

const formData = inject('formData');

const props = withDefaults(defineProps<Props>(), {});

const bindProps = computed(() => rewriteObj(props, ['placeholder', 'clearable']));
</script>
