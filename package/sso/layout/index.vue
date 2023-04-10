<template>
  <layout-admin class="var-admin">
    <router-view/>
  </layout-admin>
</template>

<script lang="ts">export default { name: 'Admin' };</script>
<script lang="ts" setup>
import LayoutAdmin from '@/layoutAdmin/index.vue';
</script>

<style lang="scss" src="./src/style.scss"/>
