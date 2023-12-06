<template>
  <el-input class="var-dynamic__password" type="password" show-password v-model="formData[props.prop]" v-bind="bindProps" @keyup.enter="props.keyEnter"/>
</template>

<script lang="ts">export default { name: 'DynamicPassWord', inheritAttrs: false };</script>
<script lang="ts" setup>
import { rewriteObj } from '@utils/object';
import { computed, inject } from 'vue';

interface Props {
  prop: string;
  keyEnter?: any;
  clearable?: boolean;
  placeholder?: string;
}

const formData = inject<{ [name: string]: any }>('formData', {});

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入',
});

const bindProps = computed(() => rewriteObj(props, ['placeholder', 'clearable']));
</script>
