// 封装购物车模块
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
import { useUserStore } from './userStore'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // 1.定义state - cartList
  const cartList = ref([])
  
  // 获取最新购物车列表
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  // 2.定义action - addCart
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if(isLogin.value) {
      // 如果已经登录  将将个人购物车覆盖本地购物车
      await insertCartAPI({ skuId, count })
      updateNewList()
    }else {
      // 未登录
      // 添加购物车操作
      // 已添加过 - count + num
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if(item) {
        // 找到了
        item.count += goods.count
      } else {
        cartList.value.push(goods)
      }
    }
  }

  // 删除购物车
  const delCart = async (skuId) => {
    // 登录状态下删除的也是个人的购物车信息，并将本地购物车信息覆盖
    await delCartAPI([skuId])
    updateNewList()
    if(isLogin.value) {
      // 调用接口实现接口购物车中的删除功能
    } else {
      // 思路
      // 1.找到删除想的下标值 - splice
      // 2.使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx,1)
    }
  }

  // 清除购物车
  const clearCart = () => {
    cartList.value = []
  }

  // 单选功能
  const singleCheck = (skuId, selected) => {
    // 通过skuid找到要修改的一项，将selected更新
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 计算属性
  // 1.总的数量 所有的count之和
  const allCount = computed(()=> cartList.value.reduce((a, c) => a + c.count, 0))
  // 2.总价 所有相的count*price之和
  const allPrice = computed(()=> cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected)) 

  // 全选功能
  const allCheck = (selected) => {
    // 把cartList中的每一项的selected都设置为当前的全选框状态
    cartList.value.forEach(item => item.selected = selected)
  }

  // 3.已选择数量
  const selectedCount = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0))

  // 4.已选择商品合计
  const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0))


  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updateNewList
  }
}, {
  persist: true
})