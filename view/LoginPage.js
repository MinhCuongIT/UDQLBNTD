/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
  ImageBackground, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View,
  Dimensions, TouchableWithoutFeedback, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import bgImage from '../images/backgroungImage2.jpg'
import RNAccountKit from 'react-native-facebook-account-kit'
import Axios from 'axios';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

const FACEBOOK_APP_ID = '2133371063448949'
const FACEBOOK_APP_SECRET = 'fd29509be484e7e8f741cfa1bb59f98d'
const FACEBOOK_ACCESS_TOKEN_URL = 'https://graph.accountkit.com/v1.0/access_token'
const FACEBOOK_ME_URL = 'https://graph.accountkit.com/v1.0/me'

export default class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isHidePass: true,
    };
  }

  componentWillMount(): void {
    RNAccountKit.configure({
      responseType: 'code',
      initialPhoneCountryPrefix: '+84',
      defaultCountry: 'VN'
    })
  }

  sendRequestForPhoneNumber = async (token) => {
    try {
      let access_token = ['AA', FACEBOOK_APP_ID, FACEBOOK_APP_SECRET].join('|')
      let url = `${FACEBOOK_ACCESS_TOKEN_URL}?grant_type=authorization_code&code=${token}&access_token=${access_token}`
      let getToken = await Axios(url)
      let detailUrl = `${FACEBOOK_ME_URL}?access_token=${getToken.data.access_token}`
      let getDetailUser = await Axios(detailUrl)
      return getDetailUser.data
    }
    catch (e) {
      console.log(e)
    }
  }

  loginWithPhone = () => {
    RNAccountKit.loginWithPhone()
      .then(async (token) => {
        if (!token) {
          console.log('Xác thực sai')
        } else {
          let acc = await this.sendRequestForPhoneNumber(token.code);
          console.log(acc);
          this.props.navigation.navigate('RegisterInformationPage')
        }
      })
  }

  eyeHandleIn = () => {
    this.setState({isHidePass: false})
  }

  eyeHandleOut = () => {
    this.setState({isHidePass: true})
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer} blurRadius={1}>
        {/*<Text style={styles.welcome}>Welcome</Text>*/}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ImageBackground
          style={{height: 250, width: 250}}
          imageStyle={{ borderTopLeftRadius: 25}}
          source={require('../images/logo-bigsize.png')}
        >
        </ImageBackground>
        </View>
        <View style={{flex: 1}}>
        <View style={{marginTop:10}}>
          <Icon name="phone" size={28} color={'rgba(255, 255, 255, 0.8)'}
            style={styles.inputIcon}/>
          <TextInput
            style={styles.inputText}
            placeholder={'Số điện thoại'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid={'transparent'}
            keyboardType='phone-pad'
          />
        </View>
        <View style={{marginTop:10}}>
          <Icon name="lock" size={28} color={'rgba(255, 255, 255, 0.8)'}
                style={styles.inputIcon}/>
          <TextInput
            style={styles.inputText}
            placeholder={'Mật khẩu'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid={'transparent'}
            secureTextEntry={this.state.isHidePass}
          />

          <TouchableOpacity
            style={styles.inputEye}
            onPressIn={() => this.eyeHandleIn()}
            onPressOut={() => this.eyeHandleOut()}
          >
            <Icon name="eye" size={28} color={'rgba(255, 255, 255, 0.7)'}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AppStack')}
          style={styles.btnLogin}
        >
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', padding: 10}}>
              ĐĂNG NHẬP
            </Text>
        </TouchableOpacity>
        </View>
        <View style={styles.signUpContent}>

          <Text style={{flex:1, color: 'rgba(255, 0, 0, 0.5)', fontSize: 17, textAlign:'right', marginRight: 10}}>
            Chưa có tài khoản?
          </Text>
          <TouchableOpacity
            onPress={() => this.loginWithPhone()}
            style={{flex:1}}
          >
            <Text style={{color: 'rgba(255, 0, 70, 1)', fontSize: 17, fontWeight:'bold'}}>
              ĐĂNG KÝ NGAY!
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  inputText: {
    width: Dimensions.get('window').width - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    color: 'rgba(255, 255, 255, 1)',
    marginHorizontal: 25,
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  inputEye: {
    position: 'absolute',
    top: 8,
    right: 37,
  },
  btnLogin: {
    width: Dimensions.get('window').width - 55,
    height: 45,
    borderRadius: 25,
    // borderWidth: 1.5,
    borderColor: 'rgba(255, 0, 0, 0.7)',
    alignItems: 'center',
    marginTop:10,
    backgroundColor: 'rgba(54, 175, 160, 1)',//   'rgba(50, 50, 255, 0.9)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
  },
  signUpContent: {
    bottom: 10,
    position: 'absolute',
    flexDirection: 'row',
  }
});
