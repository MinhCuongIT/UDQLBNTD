// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  * @lint-ignore-every XPLATJSCOPYRIGHT1
//  */
//
// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
// import { TabNavigator } from "react-navigation";
// import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from "react-navigation";
// import Home from "./view/Home";
// import Chart from "./view/Chart";
// import Message from "./view/Message";
// import Profile from "./view/Profile";
// import Icon from 'react-native-vector-icons/FontAwesome';
//
// const MainNavigator = createMaterialTopTabNavigator({
//   Tab1: {
//     screen: Home,
//     navigationOptions: {
//       tabBarLabel: "Home",
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="home" size={25} color={tintColor} />
//       )
//     },
//   },
//   Tab2: {
//     screen: Chart,
//     navigationOptions: {
//       tabBarLabel: "Chart",
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="heartbeat" size={25} color={tintColor} />
//       )
//     }
//   },
//   Tab3: {
//     screen: Message,
//     navigationOptions: {
//       tabBarLabel: "Message",
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="comments" size={25} color={tintColor} />
//       )
//     }
//   },
//   Tab4: {
//     screen: Profile,
//     navigationOptions: {
//       tabBarLabel: "Profile",
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="user" size={25} color={tintColor} />
//       )
//     }
//   }
// },
//     {
//       tabBarPosition:"bottom",
//       swipeEnabled: true,
//       tabBarOptions:{
//         showIcon:true,
//         labelStyle:{
//         },
//       },
//     })
//
// MainNavigator.navigationOptions = {
//   tittle: "testComponent"
// }
// // export default MainNavigator;
// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: Home,
//     tittle: "Home"
//   },
//   Chart: {
//     screen: Chart,
//   },
// }, {
//   initialRouteName: 'Home',
// });
//
// export default createAppContainer(MainNavigator);
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Navigator from "./view/Navigator";
import ApiService from "./services/api";
import socketIOClient from "socket.io-client";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

