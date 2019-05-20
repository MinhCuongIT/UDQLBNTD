/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView, Alert, TouchableOpacity, AsyncStorage } from 'react-native';

import { Button, Avatar, Image, ListItem, Divider, Card, Overlay, Input, CheckBox } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ApiServices from '../services/api';

import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from "react-native-modal-datetime-picker";
import ImagePicker from 'react-native-image-picker';

// Sử dụng thuật toán SHA256
var SHA256 = require("crypto-js/sha256");


// Option dành cho việc tải dữ làm avt
const options = {
  title: 'Chọn hình đại diện',
  storageOptions: {
    skipBackup: false,
    path: 'images',
  },
  mediaType: 'photo',
  cancelButtonTitle: 'Hủy',
  takePhotoButtonTitle: 'Chụp ảnh mới',
  chooseFromLibraryButtonTitle: 'Chọn từ thư viện'
};


//Chiều dài và chiều rộng của màn hình
var _height = Dimensions.get('window').height;
var _width = Dimensions.get('window').width;


class CardItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleGioiTinhScreen: false,
      isVisibleCMNDScreen: false,
      isVisibleDiaChiScreen: false,
      isVisibleNgheNghiepScreen: false,
      isVisibleNhomMauScreen: false,
      isVisibleEmailScreen: false,

      isDateTimePickerVisible: false, //ẩn hiện datetime picker

      isMale: null,  //Tam thoi cu khoi la false
      birthday: '',
      cmnd: '',
      diaChi: '',
      ngheNghiep: '',
      nhomMau: '',
      email: '',
      itemDetail: props.itemDetail,
    }

  }

  componentWillReceiveProps(props) {
    this.setState({
      itemDetail: props.itemDetail,
    });
  }

  xuLyChinhSua(type, oldData) {
    switch (type) {
      //Sua gioi tinh
      case 1:
        this.setState({ isVisibleGioiTinhScreen: true });
        if (oldData == "Nam") {
          this.setState({
            isMale: true
          })
        } else {
          this.setState({
            isMale: false
          })
        }
        break;
      //Sua CMND
      case 2:
        this.setState({ isVisibleCMNDScreen: true });
        break;
      //Sua ngay sinh
      case 3:
        // Hiển thị màn hình chọn ngày cho phép người dùng chọn ngày mới
        this.showDateTimePicker();
        break;
      //Sua dia chi
      case 4:
        this.setState({ isVisibleDiaChiScreen: true });
        break;
      //Sua nghe nghiep
      case 5:
        this.setState({ isVisibleNgheNghiepScreen: true });
        break;
      //Sua nhom mau
      case 6:
        this.setState({ isVisibleNhomMauScreen: true });
        break;
      //Sua tinh trang
      case 7:
        this.setState({ isVisibleTinhTrangScreen: true });
        break;
      //Sua email
      case 8:
        this.setState({ isVisibleEmailScreen: true });
        break;
      default:
        break;
    }
  }
  // Hiển thị dialog chọn ngày
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
  //Ẩn dialog chọn ngày
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  //Xử lý chọn ngày
  handleDatePicked = date => {
    // Alert.alert("A date has been picked: ", date.toString());
    this.setState({
      birthday: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),

    })
    // alert(this.state.birthday);
    this.hideDateTimePicker();
    this.props.onUpdateBirthday(this.state.birthday);
  };
  //Xử lý cập nhật giới tính
  handleUpdateGen = () => {
    this.setState({ isVisibleGioiTinhScreen: false });  //Bấm nút thì tắt màn hình đi
    this.props.onUpdateGen(this.state.isMale ? 1 : 0);
  }
  //Xử lý cập nhật CMND
  handleUpdateCmnd = () => {
    this.setState({ isVisibleCMNDScreen: false });  //Bấm nút thì tắt màn hình đi
    this.props.onUpdateCmnd(this.state.cmnd);
  }
  //Xử lý cập nhật dia chi
  handleUpdateDiaChi = () => {
    this.setState({ isVisibleDiaChiScreen: false });  //Bấm nút thì tắt màn hình đi
    this.props.onUpdateDiaChi(this.state.diaChi);
  }
  //Xử lý cập nhật nghề nghiệp
  handleUpdateNgheNghiep = () => {
    this.setState({ isVisibleNgheNghiepScreen: false });  //Bấm nút thì tắt màn hình đi
    this.props.onUpdateNgheNghiep(this.state.ngheNghiep);
  }
  //Xử lý cập nhật nhóm máu
  handleUpdateNhomMau = () => {
    this.setState({ isVisibleNhomMauScreen: false });  //Bấm nút thì tắt màn hình đi
    this.props.onUpdateNhomMau(this.state.nhomMau);
  }
  //Xử lý cập nhật email
  handleUpdateEmail = () => {
    this.setState({ isVisibleEmailScreen: false });  //Bấm nút thì tắt màn hình đi
    this.props.onUpdateEmail(this.state.email);
  }

  render() {
    return (
      <View>
        <Overlay isVisible={this.state.isVisibleGioiTinhScreen}
          borderRadius={10}
          height={200}
          onBackdropPress={() => { this.setState({ isVisibleGioiTinhScreen: false }) }}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Chọn giới tính</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
              <CheckBox
                title="Nam"
                checked={this.state.isMale}
                onPress={() => { this.setState({ isMale: true }) }}
              />
              <CheckBox
                title="Nữ"
                checked={!this.state.isMale}
                onPress={() => { this.setState({ isMale: false }) }}
              />
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={this.handleUpdateGen}
            />
          </ScrollView>
        </Overlay>

        <Overlay isVisible={this.state.isVisibleCMNDScreen}
          borderRadius={10}
          height={200}
          onBackdropPress={() => { this.setState({ isVisibleCMNDScreen: false }) }}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Chứng minh nhân dân</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
              <Input onChangeText={(text) => this.setState({ cmnd: text })} placeholder='CMND'>{this.props.itemDetail}</Input>
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={this.handleUpdateCmnd}
            />
          </ScrollView>
        </Overlay>

        <Overlay isVisible={this.state.isVisibleDiaChiScreen}
          borderRadius={10}
          height={200}
          onBackdropPress={() => { this.setState({ isVisibleDiaChiScreen: false }) }}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Địa chỉ</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
              <Input onChangeText={(text) => this.setState({ diaChi: text })} placeholder='Địa chỉ'>{this.props.itemDetail}</Input>
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={this.handleUpdateDiaChi}
            />
          </ScrollView>
        </Overlay>

        <Overlay isVisible={this.state.isVisibleNgheNghiepScreen}
          borderRadius={10}
          height={200}
          onBackdropPress={() => { this.setState({ isVisibleNgheNghiepScreen: false }) }}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Nghề nghiệp</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
              <Input onChangeText={(text) => this.setState({ ngheNghiep: text })} placeholder='Nghề nghiệp'>{this.props.itemDetail}</Input>
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={this.handleUpdateNgheNghiep}
            />
          </ScrollView>
        </Overlay>

        <Overlay isVisible={this.state.isVisibleNhomMauScreen}
          borderRadius={10}
          height={200}
          onBackdropPress={() => { this.setState({ isVisibleNhomMauScreen: false }) }}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Nhóm máu</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
              <Input onChangeText={(text) => this.setState({ nhomMau: text })} placeholder='Nhóm máu'>{this.props.itemDetail}</Input>
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={this.handleUpdateNhomMau}
            />
          </ScrollView>
        </Overlay>

        <Overlay isVisible={this.state.isVisibleEmailScreen}
          borderRadius={10}
          height={200}
          onBackdropPress={() => { this.setState({ isVisibleEmailScreen: false }) }}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Email</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
              <Input onChangeText={(text) => this.setState({ email: text })} placeholder='Email'>{this.props.itemDetail}</Input>
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={this.handleUpdateEmail}
            />
          </ScrollView>
        </Overlay>
        {/* Hiển thị item cho từng thành phần */}
        <ListItem
          title={
            <View>
              <Text style={styles.customText}>
                {this.state.itemDetail}
              </Text>
            </View>
          }
          subtitle={this.props.itemTitle}
          rightIcon={
            <AntDesign name='edit' size={25} color='rgba(74, 195, 180, 1)' onPress={() => { this.xuLyChinhSua(this.props.id, this.props.itemDetail) }}  ></AntDesign>

          }

        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>


    )
  }
}

