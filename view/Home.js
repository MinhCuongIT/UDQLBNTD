/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet,
  Text, View, Image, FlatList, Dimensions, ImageBackground, TouchableOpacity,
  Alert, SectionList, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Avatar, Badge, withBadge} from 'react-native-elements';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

class Logo extends Component {
  constructor(props) {
    super(props);

  }

  render(){
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row',}}>
          <Image
            style={{height:50, width: 50, marginLeft: 30}}
            source={require('../images/logo-bigsize.png')}
          />
          <Image
            style={{height:50, width: 150, marginLeft: 20}}
            source={require('../images/AppName.png')}
          />
        </View>
      </View>
    )
  }
}

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    const BadgedIcon = withBadge(navigation.getParam('numberNoti'))(Icon)
    return {
      headerTitle: <Logo/>,
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeDetails')}
          style={{marginRight: 30}}
        >
          {navigation.getParam('numberNoti')!==0
            ?<BadgedIcon color={'white'} size={30} type="FontAwesome5" name="bell" />
            :<Icon color={'white'} size={30} type="FontAwesome5" name="bell" />}
        </TouchableOpacity>
      ),
    }
  }

  constructor(props){
    super(props);

    this.state = {
      isMore: true,
      page: 1,
      loading: false,
      totalPages: 5,
      data: [],
      numberNoti: 1,
    };
  }

  componentDidMount(){
    this.loadItems();
    this.props.navigation.setParams({ numberNoti: this.state.numberNoti });
  }

  loadItems(){
    let dataT = [];
    for (let i = 0; i < 2; i++) {
      dataT.push({
        data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: i===0
          ? [{
            data: [ 20, 45, 28, 80, 99, 43 ],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2
            }]
          :
          [{
            data: [ 20, 45, 28, 80, 99, 43 ],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2
          }, {
            data: [ 30, 65, 38, 90, 109, 53 ],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2
          }]
        },
        type: i===0?'ĐƯỜNG HUYẾT (mmol/L)':'HUYẾT ÁP (mmHg)'
      })
    }
    this.setState(
      {
        data: [...this.state.data,...dataT],
      }
    );
  }

  handleLoadMore = () => {
    if (this.state.page < this.state.totalPages) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.loadItems()
        }
      );
    }
  };

  handleNewsDetail = (item) => {
    this.props.navigation.navigate('NewsDetails', {item: item})
  };

  render() {
    let listChart = this.state.data.map(item => {
      const chartConfig = {
        backgroundGradientFrom: '#F5FCFF',
        backgroundGradientTo: '#F5FCFF',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2
      }
      const screenWidth = Dimensions.get('window').width

      return (
        <View key={item.type}>
          <Text style={{margin: 10, marginTop: 20, fontSize: 20, fontWeight: 'bold'}}>{item.type}</Text>
          <TouchableOpacity
            onPress={() => {this.props.navigation.navigate('HomeDetails')}}
          >
            <LineChart
              data={item.data}
              width={screenWidth+1}
              height={220}
              chartConfig={chartConfig}
              onDataPointClick={(item) => {Alert.alert(item.value.toString())}}
              bezier
            />
          </TouchableOpacity>
          <View style={{marginLeft: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={item.type==='ĐƯỜNG HUYẾT (mmol/L)'?styles.normalStatus:styles.errorStatus}></View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('HomeDetails')}
              style={styles.btnMess}
            >
              <Text style={{color: 'white', fontSize: 17}}>
                Nhắn tin
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    })

    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Avatar
              containerStyle={{margin: 10, marginLeft: 40}}
              size={120}
              rounded
              source={{
                uri:
                  'https://img.pokemondb.net/artwork/large/charizard-mega-y.jpg',
              }}
            />
            <View style={{justifyContent: 'center'}}>
              <Text style={{padding: 20, fontSize: 25, fontWeight: 'bold'}}> Nguyễn Trần Lê Lý </Text>
            </View>
          </View>
          {listChart}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  logo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'tomato',
  },
  content: {
    flex: 8,
    backgroundColor: '#F5FCFF',
  },
  newsList: {
    marginVertical: 15,
    flex: 1,
  },
  news: {
    backgroundColor: '#17BEAE',
    height: Dimensions.get('window').width / 2,
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    borderRadius: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    margin: 10,
    color: 'black',
  },
  sectionTitleBorderBottom: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    marginHorizontal: 30,
    alignItems: 'center'
  },
  customImg: {
    borderRadius: 250,
    backgroundColor: 'transparent',
    width: 35,
    height: 35,
  },
  normalStatus: {
    width: 30,
    height: 30,
    borderRadius: 30/2,
    backgroundColor: '#52C41C'
  },
  errorStatus: {
    width: 30,
    height: 30,
    borderRadius: 30/2,
    backgroundColor: '#FF1400'
  },
  btnMess: {
    // width: Dimensions.get('window').width - 55,
    // height: 45,
    borderRadius: 20,
    // borderWidth: 1.5,
    borderColor: 'rgba(255, 0, 0, 0.7)',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'rgba(104, 225, 210, 0.8)',//   'rgba(50, 50, 255, 0.9)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 30,
  }
});
