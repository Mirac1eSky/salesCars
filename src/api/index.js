import axios from 'axios'

export default {

  request(method, url, params) {
    var promise = null

    //  STUB用 
    //url = 'http://localhost:8080/' + url
    url =  'http://' + window.location.host + url
    //  s
    //url = 'http://10.38.217.68:80' + url

    //  DBG)　
    console.log('リクエストURL： ', url)
    
    
    if (method === 'get') {
      promise = axios.get(url, { params: params })
      console.info("get -- PostUrl",url)
    } else if (method === 'post') {
      console.info("post -- PostUrl",url)
      promise = axios.post(url, params)
    }
    promise.catch(function () {
     // return alert('通信エラーが発生しました')
     console.log('通信エラーが発生しました')
    })
    return promise
  },
  get(url, params) {
    //DBG) 
    console.log('GETParams: ',params)
    return this.request('get', url, params)
  },
  post(url, params) {
    //DBG) 
    console.log('POSTParams: ',params)
    return this.request('post', url, params)
  }
}