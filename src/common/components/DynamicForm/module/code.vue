<template>
  <el-input class="var-dynamic__code" v-model="formData[props.prop]" v-bind="bindProps" @keyup.enter="props.keyEnter">
    <template #suffix>
      <el-button text @click.stop="props.click">{{ props.codePlaceholder || '获取验证码' }}</el-button>
    </template>
  </el-input>
</template>

<script lang="ts">export default { name: 'DynamicCode', inheritAttrs: false };</script>
<script lang="ts" setup>
import { rewriteObj } from '@utils/object';
import { computed, inject } from 'vue';

interface Props {
  click?: any;
  prop: string;
  name?: string;
  keyEnter?: any;
  clearable?: boolean;
  placeholder?: string;
  codePlaceholder?: string;
}

const formData = inject<{ [name: string]: any }>('formData', {});

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入',
});

const bindProps = computed(() => rewriteObj(props, ['placeholder', 'clearable']));

const emits = defineEmits(['click']);

function onClick() {
  emits('click', props.name || props.prop);
}
</script>
<style lang="scss" scoped>
.var-dynamic__code .el-button {
  padding: 0;
  color: #999;
  height: 22px;
  font-size: 11px;
}
</style>
