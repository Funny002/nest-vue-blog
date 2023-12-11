<template>
  Home
  <themes-layout></themes-layout>
</template>

<script lang="ts">export default { name: 'Home' };</script>
<script lang="ts" setup>

import { defineAsyncComponent } from 'vue';

const ThemesName = 'default';

const ThemesLayout = defineAsyncComponent(async () => {
  const html = await fetch(`/themes/${ThemesName}/layout.html`).then(res => res.text());
  // return import(`/themes/${ThemesName}/layout.vue`);
  console.log(html);
  return { default: { template: html } };
});

</script>