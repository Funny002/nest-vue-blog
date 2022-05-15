<template>
  <el-config-provider size="small" :locale="config.locale" :button="config.button">
    <router-view/>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Zh_Cn from 'element-plus/es/locale/lang/zh-cn';

const config = reactive({
  locale: ref(Zh_Cn),
  button: reactive({
    autoInsertSpace: true,
  }),
})
</script>

<style lang='css' src='@scss/bootstrap-icons.css'/>