class MyListCards extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisiblePasswordScreen: false,
      isLogoutConfirm: false,

      profile: props.profile,

      typePassword: "",
      newPassword: "",
    };

  }

  componentWillReceiveProps(props) {
    this.setState({
      profile: props.profile,
    });
  }

  // Kiểm tra nhập mật khẩu cũ có đúng hay không?
  isMatchingPassword = () => {
    if (this.state.profile.taiKhoan.password == SHA256(this.state.typePassword)) {
      return true;
    } else {
      return false;
    }
  }
  onUpdatePassword = () => {
    //Thuc hien doi mat khau
    this.props.onUpdatePasswordParent(this.state.newPassword);
  }
  changePassword = () => {
    if (this.state.typePassword == "" || this.state.newPassword == "") {
      alert("Mật khẩu không được rỗng!");
    } else {
      //Kiểm tra nhập mật khẩu cũ đúng hay sai
      if (this.isMatchingPassword()) {
        this.onUpdatePassword();
      } else {
        alert("Mật khẩu cũ không đúng! Vui lòng kiểm tra lại!");
      }

    }
  }
  onLogout = () => {
    this.props.onLogoutParent();
  }
  render() {
    return (
      <View>
        <Overlay isVisible={this.state.isVisiblePasswordScreen}
          borderRadius={10}
          height={250}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Đổi mật khẩu</Text>
            <Input onChangeText={(text) => this.setState({ typePassword: text })} placeholder='Nhập mật khẩu cũ' secureTextEntry={true}></Input>
            <Input onChangeText={(text) => this.setState({ newPassword: text })} placeholder='Nhập mật khẩu mới' secureTextEntry={true}></Input>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10
            }}>
              <Button
                type='outline'
                title="Đồng ý"
                buttonStyle={{ width: 120 }}
                onPress={() => this.changePassword()}
              />
              <Button
                type='outline'
                title="Hủy"
                buttonStyle={{ width: 120 }}
                onPress={() => this.setState({ isVisiblePasswordScreen: false })}
              />
            </View>
          </ScrollView>
        </Overlay>

        <Overlay isVisible={this.state.isLogoutConfirm}
          borderRadius={10}
          height={160}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Bạn có thực sự muốn đăng xuất không?</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10
            }}>
              <Button
                type='outline'
                title="Có"
                buttonStyle={{ width: 120 }}
                onPress={() => this.onLogout()}
              />
              <Button
                type='outline'
                title="Không"
                buttonStyle={{ width: 120 }}
                onPress={() => this.setState({ isLogoutConfirm: false })}
              />
            </View>
          </ScrollView>
        </Overlay>

        <Card title={
          <View style={styles.customTitle}>
            <AntDesign name="profile" size={20} />
            <Text style={[styles.customText, styles.customTextTitle]}>Thông Tin Cơ Bản</Text>
          </View>
        }
          containerStyle={styles.removeCardBorder}
        >
          <Divider />
          <CardItem id={1} onUpdateGen={this.props.onUpdateGenParent} itemDetail={this.state.profile.thongTinChung.gioiTinh == 1 ? "Nam" : "Nữ"} itemTitle='Giới tính' />
          <CardItem id={2} onUpdateCmnd={this.props.onUpdateCmndParent} itemDetail={this.state.profile.thongTinChung.cmnd} itemTitle='CMND' />
          <CardItem id={3} onUpdateBirthday={this.props.onUpdateBirthdayParent} itemDetail={this.state.profile.thongTinChung.ngaySinh} itemTitle='Ngày sinh' />
          <CardItem id={4} onUpdateDiaChi={this.props.onUpdateDiaChiParent} itemDetail={this.state.profile.thongTinChung.diaChi} itemTitle='Địa chỉ' />
          <CardItem id={5} onUpdateNgheNghiep={this.props.onUpdateNgheNghiepParent} itemDetail={this.state.profile.thongTinChung.ngheNghiep} itemTitle='Nghề nghiệp' />
          <CardItem id={6} onUpdateNhomMau={this.props.onUpdateNhomMauParent} itemDetail={this.state.profile.thongTinChung.nhomMau} itemTitle='Nhóm máu' />
        </Card>
        <Card title={
          <View style={styles.customTitle}>
            <AntDesign name="contacts" size={20} />
            <Text style={[styles.customText, styles.customTextTitle]}>Liên Hệ</Text>
          </View>
        }
          containerStyle={styles.removeCardBorder}
        >
          <Divider />
          <CardItem id={8} onUpdateEmail={this.props.onUpdateEmailParent} itemDetail={this.props.profile.lienHe.email} itemTitle='Email' />
        </Card>

        <Divider style={{ marginHorizontal: 30 }} />

        {/* Doi mat khau */}
        <ListItem containerStyle={{ marginLeft: 20 }}

          title={
            <View >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', }}>Đổi mật khẩu</Text>
            </View>}

          onPress={() => { this.setState({ isVisiblePasswordScreen: true }) }}

          leftIcon={
            <MaterialCommunityIcons name='textbox-password' size={25} color='rgba(74, 195, 180, 1)'></MaterialCommunityIcons>
          }></ListItem>
        {/* Dang xuat */}
        <TouchableOpacity onPress={() => { this.setState({ isLogoutConfirm: true }) }}>
          <ListItem containerStyle={{ marginLeft: 20 }}
            title={
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', }}>Đăng xuất</Text>
            }
            leftIcon={
              <MaterialCommunityIcons name='logout' size={25} color='rgba(74, 195, 180, 1)'></MaterialCommunityIcons>
            }
          ></ListItem>

        </TouchableOpacity>

      </View>
    )
  }
}

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //Mo hinh du lieu duoi local
      listData: {
        thongTinChung: {
          anhBia: require("../images/hinh_bien.jpg"),
          avatar: null,
          hoTen: "",
          sdt: "",
          cmnd: "",
          gioiTinh: 1,
          ngaySinh: "",
          diaChi: "",
          ngheNghiep: "",
          nhomMau: "",
          tinhTrang: "",
        },
        lienHe: {
          email: "",
        },
        taiKhoan: {
          password: {},
        }
      },

      isVisibleEditNameScreen: false,
      fullName: ''

    };
    this.onUpdateNgheNghiepParent = this.onUpdateNgheNghiepParent.bind(this);
    this.onUpdateNhomMauParent = this.onUpdateNhomMauParent.bind(this);
    this.onUpdateEmailParent = this.onUpdateEmailParent.bind(this);
    this.onUpdateDiaChiParent = this.onUpdateDiaChiParent.bind(this);
    this.onUpdateCmndParent = this.onUpdateCmndParent.bind(this);
    this.onUpdateGenParent = this.onUpdateGenParent.bind(this);
    this.onUpdateBirthdayParent = this.onUpdateBirthdayParent.bind(this);
    this.onUpdatePasswordParent = this.onUpdatePasswordParent.bind(this);
    this.onLogoutParent = this.onLogoutParent.bind(this);
    this.apiServices = ApiServices();
  }

  handleChange = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // var source = { uri: response.uri };

        // You can also display the image using data:
        var source = response.data;

        this.setState({
          listData: {
            ...this.state.listData,
            thongTinChung: {
              ...this.state.listData.thongTinChung,
              avatar: source
            }
          }
        });

        //Update xuống DB
        this.updateBenhNhan({
          MaBenhNhan: this.state.listData.thongTinChung.sdt,
          Avatar: this.state.listData.thongTinChung.avatar,
          HoTen: this.state.listData.thongTinChung.hoTen,
          GioiTinh: this.state.listData.thongTinChung.gioiTinh,
          NgaySinh: this.state.listData.thongTinChung.ngaySinh,
          CMND: this.state.listData.thongTinChung.cmnd,
          DiaChi: this.state.listData.thongTinChung.diaChi,
          Email: this.state.listData.lienHe.email,
          NgheNghiep: this.state.listData.thongTinChung.ngheNghiep,
          NhomMau: this.state.listData.thongTinChung.nhomMau,
          DiUngThuoc: 'Không hỗ trợ',
        });
      }
    });
  }

  onUpdateBirthdayParent = async (textDate) => {
    await this.setState({
      listData: {
        ...this.state.listData,
        thongTinChung: {
          ...this.state.listData.thongTinChung,
          ngaySinh: textDate
        }
      }
    })

    //Tạo đối tượng bệnh nhân được cập nhật
    var patient = await {
      MaBenhNhan: this.state.listData.thongTinChung.sdt,
      Avatar: this.state.listData.thongTinChung.avatar,
      HoTen: this.state.listData.thongTinChung.hoTen,
      GioiTinh: this.state.listData.thongTinChung.gioiTinh,
      NgaySinh: this.state.listData.thongTinChung.ngaySinh,
      CMND: this.state.listData.thongTinChung.cmnd,
      DiaChi: this.state.listData.thongTinChung.diaChi,
      Email: this.state.listData.lienHe.email,
      NgheNghiep: this.state.listData.thongTinChung.ngheNghiep,
      NhomMau: this.state.listData.thongTinChung.nhomMau,
      DiUngThuoc: 'Không hỗ trợ',
    };
    //Update xuống DB
    await this.updateBenhNhan(patient);
  }

  onUpdateCmndParent = async (text) => {
    await this.setState({
      listData: {
        ...this.state.listData,
        thongTinChung: {
          ...this.state.listData.thongTinChung,
          cmnd: text
        }
      }
    })

    //Tạo đối tượng bệnh nhân được cập nhật
    var patient = await {
      MaBenhNhan: this.state.listData.thongTinChung.sdt,
      Avatar: this.state.listData.thongTinChung.avatar,
      HoTen: this.state.listData.thongTinChung.hoTen,
      GioiTinh: this.state.listData.thongTinChung.gioiTinh,
      NgaySinh: this.state.listData.thongTinChung.ngaySinh,
      CMND: this.state.listData.thongTinChung.cmnd,
      DiaChi: this.state.listData.thongTinChung.diaChi,
      Email: this.state.listData.lienHe.email,
      NgheNghiep: this.state.listData.thongTinChung.ngheNghiep,
      NhomMau: this.state.listData.thongTinChung.nhomMau,
      DiUngThuoc: 'Không hỗ trợ',
    };
    //Update xuống DB
    await this.updateBenhNhan(patient);
  }

  onUpdateDiaChiParent = async (text) => {
    await this.setState({
      listData: {
        ...this.state.listData,
        thongTinChung: {
          ...this.state.listData.thongTinChung,
          diaChi: text
        }
      }
    })

    //Tạo đối tượng bệnh nhân được cập nhật
    var patient = await {
      MaBenhNhan: this.state.listData.thongTinChung.sdt,
      Avatar: this.state.listData.thongTinChung.avatar,
      HoTen: this.state.listData.thongTinChung.hoTen,
      GioiTinh: this.state.listData.thongTinChung.gioiTinh,
      NgaySinh: this.state.listData.thongTinChung.ngaySinh,
      CMND: this.state.listData.thongTinChung.cmnd,
      DiaChi: this.state.listData.thongTinChung.diaChi,
      Email: this.state.listData.lienHe.email,
      NgheNghiep: this.state.listData.thongTinChung.ngheNghiep,
      NhomMau: this.state.listData.thongTinChung.nhomMau,
      DiUngThuoc: 'Không hỗ trợ',
    };
    //Update xuống DB
    await this.updateBenhNhan(patient);
  };

  onUpdateNgheNghiepParent = async (text) => {
    await this.setState({
      listData: {
        ...this.state.listData,
        thongTinChung: {
          ...this.state.listData.thongTinChung,
          ngheNghiep: text
        }
      }
    })

    //Tạo đối tượng bệnh nhân được cập nhật
    var patient = await {
      MaBenhNhan: this.state.listData.thongTinChung.sdt,
      Avatar: this.state.listData.thongTinChung.avatar,
      HoTen: this.state.listData.thongTinChung.hoTen,
      GioiTinh: this.state.listData.thongTinChung.gioiTinh,
      NgaySinh: this.state.listData.thongTinChung.ngaySinh,
      CMND: this.state.listData.thongTinChung.cmnd,
      DiaChi: this.state.listData.thongTinChung.diaChi,
      Email: this.state.listData.lienHe.email,
      NgheNghiep: this.state.listData.thongTinChung.ngheNghiep,
      NhomMau: this.state.listData.thongTinChung.nhomMau,
      DiUngThuoc: 'Không hỗ trợ',
    };
    //Update xuống DB
    await this.updateBenhNhan(patient);
  }

  onUpdateNhomMauParent = async (text) => {
    await this.setState({
      listData: {
        ...this.state.listData,
        thongTinChung: {
          ...this.state.listData.thongTinChung,
          nhomMau: text
        }
      }
    })

    //Tạo đối tượng bệnh nhân được cập nhật
    var patient = await {
      MaBenhNhan: this.state.listData.thongTinChung.sdt,
      Avatar: this.state.listData.thongTinChung.avatar,
      HoTen: this.state.listData.thongTinChung.hoTen,
      GioiTinh: this.state.listData.thongTinChung.gioiTinh,
      NgaySinh: this.state.listData.thongTinChung.ngaySinh,
      CMND: this.state.listData.thongTinChung.cmnd,
      DiaChi: this.state.listData.thongTinChung.diaChi,
      Email: this.state.listData.lienHe.email,
      NgheNghiep: this.state.listData.thongTinChung.ngheNghiep,
      NhomMau: this.state.listData.thongTinChung.nhomMau,
      DiUngThuoc: 'Không hỗ trợ',
    };
    //Update xuống DB
    await this.updateBenhNhan(patient);
  }

  onUpdateEmailParent = async (text) => {
    await this.setState({
      listData: {
        ...this.state.listData,
        lienHe: {
          ...this.state.listData.lienHe,
          email: text
        }
      }
    })

    //Tạo đối tượng bệnh nhân được cập nhật
    var patient = await {
      MaBenhNhan: this.state.listData.thongTinChung.sdt,
      Avatar: this.state.listData.thongTinChung.avatar,
      HoTen: this.state.listData.thongTinChung.hoTen,
      GioiTinh: this.state.listData.thongTinChung.gioiTinh,
      NgaySinh: this.state.listData.thongTinChung.ngaySinh,
      CMND: this.state.listData.thongTinChung.cmnd,
      DiaChi: this.state.listData.thongTinChung.diaChi,
      Email: this.state.listData.lienHe.email,
      NgheNghiep: this.state.listData.thongTinChung.ngheNghiep,
      NhomMau: this.state.listData.thongTinChung.nhomMau,
      DiUngThuoc: 'Không hỗ trợ',
    };
    //Update xuống DB
    await this.updateBenhNhan(patient);
  }

  onUpdatePasswordParent = async (text) => {
    await this.setState({
      listData: {
        ...this.state.listData,
        taiKhoan: {
          ...this.state.listData.taiKhoan,
          password: text
        }
      }
    })

    //Tạo đối tượng bệnh nhân được cập nhật
    var patient = await {
      MaBenhNhan: this.state.listData.thongTinChung.sdt,
      Password: this.state.listData.taiKhoan.password
    };
    //Update xuống DB
    await this.apiServices.changeBenhNhanPassword(patient)
      .then((result) => {
        if (result !== null) {
          // Cập nhật thành công
          alert("Cập nhật mật khẩu thành công!");
        }
        else {
          // Cập nhật thất bại
          alert("Cập nhật mật khẩu thất bại!");
        }
      })
  }

  onLogoutParent = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('LoginStack');
  }

  onUpdateGenParent = async (sex) => {
    await this.setState({
      listData: {
        ...this.state.listData,
        thongTinChung: {
          ...this.state.listData.thongTinChung,
          gioiTinh: sex
        }
      }
    })


    //Tạo đối tượng bệnh nhân được cập nhật
    var patient = await {
      MaBenhNhan: this.state.listData.thongTinChung.sdt,
      Avatar: this.state.listData.thongTinChung.avatar,
      HoTen: this.state.listData.thongTinChung.hoTen,
      GioiTinh: this.state.listData.thongTinChung.gioiTinh,
      NgaySinh: this.state.listData.thongTinChung.ngaySinh,
      CMND: this.state.listData.thongTinChung.cmnd,
      DiaChi: this.state.listData.thongTinChung.diaChi,
      Email: this.state.listData.lienHe.email,
      NgheNghiep: this.state.listData.thongTinChung.ngheNghiep,
      NhomMau: this.state.listData.thongTinChung.nhomMau,
      DiUngThuoc: 'Không hỗ trợ',
    };
    //Update xuống DB
    await this.updateBenhNhan(patient);
  }
  updateFullName = async () => {
    this.setState({ isVisibleEditNameScreen: false });  //Ẩn màn hình sửa tên

    await this.setState({
      listData: {
        ...this.state.listData,
        thongTinChung: {
          ...this.state.listData.thongTinChung,
          hoTen: this.state.fullName
        }
      }
    })


    //Tạo đối tượng bệnh nhân được cập nhật
    var patient = await {
      MaBenhNhan: this.state.listData.thongTinChung.sdt,
      Avatar: this.state.listData.thongTinChung.avatar,
      HoTen: this.state.listData.thongTinChung.hoTen,
      GioiTinh: this.state.listData.thongTinChung.gioiTinh,
      NgaySinh: this.state.listData.thongTinChung.ngaySinh,
      CMND: this.state.listData.thongTinChung.cmnd,
      DiaChi: this.state.listData.thongTinChung.diaChi,
      Email: this.state.listData.lienHe.email,
      NgheNghiep: this.state.listData.thongTinChung.ngheNghiep,
      NhomMau: this.state.listData.thongTinChung.nhomMau,
      DiUngThuoc: 'Không hỗ trợ',
    };
    //Update xuống DB
    await this.updateBenhNhan(patient);
  }
  //Cập nhật dữ liệu xuống database khi state có sự thay đổi
  async updateBenhNhan(benhNhan) {
    await this.apiServices.updateProfileBenhNhan(benhNhan)
      .then((result) => {
        if (result !== null) {
          // Cập nhật thành công
          // alert("Cập nhật dữ liệu thành công!");
        }
        else {
          // Cập nhật thất bại
          // alert("Cập nhật dữ liệu thất bại!");
        }
      })
  }
  //Thuc hien cong viec pull data tu server ve client
  async componentDidMount() {
    const userId = await AsyncStorage.getItem('UserId');
    var info = {
      // Gia su mot benh nhan co ma benh nhan nhu the nay
      MaBenhNhan: userId,// chỗ này chưa lấy từ global xuống
    }
    this.apiServices.getBenhNhanInfo(info)
      .then((result) => {
        if (result !== null) {
          var pullResult = result[0];
          let NgaySinhT = new Date(pullResult.NgaySinh);
          var source = pullResult.Avatar;
          // alert(pullResult.GioiTinh)
          this.setState({
            listData: {
              thongTinChung: {
                anhBia: require("../images/hinh_bien.jpg"),
                avatar: source,
                hoTen: pullResult.HoTen,
                sdt: pullResult.MaBenhNhan,
                cmnd: (pullResult.CMND === null) ? "Chưa có dữ liệu" : pullResult.CMND,
                gioiTinh: (pullResult.GioiTinh === null) ? 1 : pullResult.GioiTinh.data[0],
                ngaySinh: (pullResult.NgaySinh === null) ? "Chưa có dữ liệu" : (NgaySinhT.getFullYear() + '-' + (NgaySinhT.getMonth() + 1) + '-' + NgaySinhT.getDate()),
                diaChi: (pullResult.DiaChi === null) ? "Chưa có dữ liệu" : pullResult.DiaChi,
                ngheNghiep: (pullResult.NgheNghiep === null) ? "Chưa có dữ liệu" : pullResult.NgheNghiep,
                nhomMau: (pullResult.NhomMau === null) ? "Chưa có dữ liệu" : pullResult.NhomMau,
              },
              lienHe: {
                email: (pullResult.Email === null) ? "Chưa có dữ liệu" : pullResult.Email,
              },
              taiKhoan: {
                password: pullResult.Password,
              }
            }
          })
        }
        else alert("Tải dữ liệu thất bại!");
      })
  }

  render() {
    return (
      
      <ScrollView>
        <Overlay isVisible={this.state.isVisibleEditNameScreen}
          borderRadius={10}
          height={200}
          onBackdropPress={() => { this.setState({ isVisibleEditNameScreen: false }) }}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Sửa tên</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
              <Input onChangeText={(text) => this.setState({ fullName: text })} placeholder='Nhập tên của bạn'>{this.state.listData.thongTinChung.hoTen}</Input>
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={() => this.updateFullName()}
            />
          </ScrollView>
        </Overlay>
        <View>
          {/* Anh bia */}
          <Avatar
            activeOpacity={0.7}
            containerStyle={styles.background}
            source={this.state.listData.thongTinChung.anhBia}
          />
          {/* Anh dai dien */}
          <Avatar
            title={this.state.listData.thongTinChung.hoTen[0]}
            showEditButton
            rounded
            size={130}
            activeOpacity={0.7}
            containerStyle={styles.avatar}
            source={{ uri: 'data:image/jpeg;base64,' + this.state.listData.thongTinChung.avatar }}
            onEditPress={() => this.handleChange()}
          />

        </View>
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Text onPress={() => { this.setState({ isVisibleEditNameScreen: true }) }} style={styles.name}>{this.state.listData.thongTinChung.hoTen}</Text>
          <Text style={styles.phone}>{this.state.listData.thongTinChung.sdt}</Text>
        </View>
        <MyListCards
          profile={this.state.listData}
          showDialogChangePassword={this.state.isVisible}
          onUpdateGenParent={this.onUpdateGenParent}
          onUpdateBirthdayParent={this.onUpdateBirthdayParent}
          onUpdateCmndParent={this.onUpdateCmndParent}
          onUpdateDiaChiParent={this.onUpdateDiaChiParent}
          onUpdateNhomMauParent={this.onUpdateNhomMauParent}
          onUpdateNgheNghiepParent={this.onUpdateNgheNghiepParent}
          onUpdateEmailParent={this.onUpdateEmailParent}
          onUpdatePasswordParent={this.onUpdatePasswordParent}
          onLogoutParent={this.onLogoutParent}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  // Custom Card
  removeCardBorder: {
    borderColor: 'transparent',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .0,
    shadowRadius: 0,
    elevation: 0
  },

  customText: {
    fontSize: 20,
    color: 'black',
  },

  customTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  customTextTitle: {
    marginLeft: 15,
    fontWeight: 'bold',
    color: 'gray'
  },

  // Custom buttons
  customBtns: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  // customBtnView: {
  //   flex: 0.5,
  // },
  customBtnText: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#007AFF',
    fontWeight: 'bold',
    paddingHorizontal: 10
  },



  //--------------------//
  cardAccountInfo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 60,

  },
  cardContacts: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 90,
    marginTop: 10,
    padding: 10,
  },

  cardGeneralInfo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 150,
    padding: 10,
  },
  cardTittle: {
    color: "#808080",
    fontSize: 18,
    marginBottom: 5,
  },

  container: {
    backgroundColor: "#DCDCDC",
  },

  my_button: {
    borderRadius: 50,
    marginRight: 10,
    width: 130,
  },


  background: {
    height: 120,
    width: _width,
  },
  avatar: {
    borderWidth: 4,
    borderColor: "white",
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 30,

  },
  body: {
    marginTop: 10,
    padding: 10,
  },
  bodyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  name: {
    marginTop: 10,
    fontSize: 28,
    color: "#696969",
    fontWeight: '600',
  },
  phone: {
    fontSize: 16,
    color: "#00BFFF",
  },
  // Datetime
  btnCalendar: {
    position: 'absolute',
    top: 33,
    right: 50,
  },
});