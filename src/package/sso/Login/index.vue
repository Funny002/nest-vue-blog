<template>
  <div class="var-login">
    <!--    <div class="var-login__header">-->
    <!--      header-->
    <!--    </div>-->
    <div class="var-login__body">
      <router-view :key="$route.fullPath"/>
    </div>
    <!--    <div class="var-login__footer">-->
    <!--      footer-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">export default { name: 'Sign' };</script>

<style lang="scss" src="@scss/sso/login.scss"/>