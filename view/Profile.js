/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView, Alert, TouchableOpacity } from 'react-native';

import { Button, Avatar, Image, ListItem, Divider, Card, Overlay, Input, CheckBox } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ApiServices from '../services/api';

import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from "react-native-modal-datetime-picker";
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Chọn hình đại diện',
  storageOptions: {
    skipBackup: false,
    path: 'images',
  },
  mediaType: 'photo',
  cancelButtonTitle: 'Hủy',
  takePhotoButtonTitle:'Chụp ảnh mới',
  chooseFromLibraryButtonTitle:'Chọn từ thư viện'
};


//Chiều dài và chiều rộng của màn hình
var _height = Dimensions.get('window').height;
var _width = Dimensions.get('window').width;


class CardItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleGioiTinhScreen:false,
      isVisibleCMNDScreen: false,
      isVisibleDiaChiScreen: false,
      isVisibleNgheNghiepScreen: false,
      isVisibleNhomMauScreen: false,
      isVisibleEmailScreen: false,
      
      isDateTimePickerVisible: false, //ẩn hiện datetime picker

      isMale: false,  //Tam thoi cu khoi la false
      birthday: '',
      cmnd:'',
      diaChi:'',
      ngheNghiep:'',
      nhomMau:'',
      email:'',
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
        this.setState({isVisibleGioiTinhScreen:true});
        if (oldData == 'Nam') {
          this.setState({
            isMale: true
          })
        }else{
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
      birthday: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
      
    })
    // alert(this.state.birthday);
    this.hideDateTimePicker();
    this.props.onUpdateBirthday(this.state.birthday);
  };
  //Xử lý cập nhật giới tính
  handleUpdateGen = () =>{
    this.setState({ isVisibleGioiTinhScreen: false });  //Bấm nút thì tắt màn hình đi
    this.props.onUpdateGen(this.state.isMale? "Nam" : "Nữ");
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
                checked = {this.state.isMale}
                onPress={() => {this.setState({isMale: true})}}
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
              buttonStyle={{ width: 120, alignSelf:'center', marginTop:20 }}
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
              <Input onChangeText={(text) => this.setState({ cmnd:text })} placeholder='CMND'>{this.props.itemDetail}</Input>
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={ this.handleUpdateCmnd }
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
              onPress={ this.handleUpdateDiaChi }
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
      isVisibleGioiTinhScreen: false,
      profile: props.profile,
    };

  }

  componentWillReceiveProps(props) {
    this.setState({
      profile: props.profile,
    });
  }

  render() {
    return (
      <View>
        <Overlay isVisible={this.state.isVisiblePasswordScreen}
        borderRadius = {10}
        height = {250}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Đổi mật khẩu</Text>
            <Input placeholder='Nhập mật khẩu cũ' secureTextEntry={true}></Input>
            <Input placeholder='Nhập mật khẩu mới' secureTextEntry = {true}></Input>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop:10}}>
              <Button
                type='outline'
                title="Đồng ý"
                buttonStyle = {{width:120}}
                onPress = {()=>{alert("Thực hiện đổi mật khẩu!")}}
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
        <Card title={
          <View style={styles.customTitle}>
            <AntDesign name="profile" size={20} />
            <Text style={[styles.customText, styles.customTextTitle]}>Thông Tin Cơ Bản</Text>
          </View>
        }
          containerStyle={styles.removeCardBorder}
        >
          <Divider />
          <CardItem id={1} onUpdateGen = {this.props.onUpdateGenParent} itemDetail={this.state.profile.thongTinChung.gioiTinh} itemTitle='Giới tính' />
          <CardItem id={2} onUpdateCmnd = {this.props.onUpdateCmndParent} itemDetail={this.state.profile.thongTinChung.cmnd} itemTitle='CMND' />
          <CardItem id={3} onUpdateBirthday={this.props.onUpdateBirthdayParent} itemDetail={this.state.profile.thongTinChung.ngaySinh  } itemTitle='Ngày sinh' />
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

          onPress={() => { this.setState({ isVisiblePasswordScreen:true})}}

          leftIcon={
            <MaterialCommunityIcons name='textbox-password' size={25} color='rgba(74, 195, 180, 1)'></MaterialCommunityIcons>
          }></ListItem>
        {/* Dang xuat */}
        <TouchableOpacity onPress={() => { alert("Thực hiện đăng xuất khỏi hệ thống!") }}>
          <ListItem containerStyle={{ marginLeft: 20 }}

          title={
              
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', }}>Đăng xuất</Text>
          }
          leftIcon={
            <MaterialCommunityIcons name='logout' size={25} color='rgba(74, 195, 180, 1)'></MaterialCommunityIcons>
          }
          
          // onPress = {()=>{alert("Thực hiện đăng xuất khỏi hệ thống!")}}
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
          gioiTinh: "",
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
          username: "",
          password: "",
        }
      },

     };

    this.onUpdateNgheNghiepParent = this.onUpdateNgheNghiepParent.bind(this);
    this.onUpdateNhomMauParent = this.onUpdateNhomMauParent.bind(this);
    this.onUpdateEmailParent = this.onUpdateEmailParent.bind(this);
    this.onUpdateDiaChiParent = this.onUpdateDiaChiParent.bind(this);
    this.onUpdateCmndParent = this.onUpdateCmndParent.bind(this);
    this.onUpdateGenParent = this.onUpdateGenParent.bind(this);
    this.onUpdateBirthdayParent = this.onUpdateBirthdayParent.bind(this);
    this.apiServices = ApiServices();
  }

  handleChange = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // var source = { uri: response.uri };

        // You can also display the image using data:
        var source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          listData:{
            ...this.state.listData,
            thongTinChung:{
              ...this.state.listData.thongTinChung,
              avatar:source
            }
          }
        });
        // alert(source.uri);
      }
    });
  }

  onUpdateBirthdayParent = (textDate) => {
    this.setState({
      listData:{
        ...this.state.listData,
        thongTinChung:{
          ...this.state.listData.thongTinChung,
          ngaySinh: textDate
        }
      }
    })
  }
  
  onUpdateCmndParent = (text) => {
    this.setState({
      listData:{
        ...this.state.listData,
        thongTinChung : {
          ...this.state.listData.thongTinChung,
          cmnd: text
        }
      }
    })
  }

  onUpdateDiaChiParent = (text) => {
    this.setState({
      listData: {
        ...this.state.listData,
        thongTinChung: {
          ...this.state.listData.thongTinChung,
          diaChi: text
        }
      }
    })
  }

  onUpdateNgheNghiepParent = (text) => {
    this.setState({
      listData: {
        ...this.state.listData,
        thongTinChung: {
          ...this.state.listData.thongTinChung,
          ngheNghiep: text
        }
      }
    })
  }

  onUpdateNhomMauParent = (text) => {
    this.setState({
      listData: {
        ...this.state.listData,
        thongTinChung: {
          ...this.state.listData.thongTinChung,
          nhomMau: text
        }
      }
    })
  }

  onUpdateEmailParent = (text) => {
    this.setState({
      listData: {
        ...this.state.listData,
        lienHe: {
          ...this.state.listData.lienHe,
          email: text
        }
      }
    })
  }

  onUpdateGenParent = (sex) => {
    this.setState({
      listData: {
        ...this.state.listData,
        thongTinChung: {
          ...this.state.listData.thongTinChung,
          gioiTinh: sex
        }
      }
    })
    // alert(this.state.listData.thongTinChung.gioiTinh)

  }
  //Thuc hien cong viec pull data tu server ve client
  componentDidMount() {
    var info = {
      // Gia su mot benh nhan co ma benh nhan nhu the nay
      MaBenhNhan: '0912345678',
      Password: ''
    }
    this.apiServices.getBenhNhanInfo(info)
      .then((result) => {
        if (result !== null) {
          // alert("Doi mat khau thanh cong!");
          var pullResult = result[0];
          let NgaySinhT = new Date(pullResult.NgaySinh);

          this.setState({
            listData: {
              thongTinChung: {
                anhBia: require("../images/hinh_bien.jpg"),
                avatar: pullResult.Avatar,
                hoTen: pullResult.HoTen,
                sdt: pullResult.MaBenhNhan,
                cmnd: pullResult.CMND,
                gioiTinh: pullResult.GioiTinh.data[0]===1?'Nam':'Nữ',
                ngaySinh: NgaySinhT.getDate() + '/' + (NgaySinhT.getMonth()+1) + '/'+ NgaySinhT.getFullYear(),
                diaChi: pullResult.DiaChi,
                ngheNghiep: pullResult.NgheNghiep,
                nhomMau: pullResult.NhomMau,
              },
              lienHe: {
                email: pullResult.Email,
              },
              taiKhoan: {
                username: "minhcuong",
                password: "12345",
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
            source={this.state.listData.thongTinChung.avatar}
            onEditPress={() => this.handleChange()}
          />

        </View>
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Text style={styles.name}>{this.state.listData.thongTinChung.hoTen}</Text>
          <Text style={styles.phone}>{this.state.listData.thongTinChung.sdt}</Text>
        </View>
        <MyListCards 
          profile={this.state.listData} 
          showDialogChangePassword = {this.state.isVisible} 
          onUpdateGenParent={this.onUpdateGenParent}
          onUpdateBirthdayParent = {this.onUpdateBirthdayParent}
          onUpdateCmndParent = {this.onUpdateCmndParent}
          onUpdateDiaChiParent={this.onUpdateDiaChiParent}
          onUpdateNhomMauParent={this.onUpdateNhomMauParent}
          onUpdateNgheNghiepParent={this.onUpdateNgheNghiepParent}
          onUpdateEmailParent={this.onUpdateEmailParent}
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