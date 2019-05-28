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
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from "react-native-modal-datetime-picker";
import ApiService from "../services/api";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class AddBloodPressure extends Component {
  constructor(props){
    super(props);
    const date = new Date();
    this.state = {
      isDateTimePickerVisible: false,
      date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' vào lúc ' + date.getHours() + ':' + date.getMinutes(),
      systolicValue: '',
      diastolicValue: '',
      isNullValue: false,
      dateValue: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes(),
      dateState: date,
    };

    this.apiService = ApiService()
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    // Alert.alert("A date has been picked: ", date.toString());
    this.setState({
      dateState: date,
      date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' vào lúc ' + date.getHours() + ':' + date.getMinutes(),
      dateValue: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes(),
    })
    this.hideDateTimePicker();
  };

  handleConfirm = async () => {
    if (this.state.diastolicValue === '' || this.state.systolicValue === ''){
      this.setState({
        isNullValue: true,
      })
    }
    else {
      const userId = await AsyncStorage.getItem('UserId');
      this.apiService.addHealthValue({
        MaBenhNhan: userId,
        Loai: 2.1,
        ChiSo: this.state.systolicValue,
        NgayNhap: this.state.dateValue,
      }).then((result) => {
        if (result !== null) {
          this.apiService.addHealthValue({
            MaBenhNhan: userId,
            Loai: 2.2,
            ChiSo: this.state.diastolicValue,
            NgayNhap: this.state.dateValue,
          }).then(async (result) => {
            if (result !== null) {
              await this.props.screenProps.setBloodPressureData({
                ChiSo1: this.state.systolicValue,
                ChiSo2: this.state.diastolicValue,
                NgayNhap: this.state.dateState,
              })
              this.props.navigation.replace('HomeDetails', {item: this.props.screenProps.data[1]})
            }
          })
        }
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Nhập thông tin huyết áp</Text>
        <View style={{marginTop:20}}>
          <Text style={{fontSize: 15, marginLeft: 30, marginBottom: 5,}}>Ngày ghi</Text>
          <Text style={styles.dateText}>
            {this.state.date}
          </Text>
          <TouchableOpacity
            style={styles.btnCalendar}
            onPress={this.showDateTimePicker}
          >
            <Icon name="calendar-alt" size={28} color={'rgba(0, 0, 0, 0.7)'}/>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
            mode={'datetime'}
          />
        </View>
        <View style={{marginTop:20}}>
          <Text style={{fontSize: 15, marginLeft: 30, marginBottom: 5,}}>Chỉ số "Huyết áp" (mmHg)</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.inputText}
              placeholder={'120'}
              placeholderTextColor={'rgba(10, 10, 10, 0.3)'}
              underlineColorAndroid={'transparent'}
              keyboardType='numeric'
              maxLength={5}
              value={this.state.systolicValue}
              onChangeText={(systolicValue) => {if (systolicValue===''|| !isNaN(systolicValue)) this.setState({systolicValue})}}
            />
            <Text style={{alignSelf: 'center', fontSize: 24}}> / </Text>
            <TextInput
              style={styles.inputText}
              placeholder={'80'}
              placeholderTextColor={'rgba(10, 10, 10, 0.3)'}
              underlineColorAndroid={'transparent'}
              keyboardType='numeric'
              maxLength={5}
              value={this.state.diastolicValue}
              onChangeText={(diastolicValue) => {if (diastolicValue===''|| !isNaN(diastolicValue)) this.setState({diastolicValue})}}
            />
          </View>
        </View>
        {this.state.isNullValue
          ? <View style={{marginTop:10, alignSelf: 'flex-start'}}>
            <Text style={{marginLeft: 30, color: 'red',}}>Vui lòng nhập chỉ số</Text>
          </View>
          : <View/>
        }
        <TouchableOpacity
          onPress={() => this.handleConfirm()}
          style={styles.btnConfirm}
        >
          <Text style={{color: 'white', fontSize: 23, fontWeight: 'bold', padding: 10}}>
            XÁC NHẬN
          </Text>
        </TouchableOpacity>
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
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  inputText: {
    width: Dimensions.get('window').width / 2 - 55,
    height: 45,
    borderRadius: 25,
    borderWidth: 0.2,
    fontSize: 16,
    paddingLeft: 20,
    // backgroundColor: 'rgba(0, 0, 0, 0.15)',
    color: 'rgba(0, 0, 0, 1)',
    marginHorizontal: 19,
    // textAlign: 'right',
  },
  dateText: {
    width: Dimensions.get('window').width - 55,
    height: 45,
    borderRadius: 25,
    borderWidth: 0.2,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 1)',
    paddingLeft: 20,
    textAlignVertical: 'center',
    marginHorizontal: 25,
    // textAlign: 'right',
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  inputUnit: {
    fontSize: 16,
    position: 'absolute',
    top: 36,
    right: 37,
    color: 'rgba(10, 10, 10, 0.8)',
  },
  btnCalendar: {
    position: 'absolute',
    top: 33,
    right: 50,
  },
  btnConfirm: {
    width: Dimensions.get('window').width - 55,
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
    backgroundColor: 'rgba(54, 175, 160, 1)',//'rgba(50, 50, 255, 0.7)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
  },
});
