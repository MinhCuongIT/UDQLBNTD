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
import { ScrollView } from 'react-native-gesture-handler';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class AddDiabetes extends Component {
  constructor(props){
    super(props);
    const date = new Date();
    this.state = {
      isDateTimePickerVisible: false,
      date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' vào lúc ' + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes(),
      diabeteValue: '',
      dateValue: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes(),
      isNullDiaveteValue: false,
      dateState: date,
      isDisableButton: false,
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
      date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' vào lúc ' + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes(),
      dateValue: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes(),
    })
    this.hideDateTimePicker();
  };

  handleConfirm = async () => {
    // alert(this.props.screenProps.data[0].date)
    if (this.state.diabeteValue === ''){
      this.setState({
        isNullDiaveteValue: true,
      })
    }
    else {
      const userId = await AsyncStorage.getItem('UserId');
      this.setState({
        isDisableButton: true
      })
      this.apiService.addHealthValue({
        MaBenhNhan: userId,
        Loai: 1,
        ChiSo: this.state.diabeteValue,
        NgayNhap: this.state.dateValue,
      }).then(async(result) => {
        this.setState({
          isDisableButton: false
        })
        if (result !== null) {
          await this.props.screenProps.setDiabetesData({
            ChiSo: this.state.diabeteValue,
            NgayNhap: this.state.dateState,
          })
          this.props.navigation.replace('HomeDetails', {item: this.props.screenProps.data[0]})
        }
      })
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.welcome}>Nhập thông tin đường huyết</Text>
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
            <Text style={{fontSize: 15, marginLeft: 30, marginBottom: 5,}}>Chỉ số "Đường huyết" (mmol/L)</Text>
            <TextInput
              style={styles.inputText}
              placeholder={'8.5'}
              placeholderTextColor={'rgba(10, 10, 10, 0.3)'}
              underlineColorAndroid={'transparent'}
              keyboardType='numeric'
              maxLength={5}
              value={this.state.diabeteValue}
              onChangeText={(diabeteValue) => {if (diabeteValue===''|| !isNaN(diabeteValue)) this.setState({diabeteValue})}}
            />
          </View>
          {this.state.isNullDiaveteValue
            ? <View style={{marginTop:10, alignSelf: 'flex-start'}}>
              <Text style={{marginLeft: 30, color: 'red',}}>Vui lòng nhập chỉ số</Text>
            </View>
          : <View/>
          }
          <TouchableOpacity
            onPress={() => this.handleConfirm()}
            style={this.state.isDisableButton===false?styles.btnConfirm:styles.btnConfirmDisabled}
            disabled={this.state.isDisableButton}
          >
            <Text style={{color: 'white', fontSize: 23, fontWeight: 'bold', padding: 10}}>
              XÁC NHẬN
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
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
    width: Dimensions.get('window').width - 55,
    height: 45,
    borderRadius: 25,
    borderWidth: 0.2,
    fontSize: 16,
    paddingLeft: 20,
    // backgroundColor: 'rgba(0, 0, 0, 0.15)',
    color: 'rgba(0, 0, 0, 1)',
    marginHorizontal: 25,
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
  btnConfirmDisabled: {
    width: Dimensions.get('window').width - 55,
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
    backgroundColor: 'rgba(54, 175, 160, 0.5)',//'rgba(50, 50, 255, 0.7)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
  },
});
