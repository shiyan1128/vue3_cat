<script setup>
import LayoutNav from './component/LayoutNav.vue'
import LayoutHeader from './component/LayoutHeader.vue'
import LayoutFooter from './component/LayoutFooter.vue'
import LayoutFixed from './component/LayoutFixed.vue'

// 触发获取导航列表的action
import { useCategoryStore } from '@/stores/categoryStore'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()
onMounted(() => categoryStore.getCategory())
</script>
<template>
  <LayoutFixed></LayoutFixed>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <!-- 二级路由：添加key，破坏复用机制，强制销毁重建 -->
  <!-- <RouterView :key="$route.fullPath"></RouterView> -->
  <RouterView></RouterView>
  <LayoutFooter></LayoutFooter>
</template>
<!-- @/stores/categoryStore -->