import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from "react-navigation";
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator, createSwitchNavigator } from "react-navigation";
import AuthLoadingScreen from "./AuthLoadingScreen";
import Home from "./Home";
import Chart from "./Chart";
import User_Family from './User_Family';
import RelativeProfile from './RelativeProfile';
import AddRelative from './AddRelative';
import ListDoctors from "./ListDoctors";
import DoctorProfile from './DoctorProfile';
import AddDoctor from './AddDoctor';
import ChatScreen from './ChatScreen';
import Message from "./Message";
import Profile from "./Profile";
import HomeDetails from "./HomeDetails";
import ChartHealthDetail from "./ChartHealthDetail";
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginPage from "./LoginPage";
import RegisterChooseTypePage from "./RegisterChooseTypePage";
import RegisterInformationPage from "./RegisterInformationPage";
import ForgetInformationPage from "./ForgetInformationPage";
import AddDiabetes from "./AddDiabetes";
import AddBloodPressure from "./AddBloodPressure";
import AddValuePage from "./AddValuePage";
import Notifications from './Notifications';
import MealDetails from './MealDetails';
import AddMeal from './AddMeal';
import RelativeStats from './RelativeStats';
import MealDetailRelative from './MealDetailRelative';
import StatsDetailRelative from './StatsDetailRelative';
import HomeDetailsPerDay from "./HomeDetailsPerDay";
import StatDetailRelativePerDay from "./StatDetailRelativePerDay"

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      // header:null,
      headerBackTitle: 'Trở về',
      headerStyle: {
        backgroundColor: 'rgba(74, 195, 180, 1)',
      },
    },
  },
  HomeDetails: {
    screen: HomeDetails,
    navigationOptions: {
      headerBackTitle: 'Trở về',
      headerStyle: {
        backgroundColor: 'rgba(74, 195, 180, 1)',
      },
      headerBackTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold',
      },
      headerTintColor: 'white',
    },
  },
  HomeDetailsPerDay: {
    screen: HomeDetailsPerDay,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'rgba(74, 195, 180, 1)',
      },
      headerBackTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold',
      },
      headerTintColor: 'white',
    },
  },
  MealDetails: {
    screen: MealDetails,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'rgba(74, 195, 180, 1)',
      },
      headerBackTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold',
      },
      headerTintColor: 'white',
    },
  },
  AddDiabetes: {
    screen: AddDiabetes,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'rgba(74, 195, 180, 1)',
      },
      headerBackTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold',
      },
      headerTintColor: 'white',
    },
  },
  AddBloodPressure: {
    screen: AddBloodPressure,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'rgba(74, 195, 180, 1)',
      },
      headerBackTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold',
      },
      headerTintColor: 'white',
    },
  },
  AddMeal: {
    screen: AddMeal,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'rgba(74, 195, 180, 1)',
      },
      headerBackTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold',
      },
      headerTintColor: 'white',
    },
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'rgba(74, 195, 180, 1)',
      },
      headerBackTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold',
      },
      headerTintColor: 'white',
    },
  }
}, {
    initialRouteName: 'Home',
    headerBackTitleVisible: true,
  });

const ChartStack = createStackNavigator({
  Chart: {
    screen: Chart,
    navigationOptions: {
      header: null,
      headerBackTitle: 'Trở về',
    },
  },
  ChartHealthDetail: {
    screen: ChartHealthDetail,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'tomato',
      },
      headerBackTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold',
      }
    },
  },
}, {
    initialRouteName: 'Chart',
    headerBackTitleVisible: true,
  });

const User_FamilyStack = createStackNavigator({
  User_Family: {
    screen: User_Family,

  },
  AddRelative: {
    screen: AddRelative,
  },
  RelativeProfile: {
    screen: RelativeProfile,
  },
  RelativeStats: {
    screen: RelativeStats,
  },
  StatsDetailRelative: {
    screen: StatsDetailRelative
  },
  StatDetailRelativePerDay: {
    screen: StatDetailRelativePerDay
  },
  MealDetailRelative: {
    screen: MealDetailRelative,
  },
  }, {
    initialRouteName: 'User_Family',
    // headerBackTitleVisible: true,
  });

const ListDoctorsStack = createStackNavigator({
  ListDoctors: {
    screen: ListDoctors,
  },
  DoctorProfile: {
    screen: DoctorProfile,
    // navigationOptions: { tabBarVisible: false,  }
  },
  AddDoctor: {
    screen: AddDoctor,
  },
  // Chat: {
  //   screen: ChatScreen,
  // },
  }, {
    initialRouteName: 'ListDoctors',
    // headerBackTitleVisible: true,
  });

//Phần thông tin profile
const ListProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
    }
  },
},
  {
    initialRouteName: 'Profile',
  });

const AppMainNavigator = createMaterialTopTabNavigator({
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
          screen: User_FamilyStack,
          navigationOptions: {
              tabBarLabel: "Người thân",
              tabBarIcon: ({ tintColor }) => (
                <Icon name="users" size={25} color={tintColor} />
              )
          }
      },
      Tab3: {
          screen: ListDoctorsStack,
          navigationOptions: {
              tabBarLabel: "Bác sĩ",
              tabBarIcon: ({ tintColor }) => (
                <Icon name="user-md" size={25} color={tintColor} />
              )
          }
      },
      Tab4: {
          screen: ListProfileStack,
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
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: 'white',//'mediumspringgreen',
      },
      showIcon: true,
      labelStyle: {
        fontSize: 10
      },
      inactiveTintColor: 'rgba(54, 175, 160, 0.5)',
      activeTintColor: 'rgba(54, 175, 160, 1)',
    },
  });

  const AppNavigator = createStackNavigator({
    AppMainNavigator: {
      screen: AppMainNavigator,
      navigationOptions: {
        header: null,
      }
    },
    Chat: {
      screen: ChatScreen,
    },
    }, {
      initialRouteName: 'AppMainNavigator',
  })

AppNavigator.navigationOptions = {
  tittle: "testComponent",
};
// export default MainNavigator;

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginPage,
    navigationOptions: {
      header: null,
      headerBackTitle: 'Trở về',
    },
  },
  RegisterChooseTypePage: {
    screen: RegisterChooseTypePage,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'rgba(54, 175, 160, 1)',
      },
      headerBackTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
      },
      headerBackTitle: 'Trở về',
      headerTintColor: 'white'
    },
  },
  RegisterInformationPage: {
    screen: RegisterInformationPage,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'rgba(54, 175, 160, 1)',
      },
      headerBackTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
      },
      headerTintColor: 'white'
    },
  },
  ForgetInformationPage: {
    screen: ForgetInformationPage,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'rgba(54, 175, 160, 1)',
      },
      headerBackTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
      },
      headerTintColor: 'white'
    },
  }
},
  {
    initialRouteName: 'Login',
    headerBackTitleVisible: true,
  });

const AddValueStack = createStackNavigator({
  AddValue: {
    screen: AddValuePage,
    navigationOptions: {
      // header:null,
      headerStyle: {
        backgroundColor: 'rgba(54, 175, 160, 1)',
      },
      headerBackTitleStyle: {
        fontSize: 25,
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
  LoginStack: {
    screen: LoginStack,
    navigationOptions: {
      header: null,
    },
  },
  AppStack: {
    screen: AppNavigator,
    navigationOptions: {
      header: null,
    },
  }
}, {
    initialRouteName: 'AuthLoading',
  });
export default createAppContainer(MainNavigator);