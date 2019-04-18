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

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <Navigator/>
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
