import { config } from './config'
import axiosGet, { axiosPost } from './axios-fetch'

export default () => {
  let { baseURL } = config
  let services = {
    login: (public_key) => {
      return axiosPost(baseURL + 'login', {
        public_key: public_key
      }).then((res) => {
        if(res.data.status === 'success'){
          return res.data.info_user
        }
        return null
      })
    },
    logout: () => {
      return axiosPost(baseURL + 'logout')
    },
    register: (info) => {
      return axiosPost(baseURL + `patients/sign-up`, {
        MaBenhNhan: info.MaBenhNhan,
        Password: info.Password,
        HoTen: info.HoTen,
        GioiTinh: null,
        NgaySinh: null,
        CMND: null,
        DiaChi: null,
        Email: null,
        NgheNghiep: null,
        NhomMau: null,
        DiUngThuoc: null,
        TinhTrangBenh: null,
      }).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null})
    },

    getBenhNhanInfo: (info) => {
      return axiosGet(baseURL + `patients/find-patient-by-id?MaBenhNhan=${info.MaBenhNhan}`)
        .then((res) => {
          if (res.data.status === 'success') {
            return res.data.patient
          }
          return null
        })
        
    },
    

    changeBenhNhanPassword: (info) =>{
      return axiosPost(baseURL + `patients/change-password`, {
        MaBenhNhan: info.MaBenhNhan,
        Password: info.Password
      })
      .then((res) => {
        if (res.data.status === 'success') {
          return res.data.patient
        }
        return null
      })
      

    }
  }
  return services
}