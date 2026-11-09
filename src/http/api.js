import Axios from 'axios'
import {contextPath} from '@/AppConfig'

Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
const apiAxios = Axios.create()

const baseUrl = contextPath

const api = {
   getDemo: req => apiAxios.get(baseUrl + '/demo/get', req),
   postDemo: req => apiAxios.post(baseUrl + '/demo/post', req)
}

export default api