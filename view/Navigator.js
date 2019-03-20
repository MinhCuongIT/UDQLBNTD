import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { TabNavigator } from "react-navigation";
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from "react-navigation";
import Home from "./Home";
import Chart from "./Chart";
import Message from "./Message";
import Profile from "./Profile";
import HomeNewsDetails from "./HomeNewsDetails";
import Icon from 'react-native-vector-icons/FontAwesome';


const HomeStack = createStackNavigator({
  Home: {screen: Home,
    navigationOptions:{
      header:null,
      headerBackTitle: 'Trở về',
    },
  },
  NewsDetails: {screen: HomeNewsDetails,
    navigationOptions:{
      headerStyle:{
        backgroundColor: 'tomato',
      },
      headerBackTitleStyle:{
        fontSize:25,
        fontWeight: 'bold',
      }
    },
  },
}, {
  initialRouteName: 'Home',
  headerBackTitleVisible: true,
});

const MainNavigator = createMaterialTopTabNavigator({
      Tab1: {
          screen: HomeStack,
          navigationOptions: {
              tabBarLabel: "Home",
              tabBarIcon: ({ tintColor }) => (
                <Icon name="home" size={25} color={tintColor} />
              )
          },
      },
      Tab2: {
          screen: Chart,
          navigationOptions: {
              tabBarLabel: "Chart",
              tabBarIcon: ({ tintColor }) => (
                <Icon name="heartbeat" size={25} color={tintColor} />
              )
          }
      },
      Tab3: {
          screen: Message,
          navigationOptions: {
              tabBarLabel: "Message",
              tabBarIcon: ({ tintColor }) => (
                <Icon name="comments" size={25} color={tintColor} />
              )
          }
      },
      Tab4: {
          screen: Profile,
          navigationOptions: {
              tabBarLabel: "Profile",
              tabBarIcon: ({ tintColor }) => (
                <Icon name="user" size={25} color={tintColor} />
              )
          }
      }
  },
  {
    tabBarPosition:"bottom",
    animationEnabled: true,
    tabBarOptions:{
      style: {
        backgroundColor: 'white'//'mediumspringgreen',
      },
      showIcon:true,
      labelStyle:{

      },
      inactiveTintColor: 'pink',
      activeTintColor: 'orangered',
    },
  });

MainNavigator.navigationOptions = {
  tittle: "testComponent",
};
// export default MainNavigator;

export default createAppContainer(MainNavigator);
