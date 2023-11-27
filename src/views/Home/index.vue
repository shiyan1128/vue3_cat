<script setup>
import HomeBanner from './component/HomeBanner.vue'
import HomeCategory from './component/HomeCategory.vue'
import HomeNew from './component/HomeNew.vue'
import HomeHot from './component/HomeHot.vue'
import HomeProduct from './component/HomeProduct.vue'
// import HomePanel from './component/HomePanel.vue'
</script>

<template>
  <div class="container">
    <HomeCategory/>
    <HomeBanner/>
  </div>

  <HomeNew></HomeNew>
  <HomeHot></HomeHot>
  <HomeProduct></HomeProduct>

</template>