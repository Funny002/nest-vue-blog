<template>
  <div class="var-qrcode">
    <div class="var-qrcode__container">
      <img class="var-qrcode__img" :src="data.src" alt="qrcode" @click="onCanvasClick"/>
      <div class="var-qrcode__btn" v-if="hasExpires">
        <el-button type="primary" @click="onBtnClick">{{ props.btnText }}</el-button>
      </div>
    </div>
    <div class="var-qrcode__description" v-if="props.description || $slots.description">
      <slot name="description">{{ props.description }}</slot>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'QrCode' };</script>
<script lang="ts" setup>
import { mergeOptions } from 'element-plus/es/components/table/src/util';
import { computed, onMounted, reactive, watch } from 'vue';
import { QrCodeOptions } from '@plugin/qrcode';
import { throttle } from '@utils/limit';

interface Props {
  value: string;
  expires?: number;
  description?: string;
  imageClick?: boolean;
  btnText?: string;
  options?: {
    dark?: string;
    light?: string;
    scale?: number;
    margin?: number;
    level?: 'L' | 'M' | 'Q' | 'H';
  };
}

const props = withDefaults(defineProps<Props>(), {
  btnText: '点击刷新',
});

function getOptions() {
  return mergeOptions({
    scale: 4,
    margin: 2,
    level: 'L',
    dark: '#000000ff',
    light: '#ffffffff',
  }, props.options || {});
}

const data = reactive({
  src: '',
  backup: {
    value: props.value || '',
    expires: props.expires || 0,
    options: JSON.stringify(getOptions()),
  },
  expires: 0,
});

// 显示一个刷新按钮
const hasExpires = computed(() => {
  if (!props.expires) return false;
  return data.expires >= props.expires;
});

function setIndices(num: number): void {
  data.expires = num;
  if (!hasExpires.value) {
    setTimeout(() => {
      setIndices(num + 1);
    }, 1000);
  }
}

const setQrCode = throttle(async function () {
  data.src = await QrCodeOptions(props.value, props.options);
  setIndices(0);
});

// 监听
watch(() => props, (props) => {
  // 监听 value 改变, 重新生成二维码
  if (data.backup.value !== props.value) {
    data.backup.value = props.value;
    setQrCode();
  }

  // 监听 options 改变, 重新生成二维码
  if (data.backup.options !== JSON.stringify(getOptions())) {
    data.backup.options = JSON.stringify(getOptions());
    setQrCode();
  }

  // 监听 expires 改变，并且
  if (data.backup.expires !== props.expires) {
    data.backup.expires = props.expires || 0;
    setIndices(1);
  }
});

// 页面加载完毕生成二维码
onMounted(() => setQrCode());

const emits = defineEmits(['click']);

function onBtnClick() {
  emits('click', props.imageClick ? 'button' : undefined);
}

function onCanvasClick() {
  emits('click', 'image');
}
</script>

<style lang="scss" src="./src/style.scss"/>
