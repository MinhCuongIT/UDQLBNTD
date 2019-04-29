import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Card, ListItem, Divider, Button } from "react-native-elements";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

class IntroCard extends PureComponent {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <ListItem
        containerStyle={{marginHorizontal: 10}}
        leftAvatar={{ source: { uri: this.props.itemAvatar }, size: 'large' }}
        title={
          <View>
            <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold' }}>
              {this.props.itemName}
            </Text>
          </View>
        }
        subtitle={
          <View style={styles.customBtns}>
            <View style={{flex: 0.5}}>
              <Feather.Button
                name="phone-call"
                backgroundColor="transparent"
                borderRadius={0}
                size={20}
                color="rgba(74, 195, 180, 1)"
                onPress={()=> console.log("hi")}
              >
                <Text style={styles.customBtnText}>
                  Gọi
                </Text>
              </Feather.Button>
            </View>
            <View style={{flex: 0.5}}>
              <Feather.Button
                name="message-circle"
                backgroundColor="transparent"
                borderRadius={0}
                size={20}
                color="rgba(74, 195, 180, 1)"
                onPress={()=> console.log("hi")}
              >
                <Text style={styles.customBtnText}>
                  Nhắn tin
                </Text>
              </Feather.Button>
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
    return (
      <ScrollView>
        <IntroCard itemAvatar={this.props.profile.avatar_url} itemName={this.props.profile.name} />
        <Card title={
          <View style={styles.customTitle}>
            <AntDesign name="profile" size={20}/>
            <Text style={[styles.customText, styles.customTextTitle]}>Thông Tin Cơ Bản</Text>
          </View>
          }
            containerStyle={styles.removeCardBorder}
        >
          <Divider/>
          <CardItem itemDetail={this.props.profile.gender} itemTitle='Giới tính'/>
          <CardItem itemDetail={this.props.profile.birthday} itemTitle='Ngày sinh'/>
          <CardItem itemDetail={this.props.profile.id_card} itemTitle='CMND'/>
          <CardItem itemDetail={this.props.profile.address} itemTitle='Địa chỉ'/>
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
          <CardItem itemDetail={this.props.profile.number_phone} itemTitle='Số điện thoại'/>
          <CardItem itemDetail={this.props.profile.email} itemTitle='Email'/>
          {/* <View style={styles.customBtns}>
            <View style={{flex: 0.5}}>
              <Feather.Button
                name="phone-call"
                backgroundColor="transparent"
                borderRadius={0}
                size={20}
                color="gray"
                onPress={()=> console.log("hi")}
              >
                <Text style={styles.customBtnText}>
                  Gọi
                </Text>
              </Feather.Button>
            </View>
            <View style={{flex: 0.5}}>
              <Feather.Button
                name="message-circle"
                backgroundColor="transparent"
                borderRadius={0}
                size={20}
                color="gray"
                onPress={()=> console.log("hi")}
              >
                <Text style={styles.customBtnText}>
                  Nhắn tin
                </Text>
              </Feather.Button>
            </View>
          </View> */}
        </Card>
      </ScrollView>
    )
  }
}

  
export default class DoctorProfile extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        profile: this.props.navigation.getParam('data'),
      };
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

    render() {
      return (
        <View style={styles.wrapper}>
            <MyListCards profile={this.state.profile}/>
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
    fontSize: 20,
    color: '#007AFF',
    fontWeight: 'bold',
    paddingHorizontal: 10
  }
});
  