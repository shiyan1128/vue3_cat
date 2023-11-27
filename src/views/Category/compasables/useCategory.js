// 封装分类数据业务相关代码
import { getCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }
  onMounted(() => {
    getCategory()
  })
  // 路由参数变化时，将分类数据接口重新发送
  // to：目标路由对象
  onBeforeRouteUpdate((to) => {
    // 使用最新路由参数请求最新的分类数据
    getCategory(to.params.id)
  })
  return {
    categoryData
  }
}