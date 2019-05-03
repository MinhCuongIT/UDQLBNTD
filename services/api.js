import { config } from './config'
import axiosGet, { axiosPost } from './axios-fetch'

export default () => {
  let { baseURL } = config
  let services = {
    find_doctor: (DoctorID) => {
      return axiosGet(baseURL + 'doctors/find-doctor?MaBacSi=' + DoctorID).then((res) => {
        if(res.data.status === 'success'){
          return res.data.doctor
        }
        return null
      })
    },
    // logout: () => {
    //   return axiosPost(baseURL + 'logout')
    // },
    // register: (info) => {
    //   return axiosPost(baseURL + `patients/sign-up`, {
    //     MaBenhNhan: info.MaBenhNhan,
    //     Password: info.Password,
    //     HoTen: info.HoTen,
    //     GioiTinh: null,
    //     NgaySinh: null,
    //     CMND: null,
    //     DiaChi: null,
    //     Email: null,
    //     NgheNghiep: null,
    //     NhomMau: null,
    //     DiUngThuoc: null,
    //     TinhTrangBenh: null,
    //   }).then((res) => {
    //     if(res.data.status === 'success'){
    //       return res.data
    //     }
    //     return null})
    // },
  }

  return services
}