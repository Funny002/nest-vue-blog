<template>
  Article/{{ ArticleId }}
  <el-button @click='onParamsId'>paramsId +</el-button>
</template>

<script lang='ts' setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, watchEffect } from 'vue';

const route = useRoute();
const router = useRouter();

const ArticleId = ref(route.params.id);

watchEffect((func) => {
  ArticleId.value = route.params.id
  func(() => {
    console.log('ArticleId.value', ArticleId.value);
  });
});

function onParamsId() {
  router.push({path: `/article/${parseInt(ArticleId.value as string) + 1}`});
}
</script>
