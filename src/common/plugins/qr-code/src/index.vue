<template>
  <div class="var-qrcode">
    <div class="var-qrcode__container" :style="imgStyle">
      <img class="var-qrcode__img" :style="imgStyle" :src="data.src" alt="qrcode" @click="onCanvasClick"/>
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
import { throttle } from '@utils/limit';
import QrCodeOptions from './tools';

interface Props {
  value: string;
  expires?: number;
  description?: string;
  imageClick?: boolean;
  btnText?: string;
  options?: {
    dark?: string;
    light?: string;
    width?: number;
    scale?: number;
    margin?: number;
    level?: 'L' | 'M' | 'Q' | 'H';
  };
}

const props = withDefaults(defineProps<Props>(), { btnText: '点击刷新' });

const imgStyle = computed(() => {
  const width = (props.options || {}).width || 0;
  if (!width) return undefined;
  return { width: width + 'px', height: width + 'px' };
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
  const newOptions = JSON.stringify(getOptions());
  if (data.backup.options !== newOptions) {
    data.backup.options = newOptions;
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

<style lang="scss">
.var-qrcode {
  &__container {
    margin: 0 auto;
    display: table;
    position: relative;
  }

  &__img {
    display: block;
    line-height: 0;
  }

  &__btn {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .2);
  }

  &__description {
    font-size: 12px;
    text-align: center;
    padding: 20px 0 20px;
  }
}
</style>
