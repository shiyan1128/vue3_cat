// 判读图片是否进入视口区域
import { useIntersectionObserver } from '@vueuse/core'


// 定义懒加载
export const lazyPlugin = {
  install (app) {
    // 懒加载指令逻辑
    // 定义全局指令
    app.directive('img-lazy', {
      mounted(el,binding) {
        // el:指令绑定的那个元素 （img）
        // binding: binding.value 指令等于号后面绑定的表达式的值 （图片url）
        // console.log(el, binding.value);
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            // isIntersecting为布尔值， 进入视口区为true，否则为false
            // console.log(isIntersecting);
            if(isIntersecting) {
              // 进入视口区域
              el.src = binding.value
              stop()
            }
          },
        )
      }
    })
  }
}