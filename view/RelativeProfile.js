import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert, AsyncStorage } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Card, ListItem, Divider, Button } from "react-native-elements";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { DateTime } from './ChatScreen';
import ApiFollow from '../services/api';

class IntroCard extends PureComponent {
  constructor (props) {
    super(props);

    this.apiFollow = ApiFollow();
  }

  render () {
    const buttonRela = this.props.typeRelationship==='add'
      ? 
      <View style={{flexDirection: 'row'}}>
      <MaterialCommunityIcons.Button
          name="account-plus-outline"
          backgroundColor="transparent"
          borderRadius={0}
          size={20}
          color="rgba(74, 195, 180, 1)"
          onPress={() => {
            this.apiFollow.requestFollow(this.props.myID, this.props.item.MaBenhNhan, 1)
                .then(async(result) => {
                    if(result=='success'){
                      this.props.handle.handleChangeType('cancel')
                      const info = {
                        MaTaiKhoan: this.props.item.MaBenhNhan, // Người nhận Notif
                        LoaiNguoiChinh: 1,  
                        MaTaiKhoanLienQuan: this.props.myID,    // Người gửi Notif
                        TenNguoiLienQuan: this.props.myProfile.thongTinChung.hoTen,
                        AvatarNguoiLienQuan: this.props.myProfile.thongTinChung.avatar,
                        LoaiNguoiLienQuan: 1,
                        LoaiThongBao: 1                         // Thông báo yêu cầu theo dõi sức khỏe người thân
                      }
                      await this.props.socket.emit('create notifications', info);
                    }
                });
          }}
        >
          <Text style={styles.customBtnText}>
            Theo dõi
          </Text>
        </MaterialCommunityIcons.Button></View>

      : this.props.typeRelationship==='accept'      
      ? 
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <MaterialCommunityIcons.Button
              name="account-check-outline"
              backgroundColor="transparent"
              borderRadius={0}
              size={20}
              color="rgba(74, 195, 180, 1)"
              onPress={() => {
                this.apiFollow.acceptFollowRequest(this.props.myID, this.props.item.MaBenhNhan, 1)
                    .then(async(result) => {
                        if(result=='success'){
                          this.props.handle.handleChangeType('followed')
                          const info = {
                            MaTaiKhoan: this.props.item.MaBenhNhan,
                            LoaiNguoiChinh: 1,
                            MaTaiKhoanLienQuan: this.props.myID,
                            TenNguoiLienQuan: this.props.myProfile.thongTinChung.hoTen,
                            AvatarNguoiLienQuan: this.props.myProfile.thongTinChung.avatar,
                            LoaiNguoiLienQuan: 1,
                            LoaiThongBao: 3                         // Thông báo chấp nhận lời yêu cầu theo dõi sức khỏe tù người khác
                          }
                          await this.props.socket.emit('create notifications', info);
                        }
                    });
              }}
            >
              <Text style={styles.customBtnText}>
                Chấp nhận
              </Text>
            </MaterialCommunityIcons.Button>
          </View>
        <View style={{flex: 1}}>
          <MaterialCommunityIcons.Button
            name="account-remove-outline"
            backgroundColor="transparent"
            borderRadius={0}
            size={20}
            color="rgba(74, 195, 180, 1)"
            onPress={() => {
              this.apiFollow.refuseFollowRequest(this.props.myID, this.props.item.MaBenhNhan, 1)
                  .then(async(result) => {
                      if(result=='success'){
                        this.props.handle.handleChangeType('add')
                      }
                  });
            }}
          >
            <Text style={styles.customBtnText}>
              Từ chối
            </Text>
          </MaterialCommunityIcons.Button>
        </View>
      </View>

      : this.props.typeRelationship==='cancel'
      ? 
      <View style={{flexDirection: 'row'}}>
        <MaterialCommunityIcons.Button
          name="account-minus-outline"
          backgroundColor="transparent"
          borderRadius={0}
          size={20}
          color="rgba(74, 195, 180, 1)"
          onPress={() => {
            this.apiFollow.unFollowed(this.props.myID, this.props.item.MaBenhNhan, 1)
                  .then(async(result) => {
                      if(result=='success'){
                        this.props.handle.handleChangeType('add')
                      }
                  });
          }}
        >
          <Text style={styles.customBtnText}>
            Hủy lời mời
          </Text>
        </MaterialCommunityIcons.Button>
      </View>

      :  
      <View style={{flexDirection: 'row'}}>
        <MaterialCommunityIcons.Button
          name="account-off-outline"
          backgroundColor="transparent"
          borderRadius={0}
          size={20}
          color="rgba(74, 195, 180, 1)"
          onPress={() => {
            this.apiFollow.unFollowed(this.props.myID, this.props.item.MaBenhNhan, 1)
                .then(async(result1) => {
                    if(result1=='success'){
                      // this.apiFollow.unFollowed(this.props.item.MaBenhNhan, this.props.myID, 1)
                      //   .then(async(result2) => {
                      //       if(result2=='success'){
                              this.props.handle.handleChangeType('add')
                            // }
                        // });
                    }
                });
          }}
        >
          <Text style={styles.customBtnText}>
            Bỏ theo dõi
          </Text>
        </MaterialCommunityIcons.Button>
      </View>
    
    return (
      <ListItem
        containerStyle={{marginHorizontal: 10}}
        leftAvatar={{ source: { uri: 'data:image/jpeg;base64,' + this.props.item.Avatar }, size: 'large' }}
        title={
          <View>
            <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold' }}>
              {this.props.item.HoTen}
            </Text>
          </View>
        }
        subtitle={
          <View style={styles.customBtns}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Feather.Button
                  name="phone-call"
                  backgroundColor="transparent"
                  borderRadius={0}
                  size={20}
                  color="rgba(74, 195, 180, 1)"
                  onPress={()=> console.log("hi")}
                >
                  {/* <Text style={styles.customBtnText}>
                    Gọi
                  </Text> */}
                </Feather.Button>
              </View>
              <View style={{flex: 1}}>
                <Feather.Button
                  name="message-circle"
                  backgroundColor="transparent"
                  borderRadius={0}
                  size={20}
                  color="rgba(74, 195, 180, 1)"
                  onPress={() => {
                    this.props.navigation.navigate('Chat', { myID: this.props.myID, title: this.props.item.HoTen, data: this.props.item, type: 1 })
                  }}
                >
                  {/* <Text style={styles.customBtnText}>
                    Nhắn tin
                  </Text> */}
                </Feather.Button>
              </View>
            </View>
              {buttonRela}
          </View>
        }
      />
    )
  }
}

