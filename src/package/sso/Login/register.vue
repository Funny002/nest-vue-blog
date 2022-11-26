<template>
  <div class="var-login_signUp">
    <h2 class="var-login_signUp--title">{{ conf.title }}账号注册</h2>
    <div class="var-login_signUp--note">
      <span>已有账号，</span>
      <n-button text type="primary" @click="onLogin">去登陆</n-button>
    </div>
    <n-tabs class="var-login_signUp--header" default-value='phone' justify-content="space-evenly" @update:value="onTagChange">
      <n-tab name="phone">手机注册</n-tab>
      <n-tab name="email">邮箱注册</n-tab>
    </n-tabs>
    <n-form :model="formValue" :rules="data.rules" label-placement="left" label-width="auto">
      <template v-if="data.hasPhone">
        <n-form-item path="phone.user">
          <n-input :allow-input="onlyAllowNumber" v-model:value="formValue.phone.user" placeholder="手机号" clearable/>
        </n-form-item>
        <n-form-item path="phone.code">
          <n-input v-model:value="formValue.phone.code" placeholder="短信验证码" clearable>
            <template #suffix>
              <n-button text :disabled="!!data.timeout||!formValue.phone.user" @click="getCode('phone')">{{ data.timeout ? `(${data.timeout})` : '' }}获取验证码</n-button>
            </template>
          </n-input>
        </n-form-item>
      </template>
      <template v-else>
        <n-form-item path="email.user">
          <n-input v-model:value="formValue.email.user" placeholder="邮箱地址" clearable/>
        </n-form-item>
        <n-form-item path="email.code">
          <n-input v-model:value="formValue.email.code" placeholder="邮箱验证码" clearable>
            <template #suffix>
              <n-button text :disabled="!!data.timeout||!formValue.email.user" @click="getCode('email')">{{ data.timeout ? `(${data.timeout})` : '' }}获取验证码</n-button>
            </template>
          </n-input>
        </n-form-item>
      </template>
      <n-form-item path="pass.value">
        <n-input v-model:value="formValue.pass.value" type="password" placeholder="密码" show-password-on="mousedown" clearable/>
      </n-form-item>
      <n-form-item path="pass.verify">
        <n-input v-model:value="formValue.pass.verify" type="password" placeholder="确认密码" show-password-on="mousedown" clearable/>
      </n-form-item>
    </n-form>
    <n-button class="var-login_signUp--btn" type="error">注册</n-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const conf = reactive({
  title: '',
});
const formValue = reactive({
  email: { user: '', code: '' },
  phone: { user: '', code: '' },
  pass: { value: '', verify: '' },
});
const router = useRouter();
const data = reactive({
  rules: {},
  timeout: 0,
  hasPhone: true,
});

function setTimeoutFunc(long: number) {
  data.timeout = long;
  setTimeout(() => {
    if (!long) return false;
    setTimeoutFunc(long - 1);
  }, 1000);
}

function onlyAllowNumber(value: string) {
  return !value || /^\d+$/.test(value);
}

function onLogin() {
  router.push({ path: '/sign/login' });
}

function onTagChange(keys: 'phone' | 'email') {
  data.hasPhone = keys === 'phone';
  formValue[keys] = { user: '', code: '' };
}

function getCode(keys: 'email' | 'phone') {
  if (keys === 'email') {
    //
  } else if (keys === 'phone') {
    //
  }
  setTimeoutFunc(60);
}
</script>
