/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';
import ApiService from '../services/api';
import { Button } from 'react-native-elements';

class FloatingTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      valueText: props.valueText,
      isHidePass: props.isHidePass,
      messageError: props.messageError,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      valueText: props.valueText,
      messageError: props.messageError,
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        valueText: this.props.valueText,
        isFocused: this.props.valueText !== '',
        messageError: this.props.messageError,
      });
    }
  }
  handleFocus = () => {
    this.setState({
      isFocused: true
    })
  }

  handleBlur = () => {
    if (this.state.valueText === '') {
      this.setState({
        isFocused: false,
      })
    }
    this.props.onValidate()
  }

  handleChange = (text) => {
    this.props.onChange(text.value)
  }

  render() {
    const labelStyle = {
      position: 'absolute',
      left: 70,
      top: this.state.isFocused ? 0 : 19,
      fontSize: this.state.isFocused ? 14 : 18,
      color: this.state.isFocused ? 'black' : '#aaa',
      borderBottomWidth: this.state.isFocused ? 0.2 : 0
    }
    const inputText = {
      width: Dimensions.get('window').width - 55,
      height: 65,
      borderRadius: 25,
      borderWidth: this.state.messageError !== 'Success' ? 0.5 : 0.1,
      fontSize: 18,
      paddingLeft: 45,
      borderColor: this.state.messageError !== 'Success' ? 'red' : 'black',
      // backgroundColor: 'rgba(0, 0, 0, 0.35)',
      color: 'rgba(0, 0, 0, 0.7)',
      marginHorizontal: 25,
    }
    // Alert.alert('render',this.state.isHidePass.toString())
    const message = this.state.messageError !== 'Success'
      ? <Text style={{ left: 30, color: 'red' }}>{this.state.messageError}</Text>
      : null;

    return (
      <View >
        <View style={{ marginTop: 10 }}>
          <Icon name={this.props.icon} size={28} color={'rgba(0, 0, 0, 0.9)'}
            style={styles.inputIcon} />
          <Text style={labelStyle}>{this.props.label}</Text>
          <TextInput
            style={inputText}
            // placeholder={'Họ và tên'}
            // placeholderTextColor={'rgba(0, 0, 0, 0.7)'}
            underlineColorAndroid={'transparent'}
            onFocus={() => this.handleFocus()}
            onBlur={() => this.handleBlur()}
            autoCapitalize={'words'}
            value={this.state.valueText}
            onChangeText={(text) => this.props.onChange(text)}
            secureTextEntry={this.state.isHidePass}
          />
        </View>
        {message}
      </View>
    )
  }
}


export default class ForgetInformationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      isExist: false,
      passValue: '',
      errorMessage: {
        pass: 'Success',
      },
      userId: this.props.navigation.state.params.acc.phone.national_number[0] === '0'
        ? this.props.navigation.state.params.acc.phone.national_number
        : '0' + this.props.navigation.state.params.acc.phone.national_number,
    }

    this.handleChangePassValue = this.handleChangePassValue.bind(this)
    this.handleCheckPassValue = this.handleCheckPassValue.bind(this)


    this.apiService = ApiService()
  }

  componentDidMount() {
    //Thực hiện kiểm tra bệnh nhân này có thật là có trong hệ thống hay không?
    this.apiService.getBenhNhanInfo({ MaBenhNhan: this.state.userId })
      .then(result => {
        if (result !== null) {
          this.setState({
            isExist: true,
          })
        }
      })
  }
  handleChangePassValue = (text) => {
    const value = text;
    this.setState({
      passValue: value,
    })
  }

  handleCheckPassValue = () => {
    if (this.state.passValue === '')
      this.setState({
        errorMessage: {
          ...this.state.errorMessage, pass: 'Bạn chưa nhập "Mật khẩu"'
        }
      })
    else
      this.setState({
        errorMessage: {
          ...this.state.errorMessage, pass: 'Success'
        }
      })
  }
  forgetAccount = async () => {
    //Kiểm tra mật khẩu có hợp lệ không trước khi đổi
    await this.handleCheckPassValue()

    if (this.state.errorMessage.pass === 'Success') {
      this.apiService.forgetBenhNhanPassword({
        MaBenhNhan: this.state.userId,
        NewPassword: this.state.passValue,
      }).then((data) => {
        this.setState({
          showAlert: true
        });
      });
    }
  }
  hideAlert = () => {
    this.setState({
      showAlert: false
    }, async () => {

      //Đổi mật khẩu thành công thì login vào hệ thống luôn chứ không cần 
      await AsyncStorage.setItem('UserId', this.state.userId)
      // this.props.screenProps.socket.emit('register socket', {
      //     id: data.MaBenhNhan,
      //     loai: 1,
      //   });
      this.props.navigation.navigate('AppStack')
    });
  }

  navigateToRegis = () => {
    this.props.navigation.navigate('RegisterInformationPage', { acc: this.props.navigation.state.params.acc })

  }

  render() {
    return (
      this.state.isExist
        ? <View style={styles.container}>
          {/* Trường hợp tài khoản tồn tại thì cho đổi mật khẩu */}
          <Text style={{
            fontSize: 25,
            fontWeight: '300',
            marginTop: 30,
          }}>Nhập mật khẩu mới</Text>

          <FloatingTextInput
            label={'Mật khẩu mới'}
            valueText={this.state.passValue}
            messageError={this.state.errorMessage.pass}
            icon={'lock'}
            onChange={this.handleChangePassValue}
            onValidate={this.handleCheckPassValue}
            isHidePass={true}
          />

          <TouchableOpacity
            onPress={() => this.forgetAccount()}
            style={styles.btnRegister}
          >
            <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold', padding: 10 }}>
              XÁC NHẬN
          </Text>
          </TouchableOpacity>

          <AwesomeAlert
            show={this.state.showAlert}
            message="Bạn đã đổi mật khẩu thành công!"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            confirmText="Đồng ý"
            confirmButtonColor="rgba(54, 175, 160, 1)"
            confirmButtonTextStyle={{ fontSize: 15 }}
            messageStyle={{ fontSize: 20, textAlign: 'center' }}
            onConfirmPressed={() => {
              this.hideAlert();
            }}
            customView={<View><Icon name="eye" size={28} color={'rgba(255, 255, 255, 0.7)'} /></View>}
          />
        </View>
        : <View style={styles.container}>
          {/* Trường hợp tài khoản không tồn tại thì đăng kí ngay và luôn */}
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 27, fontWeight: 'bold', color: 'black' }}>Bạn chưa đăng kí, đăng kí ngay!</Text>
            <TouchableOpacity
              onPress={() => this.navigateToRegis()}
              style={styles.btnRegister}
            >
              <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold', padding: 10 }}>
                XÁC NHẬN
          </Text>
            </TouchableOpacity>
          </View>



        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
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
  inputIcon: {
    position: 'absolute',
    top: 19,
    left: 40,
  },
  inputEye: {
    position: 'absolute',
    top: 19,
    right: 37,
  },
  btnRegister: {
    width: Dimensions.get('window').width - 55,
    height: 65,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: 'rgba(54, 175, 160, 1)',//'rgba(50, 50, 255, 0.7)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
  },
});
