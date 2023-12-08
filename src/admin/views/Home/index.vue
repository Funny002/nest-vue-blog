<template>
  Home
  {{ data.icon}}
  <bootstrap-icon-select v-model="data.icon"/>
</template>

<script lang="ts">export default { name: 'Home' };</script>
<script lang="ts" setup>
import { BootstrapIconSelect } from '@plugins/bootstrap-icon';
import { reactive } from 'vue';

const data = reactive({
  icon: '',
});
</script>
