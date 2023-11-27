import request from '@/utils/http'

export const getDetail = (id) => {
  return request({
    url: '/goods',
    params: {
      id
    }
  })
}

// 获取热榜商品
/**
 * @param {Number} id -- 商品id
 * @param {Nunber} type -- 1表示24小时热销 2代表周热销榜
 * @param {Number} limit -- 获取个数
 * 
 */
export const getHotGoodsAPI = ({ id, type, limit}) => {
  return request({
    url: '/goods/hot',
    params: {
      id,
      type,
      limit
    }
  })
}