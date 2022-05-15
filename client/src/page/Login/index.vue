<template>
  <el-form class="var-login" :model="data.form" :rules="data.formRules" ref="formRef">
    <div class="var-login__title">{{ data.tabs !== 'in' ? '注册' : '登录' }}</div>
    <el-form-item prop="email">
      <el-input placeholder="邮箱" v-model="data.form.email" clearable :prefix-icon="Message"/>
    </el-form-item>
    <el-form-item prop="pass">
      <el-input placeholder="密码" v-model="data.form.pass" clearable show-password type="password" :prefix-icon="Lock"/>
    </el-form-item>
    <el-form-item prop="code" v-if="data.tabs !== 'in'">
      <el-input placeholder="验证码" v-model="data.form.code" clearable :prefix-icon="Key">
        <template #append>
          <el-button :loading="data.codeLoading > 0" @click="getCode">获取验证码 {{ data.codeLoading > 0 ? `(${data.codeLoading})` : '' }}</el-button>
        </template>
      </el-input>
    </el-form-item>
    <div class="var-login__utils" v-if="data.tabs === 'in'">
      <el-checkbox v-model="data.check.keepPass" @change="(v: boolean) => checkboxChange('keepPass', v)">记住密码</el-checkbox>
      <el-checkbox v-model="data.check.authLogin" @change="(v: boolean) => checkboxChange('authLogin', v)">自动登录</el-checkbox>
      <el-link :underline="false" @click="rePassword">忘记密码</el-link>
    </div>
    <el-button style="width: 100%;" type="primary" @click="onSubmit">{{ data.tabs !== 'in' ? '注册' : '登录' }}</el-button>
    <div class="var-login__utils--button">
      <el-link :underline="false" @click="tbaSwitch">去{{ data.tabs === 'in' ? '注册' : '登录' }}</el-link>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Key, Lock, Message } from '@element-plus/icons-vue';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-badge.css';
import { ElMessage } from 'element-plus';
import verify, { verifyEmail } from '@utils/formVerify';

const formRef = ref<any>(null);

const data = reactive({
  tabs: ref('in'),
  codeLoading: ref(0),
  check: {
    keepPass: ref(false),
    authLogin: ref(false),
  },
  form: {
    email: ref(''),
    pass: ref(''),
    code: ref(''),
  },
  formRules: {
    email: [{required: true, validator: verify(verifyEmail), trigger: 'change'}],
    pass: [{required: true, min: 6, validator: verify(), trigger: 'change'}],
    code: [{required: true, validator: verify(), trigger: 'change'}],
  },
});

function tbaSwitch() {
  data.tabs = data.tabs === 'in' ? 'up' : 'in';
  formRef.value?.resetFields();
  console.log(data.form);
}

function rePassword() {
  ElMessage.warning({
    message: '功能正在施工中...',
    grouping: true,
  });
}

function setCodeLoading(value: number) {
  data.codeLoading = value;
  if (data.codeLoading > 0) {
    setTimeout(() => {
      setCodeLoading(data.codeLoading - 1);
    }, 1000);
  }
}

function getCode() {
  setCodeLoading(60);
}

function checkboxChange(types: 'keepPass' | 'authLogin', state: boolean) {
  if (types === 'authLogin' && state) {
    data.check.keepPass = true;
  } else if (types == 'keepPass' && !state) {
    data.check.authLogin = false;
  }
}

function InFunc(email: string, pass: string) {
  console.log('InFunc ->>', JSON.stringify({email, pass}));
}

function UpFunc(email: string, pass: string, code: string) {
  console.log('UpFunc ->>', JSON.stringify({email, pass, code}));
}

function onSubmit() {
  formRef.value?.validate((state: boolean) => {
    if (state) {
      const {email, code, pass} = data.form;
      if (data.tabs === 'in') {
        InFunc(email, pass);
      } else {
        UpFunc(email, pass, code);
      }
    }
  });
}
</script>

<style lang="scss" scoped src="@scss/page/login.scss"/>