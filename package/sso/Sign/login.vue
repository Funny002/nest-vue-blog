<template>
  <div class="var-sign__login">
    <div class="var-sign--title">登录</div>
    <div class="var-sign__login--body">
      <div class="var-sign__login--left">
        <qr-code value="使用App扫码进行登录" :expires="1" description="使用App扫码进行登录" @click="onQrCode"/>
      </div>
      <div class="var-sign__login--line"></div>
      <div class="var-sign__login--right">
        <dynamic-form :fields="data.fields" v-model="data.formData"/>
        <div style="padding-bottom: 10px">
          <el-button v-if="!data.hasCode" text @click="onSwitchCode">验证码登录</el-button>
          <el-button v-else text @click="onSwitchCode">密码登录</el-button>
        </div>
        <el-button type="primary" style="width: 100%;">登录</el-button>
        <div class="var-sign__login--tools">
          <el-button text @click="onRegister">注册</el-button>
          <el-button text>忘记密码</el-button>
          <el-dropdown>
            <el-button text>第三方登录</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>QQ</el-dropdown-item>
                <el-dropdown-item>GitHub</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'SignLogin' };</script>
<script lang="ts" setup>
import QrCode from '@models/QrCode/index.vue';
import DynamicForm from '@models/DynamicForm/index.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';

const route = useRoute();
const routes = useRouter();
const data = reactive<any>({
  fields: [
    { prop: 'user', type: 'text', placeholder: '邮箱/账号名' },
    { show: true, prop: 'pass', type: 'password', placeholder: '密码' },
    { show: false, prop: 'pass', type: 'code', placeholder: '验证码', codePlaceholder: '获取验证码', click: 'code' },
  ],
  formData: {},
  hasCode: true,
});

function onSwitchCode() {
  data.hasCode = !data.hasCode;
  data.fields[1].show = !data.fields[1].show;
  data.fields[2].show = !data.fields[2].show;
}

function onQrCode() {
  console.log('刷新二维码');
}

function onRegister() {
  routes.push({ path: '/sign/register' });
}
</script>
