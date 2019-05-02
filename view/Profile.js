/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component, PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView, Alert } from 'react-native';

import { Button, Avatar, Image, ListItem, Divider, Card, Icon } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



//Chiều dài và chiều rộng của màn hình
var _height = Dimensions.get('window').height;
var _width = Dimensions.get('window').width;


var dataSource = {
  thongTinChung: {
    anhBia: require("../images/hinh_bien.jpg"),
    avatar: require("../images/MyAvt.jpg"),
    hoTen: "Trần Minh Cường",
    sdt: "0975206769",
    cmnd: "123456789",
    gioiTinh: "Nam",
    ngaySinh: "26/12/1997",
    diaChi: "Long Hà, Bình Phước",
    ngheNghiep: "Sinh viên",
    nhomMau: "AB",
    tinhTrang: "Bình thường",
  },
  lienHe: {
    email: "minhcuongit97@gmail.com",
  },
  taiKhoan: {
    username: "minhcuong",
    password: "12345",
  }
}

class CardItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListItem
        title={
          <View>
            <Text style={styles.customText}>
              {this.props.itemDetail}
            </Text>
          </View>
        }
        subtitle={this.props.itemTitle}
        rightIcon={
          <AntDesign name='edit' size={25} color='rgba(74, 195, 180, 1)' onPress={() => { alert(this.props.itemDetail) }}  ></AntDesign>

        }

      />
    )
  }
}

class MyListCards extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Card title={
          <View style={styles.customTitle}>
            <AntDesign name="profile" size={20} />
            <Text style={[styles.customText, styles.customTextTitle]}>Thông Tin Cơ Bản</Text>
          </View>
        }
          containerStyle={styles.removeCardBorder}
        >
          <Divider />
          <CardItem itemDetail={this.props.profile.thongTinChung.gioiTinh} itemTitle='Giới tính' />
          <CardItem itemDetail={this.props.profile.thongTinChung.cmnd} itemTitle='CMND' />
          <CardItem itemDetail={this.props.profile.thongTinChung.ngaySinh} itemTitle='Ngày sinh' />
          <CardItem itemDetail={this.props.profile.thongTinChung.diaChi} itemTitle='Địa chỉ' />
          <CardItem itemDetail={this.props.profile.thongTinChung.ngheNghiep} itemTitle='Nghề nghiệp' />
          <CardItem itemDetail={this.props.profile.thongTinChung.nhomMau} itemTitle='Nhóm máu' />
          <CardItem itemDetail={this.props.profile.thongTinChung.tinhTrang} itemTitle='Tình trạng' />
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
          <CardItem itemDetail={this.props.profile.lienHe.email} itemTitle='Email' />
        </Card>

        <Divider style={{ marginHorizontal: 30 }} />

        {/* Doi mat khau */}
        <ListItem containerStyle={{ marginLeft: 20 }}

          title={
            <View >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', }}>Đổi mật khẩu</Text>
            </View>}


          leftIcon={
            <MaterialCommunityIcons name='textbox-password' size={25} color='rgba(74, 195, 180, 1)'></MaterialCommunityIcons>
          }></ListItem>
        {/* Dang xuat */}
        <ListItem containerStyle={{ marginLeft: 20 }}

          title={
            <View >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', }}>Đăng xuất</Text>
            </View>}


          leftIcon={
            <MaterialCommunityIcons name='logout' size={25} color='rgba(74, 195, 180, 1)'></MaterialCommunityIcons>
          }></ListItem>
      </View>
    )
  }
}

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { listData: null };
  }

  componentWillMount() {
    this.setState({
      listData: dataSource,
    })
  }

  handleDoiMatKhau = () => {
    this.props.navigation.navigate('ChangePassword')
  };
  handleDoiThongTin = () => {
    this.props.navigation.navigate('ChangeInfomation')
  };

  handleEditButtonAvatar = () => {
    alert("Đổi ảnh đại diện");
  }
  handleXemAvatar = () => {
    alert("Xem đại diện");
  }
  handleXemAnhBia = () => {
    alert("Xem ảnh bìa");
  }
  handleEditButtonAnhBia = () => {
    alert("Đổi ảnh bìa");
  }

  render() {
    // alert(this.state.listData.thongTinChung.anhBia);
    return (
      <ScrollView>
        <View>
          <Avatar
            showEditButton activeOpacity={0.7}
            containerStyle={styles.background}
            source={this.state.listData.thongTinChung.anhBia}

            onEditPress={this.handleEditButtonAvatar}
            onLongPress={this.handleXemAnhBia}
          />
          <Avatar
            showEditButton
            rounded
            size={130}
            activeOpacity={0.7}
            containerStyle={styles.avatar}
            source={this.state.listData.thongTinChung.avatar}
            onEditPress={this.handleEditButtonAnhBia}
            onLongPress={this.handleXemAvatar}
          />

        </View>
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Text style={styles.name}>{this.state.listData.thongTinChung.hoTen}</Text>
          <Text style={styles.phone}>{this.state.listData.thongTinChung.sdt}</Text>
        </View>
        <MyListCards profile={this.state.listData} />
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
});