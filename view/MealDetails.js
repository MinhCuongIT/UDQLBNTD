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

// const section = [
//   {title: 'Ngày 22 tháng 5 năm 2019', data: [{
//       ThoiDiem: 1,
//       MonAn: 'Cơm',
//     }, {
//       ThoiDiem: 2,
//       MonAn: 'Canh',
//     }]},
//   {title: 'Ngày 21 tháng 5 năm 2019', data: [{
//       ThoiDiem: 3,
//       MonAn: 'Bánh',
//     },
//       {
//         ThoiDiem: 1,
//         MonAn: 'Pizza',
//       }
//     ]},
// ]
export default class MealDetails extends Component {
  _isMounted = false;
  constructor(props){
    super(props);

    this.state = {
      user: '',
      data: [],
      page: 1,
      refreshing: false,
      activeRowKey: null,
    };

    this.apiService = ApiService()
  }
  //
  async componentDidMount(){
    const userId = await AsyncStorage.getItem('UserId');
    this.setState({
      user: userId
    })
    this._isMounted = true;
    await this.handleLoadList();
  }

  componentWillMount(): void {
    // this.handleRefresh()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleLoadList = async () => {
    const userId = await AsyncStorage.getItem('UserId');
    this.apiService.getListMeal({
      MaBenhNhan: userId,
      page: this.state.page,
    })
      .then((result) => {
        let dataTemp = this.state.data
        let currentDate = this.state.data.length > 0 ? this.state.data[this.state.data.length - 1].title :''
        let currentSection = this.state.data.length - 1

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
            data: [...dataTemp],
            refreshing: false,
          })
      })
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item, index, section}) => {
    // const date = this.state.date[index]
    const swipeoutSetting = {
      autoClose: true,
      backgroundColor: '#F5FCFF',
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null)
          this.setState({ activeRowKey: null });
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({
          activeRowKey: item.key,//this.props.item.key,
        });
        // alert(this.props.item.key);
      },
      right: [
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            Alert.alert(
              'Xác nhận',
              'Bạn muốn xóa món ăn này?',
              [
                {
                  text: 'Không',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'Có',
                  onPress: () => {
                    let temp = this.state.data
                    if (temp[section.index].data.length > 1){
                      temp[section.index].data.splice(index, 1)
                    }
                    else{
                      temp[section.index].isDelete = true
                    }
                    this.apiService.deleteThisMeal({
                      MaBenhNhan: this.state.user,
                      Id: item.key,
                    })
                    this.props.screenProps.editTodayMeals({
                      Ngay: item.Ngay,
                      Buoi: item.ThoiDiem,
                      id: item.key,
                      isDelete: true
                    })
                    this.setState({
                      data: temp
                    })
                  }
                }
              ],
              { cancelable: true },
            );
          },
          component: (
            <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
            >
              <AntDesign name='delete' size={30} color='white' />
            </View>
          ),
          type: 'delete',
        }
      ],
      // rowId: item.id,
      // secId: 1,
    }
    return(
      section.isDelete===false
      ?<Swipeout {...swipeoutSetting}>
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
      </Swipeout>
        : null
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
          <Text style={{marginHorizontal: 10, fontSize: 20, fontWeight: 'bold'}}>CÁC THỰC ĐƠN CỦA BẠN</Text>

          <TouchableOpacity
            onPress={() => {this.props.navigation.replace('AddMeal')}
            }
          >
            <Image
              source={require('../images/plus.png')}
              style={styles.chartTitleIcon}
            />
          </TouchableOpacity>
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
