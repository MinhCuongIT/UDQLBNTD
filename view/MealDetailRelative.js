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
  Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, SectionList, RefreshControl
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import AntDesign from 'react-native-vector-icons/AntDesign'
import {LineChart} from "react-native-chart-kit";
import ApiService from "../services/api";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class MealDetailRelative extends Component {
  _isMounted = false;
  constructor(props){
    super(props);

    this.state = {
      user: props.navigation.state.params.userId,
      data: [],
      page: 1,
      refreshing: false,
      activeRowKey: null,
    };

    this.apiService = ApiService()
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Bữa ăn của ' + navigation.getParam('name'),
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
  async componentDidMount(){
    // const userId = await AsyncStorage.getItem('UserId');
    // this.setState({
    //   user: userId
    // })
    this._isMounted = true;
    await this.handleLoadList();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleLoadList = async () => {
    // const userId = await AsyncStorage.getItem('UserId');
    this.apiService.getListMeal({
      MaBenhNhan: this.state.user,
      page: this.state.page,
    })
      .then((result) => {
        let dataTemp = []
        let currentDate = ''
        let currentSection = -1

        if (result !== null) {
          result.meals.map((item) => {
            let date = new Date(item.Ngay)
            let dateTemp = 'Ngày ' + date.getDate() + ' tháng ' + (date.getMonth() + 1) + ' năm ' + date.getFullYear()

            let temp = {
              ThoiDiem: item.Buoi,
              MonAn: item.MonAn,
              key: item.Id,
              Ngay: item.Ngay,
            }

            if (dateTemp === currentDate) {
              dataTemp[currentSection].data.push(temp)
            }
            else {
              currentSection++
              let itemTemp = {
                title: dateTemp,
                data: [],
                index: currentSection,
                isDelete: false,
              }
              dataTemp.push(itemTemp)
              currentDate = dateTemp
              dataTemp[currentSection].data.push(temp)
            }
          })
        }
        if (this._isMounted)
          this.setState({
            data: [...this.state.data, ...dataTemp],
            refreshing: false,
          })
      })
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item, index, section}) => {
    return(
        <View
          key={index}
          style={{
            backgroundColor: 'white',
            borderWidth: 3,
            borderColor: '#EFF6F9',//'rgba(0, 0, 0, 0.3)',
            borderRadius: 20,
            padding: 20,
            marginHorizontal: 10,
            marginVertical: 2,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>

          <View style={{flex: 2, flexDirection: 'column'}}>
            <Text style={{fontSize: 17, textAlign: 'center', fontWeight: '500'}}>
              {/*{date.getDate() + '/' + (date.getMonth() + 1)}*/}
              {item.ThoiDiem===1?'Sáng':item.ThoiDiem===2?'Trưa':'Tối'}
            </Text>
          </View>

          <View style={{flex: 3, flexDirection: 'column'}}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>
              {item.MonAn}
            </Text>
          </View>
        </View>
    );
  }

  handleLoadMore = () => {
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

  render() {
    return (
      <View style={styles.container}>
      {/*<ScrollView*/}
        {/*style={styles.container}*/}
        {/*refreshControl={*/}
          {/*<RefreshControl*/}
            {/*refreshing={this.state.refreshing}*/}
            {/*onRefresh={this.handleRefresh}*/}
          {/*/>*/}
        {/*}*/}
      {/*>*/}
        <View style={{flexDirection: 'row', margin: 10, marginTop: 20, marginBottom: 20, justifyContent: 'center'}}>
          <Image
            source={require('../images/diet.png')}
            style={styles.chartTitleIcon}
          />
          <Text style={{marginHorizontal: 10, fontSize: 20, fontWeight: 'bold'}}>CÁC THỰC ĐƠN</Text>
        </View>
        <SectionList
          keyExtractor={this.keyExtractor}
          renderSectionHeader={({section: {title, isDelete}}) => isDelete===false?(
            <Text style={{fontSize: 17, textAlign: 'center', fontWeight: '500',
              marginBottom: 5, paddingTop: 10,
            backgroundColor: '#F5FCFF'}}>
              {title}
            </Text>
          ) : null}
          sections={this.state.data}
          renderItem={this.renderItem}
          stickySectionHeadersEnabled={true}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.001}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      {/*</ScrollView>*/}
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
});
