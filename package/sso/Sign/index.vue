<template>
  <layout class="var-sign" type="flex">
    <router-view/>
  </layout>
</template>

<script lang="ts">export default { name: 'Sign' };</script>
<script lang="ts" setup>
import Layout from '@/layout/index.vue';
</script>

<style lang="scss" src="./src/style.scss"/>
