/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Alert, AsyncStorage, Dimensions, Image,
  Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {LineChart} from "react-native-chart-kit";
import ApiService from "../services/api";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class StatsDetailRelative extends Component {
  constructor(props){
    super(props);

    this.state = {
      userName: '',
      data: [],
      highDomain: props.navigation.state.params.item.highDomain,
      lowDomain: props.navigation.state.params.item.lowDomain,
      unit: props.navigation.state.params.item.unit,
      date: props.navigation.state.params.item.date,
      listItems: props.navigation.state.params.item.data,
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
  // componentDidMount(){
  //   this.loadItems();
  // }
  //
  // async loadItems(){
  //   const userId = await AsyncStorage.getItem('UserId');
  //   this.apiService.getHealthValue({
  //     MaBenhNhan: userId,
  //     Loai: i + 1,
  //   }).then(async (result) => {
  //     if (result !== null && result.length > 0) {
  //
  //     }
  //   })
  // }

  _keyExtractor = (item, index) => index.toString();

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem = (item, index) => {
    const dateReverse = this.state.date.slice()
    const date = dateReverse.reverse()[index]
    const circle = {
      width: 25,
      height: 25,
      borderRadius: 100/2,
      backgroundColor: this.state.highDomain!==0
        ? item >= this.state.highDomain
          ? 'rgba(255, 33, 0, 1)'
          : item <= this.state.lowDomain
            ? 'rgba(241, 187, 20, 1)'
            : 'rgba(106, 194, 89, 1)'
        : 'white'
    }
    return(
      <TouchableOpacity
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
        }}
        onPress={() => { this.props.navigation.navigate('StatDetailRelativePerDay', { date: date, unit: this.state.unit, type: this.props.navigation.state.params.item.id, name: this.props.navigation.state.params.name, user: this.props.navigation.state.params.user}) }}
      >

        <View style={{flex: 1.5, flexDirection: 'column'}}>
          <Text style={{fontSize: 20, textAlign: 'center', fontWeight: '600'}}>
            {date.getDate() + '/' + (date.getMonth() + 1)}
          </Text>
          <Text style={{fontSize: 14, textAlign: 'center', fontWeight: '300'}}>
            {date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes()}
          </Text>
        </View>

        <View style={{flex: 3, flexDirection: 'column'}}>
          <Text style={{fontSize: 17, textAlign: 'center', fontWeight: '500'}}>{item}</Text>
          <Text style={{fontSize: 12, textAlign: 'center',}}>{this.state.unit}</Text>
        </View>

        <View style={{alignSelf: 'center'}}>
          <View style={circle}/>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const chartConfig = {
      backgroundGradientFrom: 'white',
      backgroundGradientTo: 'white',
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 2
    }
    const screenWidth = Dimensions.get('window').width

    let listItemsTemp = this.state.listItems.datasets[2].data.slice()
    let listItems = listItemsTemp.reverse().map((item, index) =>{
      const value = this.props.navigation.state.params.item.id===1
        ? item
        : this.props.navigation.state.params.item.data.datasets[3].data.slice().reverse()[index] + '/' + item

      return (
        this._renderItem(value, index)
      )
    })
// alert(JSON.stringify(this.props.navigation.state.params.item.data.datasets[2].data))
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection: 'row', margin: 10, marginTop: 20, marginBottom: 20, justifyContent: 'center'}}>
          <Image
            source={this.props.navigation.state.params.item.id===1
              ? require('../images/Diabetes.png')
              : require('../images/BloodPressure.png')}
            style={styles.chartTitleIcon}
          />
          <Text style={{marginHorizontal: 10, fontSize: 20, fontWeight: 'bold'}}>
            {this.props.navigation.state.params.item.id===1
            ? 'ĐƯỜNG HUYẾT'
            : 'HUYẾT ÁP'}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            borderWidth: 3,
            borderColor: '#EFF6F9',//'rgba(0, 0, 0, 0.3)',
            borderRadius: 25,
            margin: 10,
            padding: 5
          }}>
          <LineChart
            data={this.props.navigation.state.params.item.data}
            width={screenWidth-50}
            height={220}
            chartConfig={chartConfig}
            onDataPointClick={(item) => {Alert.alert(
              this.state.highDomain!==0
                ? item.value >= this.state.highDomain
                ? 'Giá trị chỉ số là ' + item.value.toString() + ', ở ngưỡng cao'
                : item.value <= this.state.lowDomain
                  ? 'Giá trị chỉ số là ' + item.value.toString() + ', ở ngưỡng thấp'
                  : 'Giá trị chỉ số là ' + item.value.toString() + ', ở mức bình thường'
                : 'Giá trị chỉ số là ' + item.value.toString() + ''
            )}}
            withShadow={false}
            bezier
          />
        </View>

        <View style={{marginTop: 15, }}>
          <Text style={{margin: 10, fontSize: 20, fontWeight: 'bold'}}>
            Bảng thống kê chỉ số theo ngày
          </Text>
          {listItems}
        </View>
      </ScrollView>
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
