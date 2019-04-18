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
  Platform, StyleSheet,
  Text, View, TextInput, TouchableOpacity, ToastAndroid} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class ChartHealthDetail extends Component {
  constructor(props){
    super(props);
  }

  handleXacNhan = () => {
    this.props.navigation.goBack();
    ToastAndroid.showWithGravityAndOffset(
      'Đã thêm thông số sức khỏe mới!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', margin:10}}>
          <Text style={{flex:2, padding:5, textAlign:'right'}}>Lượng đường huyết trong máu</Text>
          <TextInput
            style={{flex:3, borderWidth:0.5,}}
            editable = {true}
            maxLength = {5}
            placeholder='7.2'
            keyboardType={'number-pad'}
          />
          <Text style={{flex:1, padding:10,}}>mmol/L</Text>
        </View>

        <View style={{flexDirection:'row', margin:10}}>
          <Text style={{flex:2, paddingVertical:10, paddingHorizontal:4,textAlign:'right'}}>Huyết áp</Text>
          <View style={{flex:3, flexDirection:'row'}}>
            <TextInput
              style={{flex:4, borderWidth:0.5,}}
              editable = {true}
              maxLength = {4}
              placeholder='140'
              keyboardType={'number-pad'}
            />
            <Text style={{flex:1, paddingHorizontal:10, paddingVertical:15,}}>/</Text>
            <TextInput
              style={{flex:4, borderWidth:0.5,}}
              editable = {true}
              maxLength = {4}
              placeholder='90'
              keyboardType={'number-pad'}
            />
          </View>
          <Text style={{flex:1, padding:9,}}>mmHg</Text>
        </View>

        <TouchableOpacity
          style={styles.button2}
          onPress={this.handleXacNhan}
        >
          <Text style={{fontSize:20, textAlign: 'center'}}> Xác nhận </Text>
        </TouchableOpacity>
      </View>
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
  button2:{
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'lightsalmon',
    margin: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: 'orangered'
  }
});
