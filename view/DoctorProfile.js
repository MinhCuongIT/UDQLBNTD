import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert, AsyncStorage, RefreshControl, Linking } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, ListItem, Divider } from "react-native-elements";
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
            this.apiFollow.requestFollow(this.props.myID, this.props.item.MaBacSi, 2)
                .then(async(result) => {
                    if(result==='success'){
                      this.props.handle.handleChangeType('cancel')
                      const info = {
                        MaTaiKhoan: this.props.item.MaBacSi, // Người nhận Notif
                        LoaiNguoiChinh: 2,  
                        MaTaiKhoanLienQuan: this.props.myID,    // Người gửi Notif
                        TenNguoiLienQuan: this.props.myProfile.thongTinChung.hoTen,
                        AvatarNguoiLienQuan: this.props.myProfile.thongTinChung.avatar,
                        LoaiNguoiLienQuan: 1,
                        LoaiThongBao: 1                         // Thông báo yêu cầu theo dõi sức khỏe người thân
                      }
                      await this.props.socket.emit('create notifications', info);

                      const info2 = {
                        MaNguoiGui: this.props.myID,
                        LoaiNguoiGui: 1,
                        MaNguoiNhan: this.props.item.MaBacSi,
                        LoaiNguoiNhan: 2,
                        updateList: false,
                      }
                      await this.props.socket.emit('update relationship', info2);
                    }
                });
          }}
        >
          <Text style={styles.customBtnText}>
            Mời theo dõi
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
                this.apiFollow.acceptFollowRequest(this.props.myID, this.props.item.MaBacSi, 2)
                    .then(async(result) => {
                        if(result==='success'){
                          this.props.handle.handleChangeType('followed')
                          const info = {
                            MaTaiKhoan: this.props.item.MaBacSi,
                            LoaiNguoiChinh: 2,
                            MaTaiKhoanLienQuan: this.props.myID,
                            TenNguoiLienQuan: this.props.myProfile.thongTinChung.hoTen,
                            AvatarNguoiLienQuan: this.props.myProfile.thongTinChung.avatar,
                            LoaiNguoiLienQuan: 1,
                            LoaiThongBao: 3                         // Thông báo chấp nhận lời yêu cầu theo dõi sức khỏe tù người khác
                          }
                          await this.props.socket.emit('create notifications', info);

                          //socket list
                          const info2 = {
                            MaNguoiGui: this.props.myID,
                            LoaiNguoiGui: 1,
                            MaNguoiNhan: this.props.item.MaBacSi,
                            LoaiNguoiNhan: 2,
                            updateList: true,
                          }
                          await this.props.socket.emit('update relationship', info2);
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
              this.apiFollow.refuseFollowRequest(this.props.myID, this.props.item.MaBacSi, 2)
                  .then(async(result) => {
                      if(result==='success'){
                        this.props.handle.handleChangeType('add')
                        
                        const info2 = {
                          MaNguoiGui: this.props.myID,
                          LoaiNguoiGui: 1,
                          MaNguoiNhan: this.props.item.MaBacSi,
                          LoaiNguoiNhan: 2,
                          updateList: false,
                        }
                        await this.props.socket.emit('update relationship', info2);
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
            this.apiFollow.unFollowed(this.props.myID, this.props.item.MaBacSi, 2)
                  .then(async(result) => {
                      if(result==='success'){
                        this.props.handle.handleChangeType('add')
                        
                        const info2 = {
                          MaNguoiGui: this.props.myID,
                          LoaiNguoiGui: 1,
                          MaNguoiNhan: this.props.item.MaBacSi,
                          LoaiNguoiNhan: 2,
                          updateList: false,
                        }
                        await this.props.socket.emit('update relationship', info2);
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
            this.apiFollow.unFollowed(this.props.myID, this.props.item.MaBacSi, 2)
                .then(async(result1) => {
                    if(result1==='success'){
                      this.props.handle.handleChangeType('add')

                    //socket list
                    const info2 = {
                      MaNguoiGui: this.props.myID,
                      LoaiNguoiGui: 1,
                      MaNguoiNhan: this.props.item.MaBacSi,
                      LoaiNguoiNhan: 2,
                      updateList: true,
                    }
                    await this.props.socket.emit('update relationship', info2);
                    }
                });
          }}
        >
          <Text style={styles.customBtnText}>
            Bỏ bác sĩ theo dõi
          </Text>
        </MaterialCommunityIcons.Button>
      </View>
    
    const buttonChat = this.props.typeRelationship==='followed'
      ? 
      <View style={{flex: 1}}>
        <Feather.Button
          name="message-circle"
          backgroundColor={this.props.item.DaXem===1? "transparent" :'rgba(255,0,0,0.2)'}
          borderRadius={0}
          size={20}
          color="rgba(74, 195, 180, 1)"
          onPress={ async () => {
                await this.apiFollow.updateSeeingSeen({
                MaTaiKhoan: this.props.myID,
                LoaiTaiKhoan: 1,
                MaTaiKhoanLienQuan: this.props.item.MaBacSi,
                LoaiTaiKhoanLienQuan: 2
              })
              this.props.handle.checkSeen()
              
              const info2 = {
                MaNguoiGui: this.props.myID,
                LoaiNguoiGui: 1,
                MaNguoiNhan: this.props.item.MaBacSi,
                LoaiNguoiNhan: 2,
                updateList: true,
              }
              await this.props.socket.emit('update relationship', info2);

              this.props.navigation.navigate('Chat', { myID: this.props.myID, title: this.props.item.HoTen, data: this.props.item, type: 2 })
            }
          }
        >
          <Text style={styles.customBtnText}>
            Nhắn tin
          </Text>
        </Feather.Button>
      </View>
      :
      <View style={{flex: 1}} />

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
                  onPress={() => {
                    Linking.openURL(`tel:${this.props.item.MaBacSi}`)
                  }}
                >
                  <Text style={styles.customBtnText}>
                    Gọi
                  </Text>
                </Feather.Button>
              </View>
              {buttonChat}
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
                handleChangeType: this.props.handle.handleChangeType,
                checkSeen: this.props.handle.checkSeen
                }}
        type={this.props.type}        
                 />
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
          <CardItem itemDetail={this.props.profile.CMND} itemTitle='CMND'/>
          <CardItem itemDetail={this.props.profile.BenhVien} itemTitle='Bệnh viện'/>
          <CardItem itemDetail={this.props.profile.ChuyenMon} itemTitle='Chuyên Môn'/>
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
          <CardItem itemDetail={this.props.profile.MaBacSi} itemTitle='Số điện thoại'/>
          <CardItem itemDetail={this.props.profile.Email} itemTitle='Email'/>
        </Card>
      </ScrollView>
    )
  }
}

  
export default class DoctorProfile extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        myID: '',
        profile: this.props.navigation.getParam('data'),
        type: this.props.navigation.getParam('type'),
        typeRelationship: 'add',
        refreshing: false
      };

      this.apiFollow = ApiFollow();
    }
  
    static navigationOptions = ({ navigation }) => {
      return {
        title: 'Thông Tin Bác Sĩ',
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
      this.apiFollow.checkRelationshipWithDoctor(userId, this.state.profile.MaBacSi)
        .then((result) => {
          if(result!==null){
            this.setState({
              typeRelationship: result,
              refreshing: false
            })
          }
        });

      this.props.screenProps.socket.on('update relationship', async (info) => {
        if ((info.LoaiNguoiGui===2 && info.MaNguoiGui===this.state.profile.MaBacSi) || (info.LoaiNguoiNhan===2 && info.MaNguoiNhan===this.state.profile.MaBacSi)){
          await this.handleRefresh()
        }
      });
    }

    handleChangeType = (type) => {
      this.setState({
        typeRelationship: type
      })
    }

    checkSeen = () => {
      let temp = this.state.profile
      temp.DaXem = 1
      this.setState({
        profile: temp
      })
    }
    
    handleRefresh = () => {
      this.setState({
        refreshing: true
      }, async () => {
        const userId = await AsyncStorage.getItem('UserId');
        this.apiFollow.checkRelationshipWithDoctor(userId, this.state.profile.MaBacSi)
          .then((result) => {
            if(result!==null){
              this.setState({
                typeRelationship: result,
                refreshing: false
              })
            }
          });
      })
    }

    render() {
      return (
        <View style={styles.wrapper}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            }>
            <MyListCards
              myProfile={this.props.screenProps.user}
              socket={this.props.screenProps.socket}  
              myID={this.state.myID}
              profile={this.state.profile} 
              navigation={this.props.navigation}
              typeRelationship={this.state.typeRelationship} 
              handle={{
                handleChangeType: this.handleChangeType,
                checkSeen: this.checkSeen
                }}
              type={this.state.type}
            />
          </ScrollView>
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
  },
  customBtnText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
    paddingHorizontal: 5
  }
});
  