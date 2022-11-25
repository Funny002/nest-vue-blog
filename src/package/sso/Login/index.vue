<template>
  <div class="var-login">
    <div class="var-login__header">
      header
    </div>
    <div class="var-login__body">
      <router-view key="login"/>
    </div>
    <div class="var-login__footer">
      footer
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { onMounted, reactive } from 'vue';
</script>

<style lang="scss" src="@scss/sso/login.scss"/>