class CardItem extends PureComponent {
  constructor (props) {
    super(props);
  }

  render () {
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
        />
    )
  }
}


class MyListCards extends PureComponent {
  constructor (props) {
    super(props);
  }
  
  render () {
    // alert(JSON.stringify(this.props.profile))
    let birth_dayResponse = new Date(this.props.profile.NgaySinh);
    let _dd = birth_dayResponse.getDate(),
        _mm = birth_dayResponse.getMonth() + 1,
        _yyyy = birth_dayResponse.getFullYear();
    let birth_day = _dd + '-' + _mm + '-' + _yyyy;
    return (
      <ScrollView>
        <IntroCard 
        myProfile={this.props.myProfile}
        socket={this.props.socket}
        myID={this.props.myID} 
        item={this.props.profile} 
        navigation={this.props.navigation} 
        typeRelationship={this.props.typeRelationship}
        handle={{
                handleChangeType: this.props.handle.handleChangeType
                }} />
        <Card title={
          <View style={styles.customTitle}>
            <AntDesign name="profile" size={20}/>
            <Text style={[styles.customText, styles.customTextTitle]}>Thông Tin Cơ Bản</Text>
          </View>
          }
            containerStyle={styles.removeCardBorder}
        >
          <Divider/>
          <CardItem itemDetail={this.props.profile.GioiTinh?this.props.profile.GioiTinh.data==1?'Nam':'Nữ':'Chưa rõ'} itemTitle='Giới tính'/>
          <CardItem itemDetail={birth_day} itemTitle='Ngày sinh'/>
          <CardItem itemDetail={this.props.profile.CMND} itemTitle='CMND'/>
          <CardItem itemDetail={this.props.profile.DiaChi} itemTitle='Địa chỉ'/>
          <CardItem itemDetail={this.props.profile.NgheNghiep} itemTitle='Nghề nghiệp'/>
          <CardItem itemDetail={this.props.profile.NhomMau} itemTitle='Nhóm máu'/>
          <CardItem itemDetail={this.props.profile.DiUngThuoc} itemTitle='Dị ứng thuốc'/>
        </Card>
        <Card title={
          <View style={styles.customTitle}>
            <AntDesign name="contacts" size={20}/>
            <Text style={[styles.customText, styles.customTextTitle]}>Liên Hệ</Text>
          </View>
          }
              containerStyle={styles.removeCardBorder}
        >
          <Divider/>
          <CardItem itemDetail={this.props.profile.MaBenhNhan} itemTitle='Số điện thoại'/>
          <CardItem itemDetail={this.props.profile.Email} itemTitle='Email'/>
        </Card>
      </ScrollView>
    )
  }
}

  
export default class RelativeProfile extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        myID: '',
        profile: this.props.navigation.getParam('data'),
        typeRelationship: 'add'
      };

      this.apiFollow = ApiFollow();
    }
  
    static navigationOptions = ({ navigation }) => {
      return {
        title: 'Thông Tin Người Thân',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: 'rgba(74, 195, 180, 1)',
        },
        headerTintColor: 'white',
      };
    };

    async componentDidMount() {  
      const userId = await AsyncStorage.getItem('UserId');
      this.setState({
        myID: userId
      })
      this.apiFollow.checkMyRelationship(userId, this.state.profile.MaBenhNhan)
        .then((result) => {
          if(result!==null){
            this.setState({
              typeRelationship: result
            })
          }
        });
    }

    handleChangeType = (type) => {
      this.setState({
        typeRelationship: type
      })
    }

    render() {
      // alert(JSON.stringify(this.state.profile))
      return (
        <View style={styles.wrapper}>
            <MyListCards 
            myProfile={this.props.screenProps.user}
            socket={this.props.screenProps.socket}
            myID={this.state.myID} 
            profile={this.state.profile} 
            navigation={this.props.navigation} 
            typeRelationship={this.state.typeRelationship} 
              handle={{
                handleChangeType: this.handleChangeType
                }}
            />
        </View>
      );
    }
}
  
// ======================================================
  
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    flex: 1,
  },
  titleBorderBottom: {
      flex: 1,
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderBottomColor: 'gray',
      marginHorizontal: 30,
      alignItems: 'center'
  },

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
    flexDirection: 'column',
    // alignItems: 'center'
  },
  // customBtnView: {
  //   flex: 0.5,
  // },
  customBtnText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
    paddingHorizontal: 5
  }
});
  