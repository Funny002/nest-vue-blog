<template>
  <div style="text-align: center;">
    <div class="var-pageError__title" style="font-size: 100px; font-weight: bold;">404</div>
    <el-empty style="padding: 0;">
      <template #description>
        <div>页面丢失，您的页面不存在</div>
      </template>
    </el-empty>
  </div>
</template>

<script lang="ts">export default { name: 'PageError' };</script>
