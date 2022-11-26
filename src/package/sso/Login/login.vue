<template>
  <div class="var-login_signIn">
    <h2 class="var-login_signIn--title">{{ conf.title }}账号登陆</h2>
    <div class="var-login_signIn--body">
      <div class="var-login_signIn--qrcode">
        <div class="var-login_signIn__qrcode">
          <n-image width="160" src="测试"/>
          <div class="var-login_signIn__qrcode--nav">
            <div class="var-login_signIn__qrcode--span">二维码已过期</div>
            <n-button type="primary">点击刷新</n-button>
          </div>
        </div>
        <div class="var-login_signIn__qrcode--text">可以使用App，进行扫码登陆。</div>
      </div>
      <div class="var-login_signIn--line"></div>
      <div class="var-login_signIn--form">
        <n-form :model="formValue" :rules="data.rules" label-placement="left" label-width="auto">
          <n-form-item path="user">
            <n-input autofocus v-model:value="formValue.user" placeholder="手机号/邮箱/账号名" clearable/>
          </n-form-item>
          <n-form-item v-if="data.hasCode" path="code">
            <n-input v-model:value="formValue.code" placeholder="验证码" clearable>
              <template #suffix>
                <n-button text :disabled="!!data.timeout" @click="getCode">{{ data.timeout ? `(${data.timeout})` : '' }}获取验证码</n-button>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item v-else path="pass">
            <n-input v-model:value="formValue.pass" show-password-on="mousedown" type="password" placeholder="密码" clearable/>
          </n-form-item>
          <div class="var-login_signIn__form">
            <n-button text @click="onSwitchLogin">{{ data.hasCode ? '密码' : '验证码' }}登陆</n-button>
          </div>
          <n-button class="var-login_signIn__form--btn" type="primary">登陆</n-button>
        </n-form>
      </div>
    </div>
    <div class="var-login_signIn--footer">
      <n-button text @click="onRegister">去注册</n-button>
      <n-divider vertical/>
      <n-button text>忘记密码</n-button>
      <n-divider vertical/>
      <n-button text>常见问题</n-button>
      <n-divider vertical/>
      <n-dropdown trigger="hover" :options="data.options" :render-icon="renderDropdownIcon" @select="handleSelect">
        <n-button text>第三方登陆</n-button>
      </n-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { WechatOutlined, GithubOutlined, QqOutlined } from '@vicons/antd';
import { useRouter } from 'vue-router';
import { Icon } from '@vicons/utils';
import { h, reactive } from 'vue';

const router = useRouter();
const conf = reactive({ title: '这是一个标题' });
const formValue = reactive({ user: '', pass: '', code: '' });
const data = reactive({
  rules: {},
  timeout: 0,
  hasCode: false,
  options: [
    { key: 'WeChat', label: 'WeChat', icon: WechatOutlined },
    { key: 'Github', label: 'Github', icon: GithubOutlined },
    { key: 'QQ', label: 'QQ', icon: QqOutlined },
  ],
});

function renderDropdownIcon({ icon }: { icon?: any }) {
  if (icon) return h(Icon, { size: 20 }, { default: () => h(icon) });
  return undefined;
}

function onSwitchLogin() {
  data.hasCode = !data.hasCode;
}

function setTimeoutFunc(long: number) {
  data.timeout = long;
  setTimeout(() => {
    if (!long) return false;
    setTimeoutFunc(long - 1);
  }, 1000);
}

function getCode() {
  setTimeoutFunc(60);
  console.log('getCode');
}

function handleSelect(keys: string) {
  if (keys === 'QQ') {
    // QQ
  } else if (keys === 'Github') {
    // Github
  } else if (keys === 'WeChat') {
    // 微信
  }
}

function onRegister() {
  router.push({ path: '/sign/register' });
}
</script>