const socket = socketIOClient('http://192.168.1.4:5500/');
export default class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: {},
      numberNoti: 0,
      socket: socket,
      data: [],
      haveData: false,
    };
  }

  setData = (data) => {
    this.setState({
      data: data
    })
  }

  setHaveData = (haveData) => {
    this.setState({
      haveData: haveData
    })
  }

  setNumberNoti = (number) => {
    this.setState({
      numberNoti: number
    })
  }

  setSocket = (socket) => {
    this.setState({
      socket: socket
    })
  }

  setColor = (data) => {
    //đường huyết
    if (data[0]) {
      data[0].data.datasets[2].color = (opacity = 1) => `rgba(70, 200, 120, ${opacity})`
      data[0].data.datasets[0].color = (opacity = 0.7) => `rgba(255, 0, 0, ${opacity})`
      data[0].data.datasets[1].color = (opacity = 1) => `rgba(240, 180, 00, ${opacity})`
    }
    //huyết áp
    if (data[1]) {
      data[1].data.datasets[2].color = (opacity = 1) => `rgba(22, 19, 208, ${opacity})`
      data[1].data.datasets[3].color = (opacity = 1) => `rgba(212, 25, 28, ${opacity})`
      data[1].data.datasets[0].color = (opacity = 0.7) => `rgba(255, 0, 0, ${opacity})`
      data[1].data.datasets[1].color = (opacity = 1) => `rgba(240, 180, 00, ${opacity})`
    }
  }

  setNewDate = (data) => {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i] = new Date(data[i]);
      }
    }
  }

  setDiabetesData = (data) => {
    let dataTemp = JSON.parse(JSON.stringify(this.state.data))
    let isMerge = false;
    // alert(data.NgayNhap)
    // alert(data.NgayNhap.toISOString()>dataTemp[0].date?1:0)
    if (dataTemp[0].date.length < 7){
      for (let i = dataTemp[0].date.length - 1; i >= 0; i--){
        if (!isMerge) {
          if (data.NgayNhap.toDateString() !== new Date(dataTemp[0].date[i]).toDateString()
          && data.NgayNhap.getTime() > new Date(dataTemp[0].date[i]).getTime()) {
            dataTemp[0].date[i + 1] = data.NgayNhap;
            dataTemp[0].data.labels[i + 1] = data.NgayNhap.getDate() + '/' + (data.NgayNhap.getMonth() + 1);
            dataTemp[0].data.datasets[2].data[i + 1] = data.ChiSo;
            dataTemp[0].data.datasets[0].data.push(dataTemp[0].highDomain);
            dataTemp[0].data.datasets[1].data.push(dataTemp[0].lowDomain);
            dataTemp[0].date[i] = new Date(dataTemp[0].date[i]);
            isMerge = true;
          }
          else if (data.NgayNhap.toDateString() === new Date(dataTemp[0].date[i]).toDateString()
              && data.NgayNhap.toTimeString() > new Date(dataTemp[0].date[i]).toTimeString()){
            dataTemp[0].date[i] = data.NgayNhap;
            dataTemp[0].data.labels[i] = data.NgayNhap.getDate() + '/' + (data.NgayNhap.getMonth() + 1);
            dataTemp[0].data.datasets[2].data[i] = data.ChiSo;
            isMerge = true;
            dataTemp[0].date.splice(i + 1, 1)
            dataTemp[0].data.labels.splice(i + 1, 1)
            dataTemp[0].data.datasets[2].data.splice(i + 1, 1)
          }
          else {
            dataTemp[0].date[i + 1] = new Date(dataTemp[0].date[i]);
            dataTemp[0].data.labels[i + 1] = dataTemp[0].data.labels[i];
            dataTemp[0].data.datasets[2].data[i + 1] = dataTemp[0].data.datasets[2].data[i];
          }
        }
        else {
          dataTemp[0].date[i] = new Date(dataTemp[0].date[i]);
        }
      }
      if (!isMerge){
        dataTemp[0].date[0] = data.NgayNhap;
        dataTemp[0].data.labels[0] = data.NgayNhap.getDate() + '/' + (data.NgayNhap.getMonth() + 1);
        dataTemp[0].data.datasets[2].data[0] = data.ChiSo;
        dataTemp[0].data.datasets[0].data.push(dataTemp[0].highDomain);
        dataTemp[0].data.datasets[1].data.push(dataTemp[0].lowDomain);
      }
    }
    else {
      for (let i = dataTemp[0].date.length - 1; i >= 0; i--) {
        if (!isMerge) {
          if ((data.NgayNhap.toDateString() !== new Date(dataTemp[0].date[i]).toDateString()
            && data.NgayNhap.getTime() > new Date(dataTemp[0].date[i]).getTime())
            || (data.NgayNhap.toDateString() === new Date(dataTemp[0].date[i]).toDateString()
              && data.NgayNhap.toTimeString() > new Date(dataTemp[0].date[i]).toTimeString())) {
            if (data.NgayNhap.toDateString() !== new Date(dataTemp[0].date[i]).toDateString()) {
              for (let j = 0; j < i; j++) {
                dataTemp[0].date[j] = new Date(dataTemp[0].date[j + 1]);
                dataTemp[0].data.labels[j] = dataTemp[0].data.labels[j + 1];
                dataTemp[0].data.datasets[2].data[j] = dataTemp[0].data.datasets[2].data[j + 1];
              }
            }
            dataTemp[0].date[i] = data.NgayNhap;
            dataTemp[0].data.labels[i] = data.NgayNhap.getDate() + '/' + (data.NgayNhap.getMonth() + 1);
            dataTemp[0].data.datasets[2].data[i] = data.ChiSo;
            isMerge = true;
          } else {
            dataTemp[0].date[i] = new Date(dataTemp[0].date[i]);
          }
        }
      }
    }

    this.setColor(dataTemp)
    if (dataTemp[1]) this.setNewDate(dataTemp[1].date)

    this.setState({
      data: dataTemp
    })
  }

  render() {
    return (
      <Navigator
        // socket={socket}
        screenProps={{
          ...this.state,
          setNumberNoti: this.setNumberNoti,
          setSocket: this.setSocket,
          setData: this.setData,
          setHaveData: this.setHaveData,
          setDiabetesData: this.setDiabetesData,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
