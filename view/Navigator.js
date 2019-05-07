import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { TabNavigator } from "react-navigation";
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator, createSwitchNavigator } from "react-navigation";
import AuthLoadingScreen from "./AuthLoadingScreen";
import Home from "./Home";
import Chart from "./Chart";
import Message from "./Message";
import Profile from "./Profile";
import HomeDetails from "./HomeDetails";
import ChartHealthDetail from "./ChartHealthDetail";
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginPage from "./LoginPage";
import RegisterChooseTypePage from "./RegisterChooseTypePage";
import RegisterInformationPage from "./RegisterInformationPage";
import AddDiabetes from "./AddDiabetes";
import AddValuePage from "./AddValuePage";

const HomeStack = createStackNavigator({
  Home: {screen: Home,
    navigationOptions:{
      // header:null,
      headerBackTitle: 'Trở về',
      headerStyle: {
        backgroundColor: 'rgba(74, 195, 180, 1)',
      },
    },
  },
  HomeDetails: {screen: HomeDetails,
    navigationOptions:{
      headerStyle:{
        backgroundColor: 'rgba(74, 195, 180, 1)',
      },
      headerBackTitleStyle:{
        fontSize:25,
        fontWeight: 'bold',
      },
      headerTintColor: 'white',
    },
  },
  AddDiabetes :{screen: AddDiabetes,
    navigationOptions:{
      headerStyle:{
        backgroundColor: 'rgba(74, 195, 180, 1)',
      },
      headerBackTitleStyle:{
        fontSize:25,
        fontWeight: 'bold',
      },
      headerTintColor: 'white',
    },
  },
}, {
  initialRouteName: 'Home',
  headerBackTitleVisible: true,
});

const ChartStack = createStackNavigator({
  Chart: {screen: Chart,
    navigationOptions:{
      header:null,
      headerBackTitle: 'Trở về',
    },
  },
  ChartHealthDetail: {screen: ChartHealthDetail,
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
  initialRouteName: 'Chart',
  headerBackTitleVisible: true,
});

const AppNavigator = createMaterialTopTabNavigator({
      Tab1: {
          screen: HomeStack,
          navigationOptions: {
              tabBarLabel: "Trang chủ",
              tabBarIcon: ({ tintColor }) => (
                <Icon name="home" size={25} color={tintColor} />
              )
          },
      },
      Tab2: {
          screen: ChartStack,
          navigationOptions: {
              tabBarLabel: "Người thân",
              tabBarIcon: ({ tintColor }) => (
                <Icon name="users" size={25} color={tintColor} />
              )
          }
      },
      Tab3: {
          screen: Message,
          navigationOptions: {
              tabBarLabel: "Bác sĩ",
              tabBarIcon: ({ tintColor }) => (
                <Icon name="user-md" size={25} color={tintColor} />
              )
          }
      },
      Tab4: {
          screen: Profile,
          navigationOptions: {
              tabBarLabel: "Tài khoản",
              tabBarIcon: ({ tintColor }) => (
                <Icon name="user" size={25} color={tintColor} />
              )
          }
      }
  },
  {
    swipeEnabled: false,
    animationEnabled: false,
    tabBarPosition:"bottom",
    tabBarOptions:{
      style: {
        backgroundColor: 'white',//'mediumspringgreen',
      },
      showIcon:true,
      labelStyle:{
        fontSize: 10
      },
      inactiveTintColor: 'rgba(54, 175, 160, 0.5)',
      activeTintColor: 'rgba(54, 175, 160, 1)',
    },
  });

AppNavigator.navigationOptions = {
  tittle: "testComponent",
};
// export default MainNavigator;

const LoginStack = createStackNavigator({
  Login: {screen: LoginPage,
    navigationOptions:{
      header:null,
      headerBackTitle: 'Trở về',
    },
  },
  RegisterChooseTypePage: {
    screen: RegisterChooseTypePage,
    navigationOptions:{
      headerStyle:{
        backgroundColor: 'rgba(54, 175, 160, 1)',
      },
      headerBackTitleStyle:{
        fontSize:25,
        fontWeight: 'bold',
        color:'white',
      },
      headerBackTitle: 'Trở về',
      headerTintColor: 'white'
    },
  },
  RegisterInformationPage: {
    screen: RegisterInformationPage,
    navigationOptions:{
      headerStyle:{
        backgroundColor: 'rgba(54, 175, 160, 1)',
      },
      headerBackTitleStyle:{
        fontSize:25,
        fontWeight: 'bold',
        color:'white',
      },
      headerTintColor: 'white'
    },
  },
}, {
  initialRouteName: 'Login',
  headerBackTitleVisible: true,
});

const AddValueStack = createStackNavigator({
  AddValue: {screen: AddValuePage,
    navigationOptions:{
      // header:null,
      headerStyle:{
        backgroundColor: 'rgba(54, 175, 160, 1)',
      },
      headerBackTitleStyle:{
        fontSize:25,
        fontWeight: 'bold',
      },
      headerBackTitle: 'Trở về',
      headerTintColor: 'white'
    },
  },
}, {
  initialRouteName: 'AddValue',
  headerBackTitleVisible: true,
});

const MainNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  LoginStack: {screen: LoginStack,
    navigationOptions:{
      header:null,
    },
  },
  AppStack : {
    screen: AppNavigator,
    navigationOptions:{
      header:null,
    },
  }
}, {
  initialRouteName: 'AuthLoading',
});
export default createAppContainer(MainNavigator);