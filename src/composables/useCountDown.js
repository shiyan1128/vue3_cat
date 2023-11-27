// 封装倒计时逻辑函数
import { computed, ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  let timer = null

  // 1.响应式的数据
  const time = ref(0)
  // 格式化时间为 XX分XX秒
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  // 2.开启倒计时函数
  const start = (currentTime) => {
    // 倒计时逻辑
    // 核心逻辑，每隔一秒减一
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    },1000)
  }
  // 组件销毁是清除定时器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return {
    formatTime,
    start
  }
}