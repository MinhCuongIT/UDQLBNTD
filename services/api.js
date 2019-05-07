import { config } from './config'
import axiosGet, { axiosPost } from './axios-fetch'

export default () => {
  let { baseURL } = config
  let services = {
    login: (info) => {
      return axiosPost(baseURL + 'patients/log-in', {
        MaBenhNhan: info.MaBenhNhan,
        Password: info.Password,
      }).then((res) => {
        if(res.data.status === 'success'){
          return res.data.patient
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
        // GioiTinh: 1,
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
          return null;
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
    },
    addHealthValue: (info) => {
      return axiosPost(baseURL + `patients/add-my-statistic`, {
        MaBenhNhan: info.MaBenhNhan,
        Loai: info.Loai,
        ChiSo: info.ChiSo,
        NgayNhap: info.NgayNhap,
        // GioiTinh: 1,
      }).then((res) => {
        if(res.data.status === 'success'){
          return res.data.my_statistic
        }
        return null})
    },
    getHealthValue: (info) => {
      return axiosGet(baseURL + `statistics?MaBenhNhan=${info.MaBenhNhan}&Loai=${info.Loai}`)
        .then((res) => {
          if(res.data.status === 'success'){
            return res.data.statistics
          }
          return null
        })
    },
  }

  return services
}