<template>
  <el-icon v-if="data" :size="props.size" :color="props.color">
    <component :is="data"/>
  </el-icon>
</template>

<script lang="ts">export default { name: 'VarIcon' };</script>
<script lang="ts" setup>
import { reactive, shallowRef, watch } from 'vue';

const props = withDefaults(defineProps<{ size?: number; color?: string; icon?: any }>(), { size: 14 });

let data = shallowRef(props.icon);

watch(() => props, props => data = shallowRef(props.icon));
</script>
