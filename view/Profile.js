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

import { Button, Avatar, Image, ListItem, Divider, Card, Icon, Overlay, Input, CheckBox } from 'react-native-elements';
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
    this.state={
      isVisibleGioiTinhScreen:false,
      isVisibleCMNDScreen: false,
      isVisibleNgaySinhScreen: false,
      isVisibleDiaChiScreen: false,
      isVisibleNgheNghiepScreen: false,
      isVisibleNhomMauScreen: false,
      isVisibleTinhTrangScreen: false,
      isVisibleEmailScreen: false,
    }
  }

  xuLyChinhSua(type, oldData) {
    switch (type) {
      //Sua gioi tinh
      case 1:
        this.setState({isVisibleGioiTinhScreen:true});
        break;
        //Sua CMND
      case 2:
        this.setState({ isVisibleCMNDScreen: true });
        break;
        //Sua ngay sinh
      case 3:
        this.setState({ isVisibleNgaySinhScreen: true });
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
                checked
              />
              <CheckBox
                title="Nữ"
              />
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf:'center', marginTop:20 }}
              onPress={() => { alert("Thực hiện cập nhật!") }}
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
              <Input placeholder='CMND'>{this.props.itemDetail}</Input>
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={() => { alert("Thực hiện cập nhật!") }}
            />
          </ScrollView>
        </Overlay>

        <Overlay isVisible={this.state.isVisibleNgaySinhScreen}
          borderRadius={10}
          height={200}
          onBackdropPress={() => { this.setState({ isVisibleNgaySinhScreen: false }) }}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Ngày sinh</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
              <Input placeholder='CMND'>{this.props.itemDetail}</Input>
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={() => { alert("Thực hiện cập nhật!") }}
            />
          </ScrollView>
        </Overlay>

        <Overlay isVisible={this.state.isVisibleDiaChiScreen}
          borderRadius={10}
          height={200}
          onBackdropPress={() => { this.setState({ isVisibleDiaChiScreen: false }) }}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Ngày sinh</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
              <Input placeholder='CMND'>{this.props.itemDetail}</Input>
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={() => { alert("Thực hiện cập nhật!") }}
            />
          </ScrollView>
        </Overlay>

        <Overlay isVisible={this.state.isVisibleNgheNghiepScreen}
          borderRadius={10}
          height={200}
          onBackdropPress={() => { this.setState({ isVisibleNgheNghiepScreen: false }) }}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Ngày sinh</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
              <Input placeholder='CMND'>{this.props.itemDetail}</Input>
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={() => { alert("Thực hiện cập nhật!") }}
            />
          </ScrollView>
        </Overlay>

        <Overlay isVisible={this.state.isVisibleNhomMauScreen}
          borderRadius={10}
          height={200}
          onBackdropPress={() => { this.setState({ isVisibleNhomMauScreen: false }) }}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Ngày sinh</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
              <Input placeholder='CMND'>{this.props.itemDetail}</Input>
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={() => { alert("Thực hiện cập nhật!") }}
            />
          </ScrollView>
        </Overlay>

        <Overlay isVisible={this.state.isVisibleTinhTrangScreen}
          borderRadius={10}
          height={200}
          onBackdropPress={() => { this.setState({ isVisibleTinhTrangScreen: false }) }}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Ngày sinh</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
              <Input placeholder='CMND'>{this.props.itemDetail}</Input>
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={() => { alert("Thực hiện cập nhật!") }}
            />
          </ScrollView>
        </Overlay>

        <Overlay isVisible={this.state.isVisibleEmailScreen}
          borderRadius={10}
          height={200}
          onBackdropPress={() => { this.setState({ isVisibleEmailScreen: false }) }}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Ngày sinh</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
              <Input placeholder='CMND'>{this.props.itemDetail}</Input>
            </View>
            <Button
              type='outline'
              title="Cập nhật"
              buttonStyle={{ width: 120, alignSelf: 'center', marginTop: 20 }}
              onPress={() => { alert("Thực hiện cập nhật!") }}
            />
          </ScrollView>
        </Overlay>
        {/* Hiển thị item cho từng thành phần */}
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
            <AntDesign name='edit' size={25} color='rgba(74, 195, 180, 1)' onPress={() => { this.xuLyChinhSua(this.props.id, this.props.itemDetail) }}  ></AntDesign>

          }

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
    };
  }

  render() {
    return (
      <View>
        <Overlay isVisible={this.state.isVisiblePasswordScreen}
        borderRadius = {10}
        height = {250}>
          <ScrollView>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 25 }}>Đổi mật khẩu</Text>
            <Input placeholder='Nhập mật khẩu cũ'></Input>
            <Input placeholder='Nhập mật khẩu mới'></Input>
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
          <CardItem id={1} itemDetail={this.props.profile.thongTinChung.gioiTinh} itemTitle='Giới tính' />
          <CardItem id={2} itemDetail={this.props.profile.thongTinChung.cmnd} itemTitle='CMND' />
          <CardItem id={3} itemDetail={this.props.profile.thongTinChung.ngaySinh} itemTitle='Ngày sinh' />
          <CardItem id={4} itemDetail={this.props.profile.thongTinChung.diaChi} itemTitle='Địa chỉ' />
          <CardItem id={5} itemDetail={this.props.profile.thongTinChung.ngheNghiep} itemTitle='Nghề nghiệp' />
          <CardItem id={6} itemDetail={this.props.profile.thongTinChung.nhomMau} itemTitle='Nhóm máu' />
          <CardItem id={7} itemDetail={this.props.profile.thongTinChung.tinhTrang} itemTitle='Tình trạng' />
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
          <CardItem id={8} itemDetail={this.props.profile.lienHe.email} itemTitle='Email' />
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
        <ListItem containerStyle={{ marginLeft: 20 }}

          title={
            <View >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', }}>Đăng xuất</Text>
            </View>}
          
          leftIcon={
            <MaterialCommunityIcons name='logout' size={25} color='rgba(74, 195, 180, 1)'></MaterialCommunityIcons>
          }
          
          onPress = {()=>{alert("Thực hiện đăng xuất khỏi hệ thống!")}}
          ></ListItem>
      </View>
    )
  }
}

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      listData: null,
     };
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
        <MyListCards profile={this.state.listData} showDialogChangePassword = {this.state.isVisible} />
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