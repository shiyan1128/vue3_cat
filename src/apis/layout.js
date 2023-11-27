import httpInstance from "@/utils/http"

export function grtCategoryAPI() {
  return httpInstance({
    url: '/home/category/head'
  })
}