<template>
  <div class="var-sign__login">
    <div class="var-sign__login--title">登录</div>
    <div class="var-sign__login--left">
      <qr-code value="扫码" description="使用App扫码进行登录"/>
    </div>
    <div class="var-sign__login--right">
      <dynamic-form :fields="data.fields" v-model="data.formData"/>
      <div class="">
        <el-button type="text" style="padding-left: 0; padding-right: 0;">验证码登录</el-button>
      </div>
      <el-button type="primary" style="width: 100%;">登录</el-button>
      <div class="">
        <el-button type="text">注册</el-button>
        <el-button type="text">忘记密码</el-button>
        <el-dropdown>
          <span class="el-dropdown-link">第三方登录</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'SignLogin' };</script>
<script lang="ts" setup>
import QrCode from '@models/QrCode/index.vue';
import DynamicForm from '@models/DynamicForm/index.vue';
import { useRoute } from 'vue-router';
import { reactive } from 'vue';

const route = useRoute();
const data = reactive<any>({
  fields: [
    { label: '', prop: 'user', type: 'input' },
    { label: '', prop: 'pass', type: 'input' },
  ],
  formData: {},
});
console.log(route);
</script>
