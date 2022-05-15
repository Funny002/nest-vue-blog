<template>
  <div class='app-layout__sidebar'>
    <div>logo + 博客信息</div>
    <div>搜索</div>
    <div>分类</div>
    <div>标签</div>
  </div>
  <div class='app-layout__container'>
    <div class='app-layout__header'>
      <layout-default-header />
    </div>
    <div class='app-layout__content' @scroll='onScroll'>
      <router-view v-slot='{ Component, route }'>
        <transition :name='route.meta.transition || ""'>
          <component :is='Component' />
        </transition>
      </router-view>
      <div class='app-layout__footer'>
        © {{ new Date().getFullYear() }}
        <!--        <var-link href='https://beian.miit.gov.cn/#/Integrated/recordQuery'>{{'xxx备xxx'}}</var-link>-->
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
function onScroll(event: Event) {
  console.log(event);
}
</script>

<style lang='scss' src='@scss/layout/style.scss' />
