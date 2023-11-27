// 管理用户数据模块

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'
import { merCartAPI } from '@/apis/cart'

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  // 1.定义管理用户数据的state
  const userInfo = ref({})
  // 2.定义获取数据的action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    // 合并购物车操作
    await merCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateNewList()
  }
  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    // 执行清除购物车的action
    cartStore.clearCart()
  }
  // 3.以对象的格式把state和action return出去
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true
})