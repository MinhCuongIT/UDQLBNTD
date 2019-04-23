/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView, Alert} from 'react-native';

import { Button, Avatar, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

//Chiều dài và chiều rộng của màn hình
var _height = Dimensions.get('window').height;
var _width = Dimensions.get('window').width;

export default class Profile extends Component {

  constructor(props) {
    super(props);
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
    return (
      <ScrollView>
      <View style={styles.container}>
        <Avatar
          showEditButton activeOpacity={0.7}
          containerStyle={styles.background}
          source={require('../images/hinh_bien.jpg')}
          onEditPress = {this.handleEditButtonAvatar}
          onLongPress = {this.handleXemAnhBia}
        />
        <Avatar
          showEditButton
          rounded
          size={130}
          activeOpacity={0.7}
          containerStyle={styles.avatar} source={require('../images/MyAvt.jpg')}
          onEditPress = {this.handleEditButtonAnhBia}
          onLongPress = {this.handleXemAvatar}
        />
        {/* Hiển thị phần thông tin tên và sđt */}
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>Trần Minh Cường</Text>
            <Text style={styles.phone}>0975206769</Text>
          </View>
          {/* Hiển thị thông tin chi tiết */}
              {/* Thông tin chung */}
            <View style={styles.cardGeneralInfo}>
              <Text style={styles.cardTittle}>Thông tin chung</Text>
              <Text>Giới tính: Nam</Text>
              <Text>Nơi sinh: Bình Phước</Text>
              <Text>Nghề nghiệp: Sinh viên</Text>
              <Text>Nhóm máu: AB</Text>
              <Text>Tình trạng bệnh: Bình thường</Text>
            </View>
            {/* Thông tin liên hệ */}
            <View style={styles.cardContacts}>
              <Text style={styles.cardTittle}>Liên hệ</Text>
              <Text>CMND: 123456789</Text>
              <Text>Email: MinhCuongIT97@gmail.com</Text>
            </View>
            {/* Thông tin tài khoản */}
            <View style={styles.cardAccountInfo}>
              {/* Hiển thị hai nút nhấn */}
              <View style={{ flexDirection: 'row', }}>
                <Button
                  buttonStyle={styles.my_button}
                  icon={
                    <Icon
                      style={{ marginRight: 5, }}
                      name="gear"
                      size={15}
                      color="white"
                    />
                  }
                  title="Đổi mật khẩu"
                  onPress={this.handleDoiMatKhau}
                />

                <Button
                  buttonStyle={styles.my_button}
                  icon={
                    <Icon
                      style={{ marginRight: 5, }}
                      name="pencil"
                      size={15}
                      color="white"
                    />
                  }
                  title="Chỉnh sửa"
                  onPress={this.handleDoiThongTin}
                />
              </View>
            </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  cardAccountInfo:{
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 60,
    marginTop: 10,
    padding: 10,
  },
  cardContacts:{
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 90,
    marginTop: 10,
    padding:10,
  },

  cardGeneralInfo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 150,
    padding:10,
  },
  cardTittle: {
    color: "#808080",
    fontSize: 18,
    marginBottom: 5,
  },

  container : {
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
    padding:10,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  name: {
    marginTop:10,
    fontSize: 28,
    color: "#696969",
    fontWeight: '600',
  },
  phone: {
    fontSize: 16,
    color: "#00BFFF",
  },
});