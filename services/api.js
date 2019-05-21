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
    // Hàm lấy thông tin bệnh nhân
    getBenhNhanInfo: (info) => {
      return axiosGet(baseURL + `patients/find-patient-by-id?MaBenhNhan=${info.MaBenhNhan}`)
        .then((res) => {
          if (res.data.status === 'success') {
            return res.data.patient
          }
          return null;
        })
        
    },
    // Hàm cập nhật thông tin bệnh nhân
    updateProfileBenhNhan : (benhNhan) => {
      return axiosPost(baseURL + `patients/update-profile`, {
        MaBenhNhan: benhNhan.MaBenhNhan,
        Avatar: benhNhan.Avatar,
        HoTen: benhNhan.HoTen ,
        GioiTinh: benhNhan.GioiTinh == 1 ? "1" : "0",
        NgaySinh: benhNhan.NgaySinh,
        CMND: benhNhan.CMND,
        DiaChi: benhNhan.DiaChi,
        Email: benhNhan.Email,
        NgheNghiep: benhNhan.NgheNghiep,
        NhomMau: benhNhan.NhomMau,
        DiUngThuoc: benhNhan.DiUngThuoc,
      })
        .then((res) => {
          if (res.data.status === 'success') {
            return res.data.patient
          }
          return null
        })
    },
    // Hàm thay đổi mật khẩu
    changeBenhNhanPassword: (info) => {
      return axiosPost(baseURL + `patients/change-password`, {
        MaBenhNhan: info.MaBenhNhan,
        NewPassword: info.NewPassword,
        OldPassword: info.OldPassword
      })
      .then((res) => {
        if (res.data.status === 'success') {
          return res.data.status
        }
        return null
      })
    },
    // Hàm thay đổi mật khẩu
    forgetBenhNhanPassword: (info) => {
      return axiosPost(baseURL + `patients/forget-password`, {
        MaBenhNhan: info.MaBenhNhan,
        NewPassword: info.NewPassword,
      })
        .then((res) => {
          if (res.data.status === 'success') {
            return res.data.status
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
            if (info.Loai === 1)
              return res.data.blood_sugar
            else if (info.Loai === 2)
              return res.data.blood_pressure
          }
          return null
        })
    },

    // Doctor
    findDoctorByID: (ID) => {
      return axiosGet(baseURL + `doctors/find-doctor-by-id?MaBacSi=${ID}`)
      .then((res) => {
        if(res.data.status === 'success'){
          return res.data.doctor
        }
        return null
      })
    },
    addMyDoctor: (userID, drID) => {
      return axiosPost(baseURL + `follows/wait`, {
        NguoiBiTheoDoi: userID,
        NguoiTheoDoi: drID
      })
      .then((res) => {
        return res.data.status
      })
    },
    getMyListDoctors: (myID) => {
      return axiosGet(baseURL + `follows/list-doctors-of-patient?NguoiBiTheoDoi=${myID}`)
        .then((res) => {
          if(res.data.status === 'success'){
            return res.data
          }
          return null
        })
    },

    // Relatives
    getMyListRelatives: (myID) => {
      return axiosGet(baseURL + `follows/list-relations-of-patient?NguoiBiTheoDoi=${myID}`)
        .then((res) => {
          if(res.data.status === 'success'){
            return res.data
          }
          return null
        })
    },

    getListNotifications: (info) => {
      return axiosGet(baseURL + `notifications?MaTaiKhoan=${info.MaTaiKhoan}&LoaiNguoiChinh=${info.LoaiNguoiChinh}&page=${info.page}`)
        .then((res) => {
          if(res.data.status === 'success'){
            return res.data
          }
          return null
        })
    },

    // Chat
    getMessages: (sender, receiver, page) => {
      return axiosGet(baseURL + `chats?MaNguoiGui=${sender.id}&LoaiNguoiGui=${sender.type}&MaNguoiNhan=${receiver.id}&LoaiNguoiNhan=${receiver.type}&page=${page}`)
        .then((res) => {
          if(res.data.status === 'success'){
            return res.data.chats
          }
          return null
        })
    },

    seenThisNotification: (info) => {
      return axiosPost(baseURL + `notifications/seenThisNotification`, {
        MaTaiKhoan: info.MaTaiKhoan,
        Id: info.Id,
        LoaiNguoiChinh: info.LoaiNguoiChinh,
      }).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null})
    },

    findRelativeByID: (ID) => {
      return axiosGet(baseURL + `patients/find-patient-by-id?MaBenhNhan=${ID}`)
      .then((res) => {
        if(res.data.status === 'success'){
          return res.data.patient
        }
        return null
      })
    },
    checkMyRelationship: (userID, rlID) => {
      return axiosGet(baseURL + `follows/check-relationship-of-patient?MaBenhNhan1=${userID}&MaBenhNhan2=${rlID}`)
        .then((res) => {
          if(res.data.status === 'success'){
            return res.data.typeRelationship
          }
          return null
        })
    },
    // Gửi request follow tới người khác
    requestFollow: (userID, rlID, type) => {
      return axiosPost(baseURL + `follows/wait`, {
        NguoiTheoDoi: userID,
        NguoiBiTheoDoi: rlID,
        Type: 1
      })
      .then((res) => {
          if(res.data.status === 'success'){
            return res.data.status
          }
          return null
      })
    },
    // Chấp nhận request follow từ người khác
    acceptFollowRequest: (userID, rlID, type) => {
      return axiosPost(baseURL + `follows/followed`, {
        NguoiTheoDoi: rlID,
        NguoiBiTheoDoi: userID,
        Type: type
      })
      .then((res) => {
          if(res.data.status === 'success'){
            return res.data.status
          }
          return null
      })
    },
    // Từ chối request follow từ người khác
    refuseFollowRequest: (userID, rlID, type) => {
      return axiosPost(baseURL + `follows/unfollowed`, {
        NguoiTheoDoi: rlID,
        NguoiBiTheoDoi: userID,
        Type: type
      })
      .then((res) => {
          if(res.data.status === 'success'){
            return res.data.status
          }
          return null
      })
    },
    // // Hủy việc gửi request follow tới người khác
    // cancelFollowRequest: (userID, rlID, type) => {
    //   return axiosPost(baseURL + `follows/unfollowed`, {
    //     NguoiTheoDoi: userID,
    //     NguoiBiTheoDoi: rlID,
    //     Type: 1
    //   })
    //   .then((res) => {
    //       if(res.data.status === 'success'){
    //         return res.data.status
    //       }
    //       return null
    //   })
    // },
    // Hủy follow với người khác / Hủy việc gửi request follow tới người khác
    unFollowed: (userID, rlID, type) => {
      return axiosPost(baseURL + `follows/unfollowed`, {
        NguoiTheoDoi: userID,
        NguoiBiTheoDoi: rlID,
        Type: 1
      })
      .then((res) => {
          if(res.data.status === 'success'){
            return res.data.status
          }
          return null
      })
    },
  }

  return services
}