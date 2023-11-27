import { ref } from 'vue'
import { defineStore } from 'pinia'
import { grtCategoryAPI } from '@/apis/layout'
export const useCategoryStore = defineStore('category', () => {
  
  const categoryList = ref([])
  const getCategory = async () => {
      const res = await  grtCategoryAPI()
      categoryList.value = res.result
      console.log(res);
  }
  return { 
    getCategory,
    categoryList 
  }
})
