/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';

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


  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <Avatar
          showEditButton activeOpacity={0.7}
          containerStyle={styles.background}
          source={require('../images/hinh_bien.jpg')}
        />
        <Avatar
          showEditButton
          rounded
          size={130}
          activeOpacity={0.7}
          containerStyle={styles.avatar} source={require('../images/MyAvt.jpg')}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>Trần Minh Cường</Text>
            <Text style={styles.phone}>0975206769</Text>
          </View>
          <View style={styles.moreAbout}>
            <Text style={styles.textInfo}>Ngày sinh: 26-12-1997</Text>
            <Text style={styles.textInfo}>Giới tính: Nam</Text>
            <Text style={styles.textInfo}>Địa chỉ: Bình Phước</Text>
            <Text style={styles.textInfo}>CMND:123456789</Text>
            <Text style={styles.textInfo}>Email:MinhCuongIT97@gmail.com</Text>

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
                onPress = {this.handleDoiMatKhau}
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
  my_button: {
    marginTop: 10,
    borderRadius: 50,
    marginRight: 5,
    width: 130,
  },

  moreAbout: {
    marginTop: 0,
    alignItems: 'center',
  },

  textInfo: {
    fontSize: 16,
    marginTop: 8,
    color: "#696969",
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