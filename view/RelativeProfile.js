import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Card, ListItem, Divider, Button } from "react-native-elements";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { DateTime } from './ChatScreen';

class IntroCard extends PureComponent {
  constructor (props) {
    super(props);
  }

  render () {
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
            <View style={{flex: 0.3}}>
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
            <View style={{flex: 0.3}}>
              <Feather.Button
                name="message-circle"
                backgroundColor="transparent"
                borderRadius={0}
                size={20}
                color="rgba(74, 195, 180, 1)"
                onPress={() => {
                  this.props.navigation.navigate('Chat', { myID: this.props.myID, title: this.props.item.HoTen, data: this.props.item })
                }}
              >
                {/* <Text style={styles.customBtnText}>
                  Nhắn tin
                </Text> */}
              </Feather.Button>
            </View>
            <View style={{flex: 0.3}}>
              <SimpleLineIcons.Button
                name="user-follow"
                backgroundColor="transparent"
                borderRadius={0}
                size={20}
                color="rgba(74, 195, 180, 1)"
                onPress={() => {
                  // this.apiAddMyDoctor.addMyDoctor(this.props.myID, this.props.item.MaBacSi)
                  //     .then((result) => {
                  //         if(result=='success'){
                  //           Alert.alert("Đã gửi yêu cầu theo dõi")
                  //         }
                  //         else{
                  //           Alert.alert("Gửi yêu cầu thất bại")
                  //         }
                  //     });
                  alert("Comming soon")
                }}
              >
                {/* <Text style={styles.customBtnText}>
                  Theo dõi
                </Text> */}
              </SimpleLineIcons.Button>
            </View>
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
    let birth_dayResponse = new Date(this.props.profile.NgaySinh);
    let _dd = birth_dayResponse.getDate(),
        _mm = birth_dayResponse.getMonth() + 1,
        _yyyy = birth_dayResponse.getFullYear();
    let birth_day = _dd + '-' + _mm + '-' + _yyyy;
    return (
      <ScrollView>
        <IntroCard item={this.props.profile} navigation={this.props.navigation} myID={this.props.myID} />
        <Card title={
          <View style={styles.customTitle}>
            <AntDesign name="profile" size={20}/>
            <Text style={[styles.customText, styles.customTextTitle]}>Thông Tin Cơ Bản</Text>
          </View>
          }
            containerStyle={styles.removeCardBorder}
        >
          <Divider/>
          <CardItem itemDetail={this.props.profile.GioiTinh.data==1?'Nam':'Nữ'} itemTitle='Giới tính'/>
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
        profile: this.props.navigation.getParam('data'),
        myID: this.props.navigation.getParam('myID')
      };
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

    render() {
      return (
        <View style={styles.wrapper}>
            <MyListCards profile={this.state.profile} navigation={this.props.navigation} myID={this.state.myID}/>
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
    flexDirection: 'row',
    alignItems: 'center'
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
  