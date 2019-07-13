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
  Alert, AsyncStorage, Dimensions, Image,
  Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, RefreshControl
} from 'react-native';
import {LineChart} from "react-native-chart-kit";
import ApiService from "../services/api";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class StatDetailRelativePerDay extends Component {
  _isMounted = false;
  constructor(props){
    super(props);

    this.state = {
      userName: '',
      data: [],
      // highDomain: props.navigation.state.params.item.highDomain,
      // lowDomain: props.navigation.state.params.item.lowDomain,
      unit: props.navigation.state.params.unit,
      date: props.navigation.state.params.date,
      type: props.navigation.state.params.type,
      page: 1,
      refreshing: true,
      loadMore: true,
    };

    this.apiService = ApiService()
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Chỉ số của ' + navigation.getParam('name'),
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: 'rgba(74, 195, 180, 1)',
      },
      headerTintColor: 'white',
    };
  };
  //
  componentDidMount(){
    this._isMounted = true;
    this.handleLoadList();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  //
  handleLoadList = async() => {
    const userId = this.props.navigation.state.params.user;
    this.apiService.getHealthValuePerDay({
      MaBenhNhan: userId,
      Loai: this.state.type,
      Ngay: this.state.date.getFullYear() + '-' + ((this.state.date.getMonth() + 1)<10?'0':'') + (this.state.date.getMonth() + 1) + '-' + (this.state.date.getDate()<10?'0':'') + this.state.date.getDate(),
      page: this.state.page,
    }).then(async (result) => {
      if (result !== null) {
        if (this._isMounted)
          this.setState({
            data: [...this.state.data, ...result.data],
            refreshing: false,
            loadMore: this.state.page < result.totalPages
          })
      }
    })
  }

  handleLoadMore = () => {
    if (this.state.loadMore)
      this.setState({
        page: this.state.page + 1
      },async () => {
        await this.handleLoadList()
      })
  }

  handleRefresh = () => {
    this.setState({
      page: 1,
      data: [],
      refreshing: true,
    },async () => {
      await this.handleLoadList()
    })
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item, index}) => {
    const date = this.state.type === 1
      ? new Date(item.NgayNhap)
      : new Date(item.blood_pressure01.NgayNhap)
    // alert(JSON.stringify(item))
    return(
      <View
        key={index}
        style={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: '#EFF6F9',//'rgba(0, 0, 0, 0.3)',
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 5,
          marginHorizontal: 10,
          marginVertical: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>

        <View style={{flex: 1.5, flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={{fontSize: 20, textAlign: 'center', fontWeight: '600'}}>
            {date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes()}
          </Text>
          {/*<Text style={{fontSize: 14, textAlign: 'center', fontWeight: '300'}}>*/}
          {/*{date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes()}*/}
          {/*</Text>*/}
        </View>

        <View style={{flex: 3, flexDirection: 'column'}}>
          <Text style={{fontSize: 17, textAlign: 'center', fontWeight: '500'}}>
            {this.state.type===1
              ? item.ChiSo
              : item.blood_pressure01.ChiSo + ' / ' + item.blood_pressure02.ChiSo
            }
          </Text>
          <Text style={{fontSize: 12, textAlign: 'center',}}>
            {this.state.type===1
              ? 'mmol/L' //Đường huyết
              : 'mmHg'   //Huyết áp
            }
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <View style={{marginTop: 5, }}>
          <Text style={{margin: 15, fontSize: 20, fontWeight: 'bold'}}>
            Chỉ số {this.state.type===1
            ? 'Đường huyết'
            : 'Huyết áp'
          } ngày {this.state.date.getDate() + ' / ' + (this.state.date.getMonth() + 1)}
          </Text>
          {/*{listItems}*/}
        </View>

        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.001}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
  chartTitleIcon: {
    height: 30,
    width: 30,
  },
  detailIcon: {
    height: 25,
    width: 25,
    alignSelf: 'center',
  },
});
