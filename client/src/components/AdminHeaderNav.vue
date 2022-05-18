<template>
  <div class="var-adminHeaderNav">
    <el-button class="var-adminHeaderNav--btn" :icon="DArrowLeft"/>
    <div class="var-adminHeaderNav__content"></div>
    <el-button class="var-adminHeaderNav--btn" :icon="DArrowRight"/>
    <el-dropdown>
      <el-button class="var-adminHeaderNav--btn" :icon="MoreFilled"/>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="ArrowRight">关闭右侧</el-dropdown-item>
          <el-dropdown-item :icon="ArrowLeft">关闭左侧</el-dropdown-item>
          <el-dropdown-item :icon="Close" divided>全部关闭</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLeft, ArrowRight, Close, DArrowLeft, DArrowRight, MoreFilled } from '@element-plus/icons-vue';

interface Props {
}

const props = defineProps<Props>();

</script>

<style lang="scss" src="@scss/components/AdminHeaderNav.scss"/>