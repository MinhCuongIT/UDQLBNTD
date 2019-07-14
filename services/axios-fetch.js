import axios from 'axios';

export default (url, withCredentials = true) => {
  return axios.get(url, {
    withCredentials: withCredentials
  })
}

export function axiosPost(url, data = null, withCredentials = true){
  return axios.post(url, data, {
    withCredentials: withCredentials
  })
}
