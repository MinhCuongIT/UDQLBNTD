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
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

class FloatingTextInput extends Component {
  constructor(props){
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
        isFocused: this.props.valueText!=='',
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
      ? <Text style={{left: 30, color:'red'}}>{this.state.messageError}</Text>
      : null;

    return(
      <View >
        <View style={{marginTop:10}}>
          <Icon name={this.props.icon} size={28} color={'rgba(0, 0, 0, 0.9)'}
                style={styles.inputIcon}/>
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

export default class RegisterInformationPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      nameValue: '',
      passValue: '',
      rePassValue: '',
      errorMessage: {
        name: 'Success',
        pass: 'Success',
        rePass: 'Success',
      },
      showAlert: false,
    }

    this.handleChangeNameValue = this.handleChangeNameValue.bind(this)
    this.handleChangePassValue = this.handleChangePassValue.bind(this)
    this.handleChangeRePassValue = this.handleChangeRePassValue.bind(this)
    this.handleCheckNameValue = this.handleCheckNameValue.bind(this)
    this.handleCheckPassValue = this.handleCheckPassValue.bind(this)
    this.handleCheckRePassValue = this.handleCheckRePassValue.bind(this)
  }

  handleChangeNameValue = (text) => {
    const value = text;
    this.setState({
      nameValue: value,
    })
  }

  handleChangePassValue = (text) => {
    const value = text;
    this.setState({
      passValue: value,
    })
  }

  handleChangeRePassValue = (text) => {
    const value = text;
    this.setState({
      rePassValue: value,
    })
  }

  handleCheckNameValue = () => {
    if (this.state.nameValue === '')
      this.setState({
        errorMessage: {
          ...this.state.errorMessage, name: 'Bạn chưa nhập "Họ và tên"'
        }
      })
    else
      this.setState({
        errorMessage: {
          ...this.state.errorMessage, name: 'Success'
        }
      })
  }

  handleCheckPassValue = () => {
    this.setState({
      rePassValue: '',
    })
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

  handleCheckRePassValue = () => {
    if (this.state.rePassValue === '') this.setState({
      errorMessage: {
        ...this.state.errorMessage, rePass: 'Bạn chưa nhập "Nhập lại mật khẩu"'
      }
    })
    else if (this.state.rePassValue !== this.state.passValue)
      this.setState({
        errorMessage: {
          ...this.state.errorMessage, rePass: 'Mật khẩu nhập lại không khớp'
        }
      })
    else
      this.setState({
        errorMessage: {
          ...this.state.errorMessage, rePass: 'Success'
        }
      })
  }
  registerAccount = () => {
    // this.props.navigation.navigate('Login')
    console.log('hello world')
    this.setState({
      showAlert: true
    });
  }

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 27, fontWeight: 'bold', color: 'black'}}>Thông tin của bạn</Text>
        </View>
        <FloatingTextInput
          label={'Họ và tên'}
          valueText={this.state.nameValue}
          messageError={this.state.errorMessage.name}
          icon={'user'}
          onChange={this.handleChangeNameValue}
          onValidate={this.handleCheckNameValue}
          isHidePass={false}
        />
        <FloatingTextInput
          label={'Mật khẩu'}
          valueText={this.state.passValue}
          messageError={this.state.errorMessage.pass}
          icon={'lock'}
          onChange={this.handleChangePassValue}
          onValidate={this.handleCheckPassValue}
          isHidePass={true}
        />
        <FloatingTextInput
          label={'Nhập lại mật khẩu'}
          valueText={this.state.rePassValue}
          messageError={this.state.errorMessage.rePass}
          icon={'lock'}
          onChange={this.handleChangeRePassValue}
          onValidate={this.handleCheckRePassValue}
          isHidePass={true}
        />
        <TouchableOpacity
          onPress={() => this.registerAccount()}
          style={styles.btnRegister}
        >
          <Text style={{color: 'white', fontSize: 23, fontWeight: 'bold', padding: 10}}>
            XÁC NHẬN
          </Text>
        </TouchableOpacity>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={true}
          title="AwesomeAlert"
          message="I have a message for you!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="comfirm"
          confirmButtonColor="green"
          confirmButtonTextStyle={{fontSize:30}}
          messageStyle={{fontSize: 40}}
          titleStyle={{backgroundColor: 'green'}}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
          customView={<View><Icon name="eye" size={28} color={'rgba(255, 255, 255, 0.7)'}/></View>}
        />
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
    marginTop:30,
    backgroundColor: 'rgba(54, 175, 160, 1)',//'rgba(50, 50, 255, 0.7)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
  },
});
