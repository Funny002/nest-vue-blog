<template>
  <section class='var-layout__error'>
    <span class='var-layout__error--title'>404</span>找不到请求的路径，
    <el-link @click='onJumpHome'>返回首页</el-link>
  </section>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function onJumpHome() {
  router.push({ path: '/home', replace: true });
}
</script>

<style lang='scss' src='@scss/page/404.scss' />
