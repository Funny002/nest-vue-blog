<template>
  <div class="var-sign__login">
    <div class="var-sign--title">登录</div>
    <div class="var-sign__login--body">
      <div class="var-sign__login--left">
        <qr-code value="使用App扫码进行登录使用App扫码进行登录" :options="{width: 120}" :expires="1" description="使用App扫码进行登录" @click="onQrCode"/>
      </div>
      <div class="var-sign__login--line"></div>
      <div class="var-sign__login--right" v-loading="data.load">
        <dynamic-form ref="formRef" :fields="data.fields" :rules="data.rules" v-model="data.formData" @code="onDevelop" a="x"/>
        <div style="padding-bottom: 10px">
          <el-button v-if="data.hasCode" text @click="onSwitchCode">验证码登录</el-button>
          <el-button v-else text @click="onSwitchCode">密码登录</el-button>
        </div>
        <el-button type="primary" style="width: 100%;" @click="onSubmit">登录</el-button>
        <div class="var-sign__login--tools">
          <el-button text @click="onRegister">注册</el-button>
          <el-button text @click="onDevelop">忘记密码</el-button>
          <el-dropdown @command="onDevelop">
            <el-button text>第三方登录</el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="qq">QQ</el-dropdown-item>
                <el-dropdown-item command="github">GitHub</el-dropdown-item>
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
//
import { useRoute, useRouter } from 'vue-router';
import verify from '@models/DynamicForm/utils';
import { ElMessage } from 'element-plus';
import { useUsers } from '@stores/user';
import { ApiLogin } from '@api/sign';
import { reactive, ref } from 'vue';

const route = useRoute();
const routes = useRouter();
const userStore = useUsers();

const formRef = ref<any>(null);
const data = reactive<any>({
  load: false,
  formData: {},
  hasCode: true,
  fields: [
    { prop: 'user', type: 'text', placeholder: '邮箱/账号名', clearable: true },
    { show: true, prop: 'pass', type: 'password', placeholder: '密码', clearable: true, keyEnter: onSubmit },
    { show: false, prop: 'pass', type: 'code', placeholder: '验证码', clearable: true, keyEnter: onSubmit, codePlaceholder: '获取验证码', click: onDevelop },
  ],
  rules: {
    user: [{ required: true, validator: verify(), trigger: 'change' }],
    pass: [{ required: true, validator: verify(), trigger: 'change' }],
  },
});

const redirect = (route.query.redirect as undefined | string) || window.location.origin;
const tags = (route.query.tags as undefined | string) || window.__CONFIG__.tags || 'sso';

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

function onDevelop() {
  ElMessage.warning({ grouping: true, message: '功能正在开发中...' });
}

function onSubmit() {
  formRef.value?.ref.validate((state: boolean) => {
    if (!state) return false;
    const { user, pass } = data.formData;
    data.load = true;
    ApiLogin(tags, user, pass).then(({ data: res }) => {
      if (res.code === 0) {
        const { token, ...info } = res.data;
        userStore.setUserData(info, token);
        if (redirect !== window.location.origin) {
          const url = new URL(redirect);
          url.searchParams.append('token', token);
          window.location.href = url.toString();
        }
        routes.push({ path: '/' });
      } else {
        ElMessage.error(res.msg);
      }
    }).finally(() => setTimeout(() => data.load = false, 300));
  });
}
</script>
