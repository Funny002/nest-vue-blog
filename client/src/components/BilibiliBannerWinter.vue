<template>
  <div class='var-banner__box' @mousemove='onMove' @mouseenter='onEnter' @mouseleave='onLeave'>
    <div ref='BannerRef' :class='["var-banner", {"css-animated": layout_box_animated}]' :style='{transform: `translateX(${layout_box}px)`}'>
      <div class='var-banner__layout' :style='{opacity: layout_left}'>
        <img :src='image_001' alt='001' />
      </div>
      <div class='var-banner__layout' :style='{opacity: layout_the}'>
        <img :src='image_002' alt='002' />
      </div>
      <div class='var-banner__layout' :style='{opacity: layout_right}'>
        <video loop autoplay muted :src='image_003' />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import image_001 from '@image/banner/001.jpg';
import image_002 from '@image/banner/002.jpg';
import image_003 from '@image/banner/003.webm';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { SizeLimit } from '@utils/limit';

const layout_the = ref(1);
const layout_box = ref(0);
const layout_left = ref(0);
const layout_right = ref(0);
const BannerRef = ref(null);
const layout_box_animated = ref(false);

let startClient = 0;
const resistance = 100;
const opacityDistance = 40;

const maxSize = computed<number>(() => {
  const { offsetWidth, children } = BannerRef.value as unknown as { offsetWidth: number, children: HTMLElement[] };
  return Math.floor((children[0].offsetWidth - offsetWidth) / 2);
});

function onEnter({ clientX }: MouseEvent) {
  startClient = clientX;
}

function onMove({ clientX }: MouseEvent) {
  let translate = startClient - clientX;
  const resistanceOffset = translate / 100 / resistance;
  translate *= translate >= 0 ? resistanceOffset : -resistanceOffset;
  layout_box.value = SizeLimit(translate, -maxSize.value, maxSize.value);
  const opacity = SizeLimit((translate >= 0 ? translate : -translate) / opacityDistance);
  layout_the.value = 1 - opacity;
  (translate >= 0 ? layout_left : layout_right).value = opacity;
}

function onLeave() {
  layout_box_animated.value = true;
  //
  layout_the.value = 1;
  layout_box.value = 0;
  layout_left.value = 0;
  layout_right.value = 0;
  //
  setTimeout(() => {
    layout_box_animated.value = false;
  }, 300);
}
</script>

<style lang='scss' scoped src='@scss/components/BilibiliBannerWinter.scss' />