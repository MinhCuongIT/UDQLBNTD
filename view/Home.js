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
  Alert} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};

class Logo extends Component {
  render(){
    return (
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{height:50, width: 50, marginLeft: 30}}
          source={require('../images/logo-bigsize.png')}
        />
        <Image
          style={{height:50, width: 150, marginLeft: 20}}
        source={require('../images/AppName.png')}
        />
      </View>
    )
  }
}

export default class Home extends Component {
  static navigationOptions = {
    headerTitle:
      <Logo/>,
  }
  constructor(props){
    super(props);

    this.state = {
      isMore: true,
      page: 1,
      loading: false,
      totalPages: 5,
      data: [],
    };
  }

  componentDidMount(){
    this.loadItems();
  }

  loadItems(){
    let dataT = [];
    for (let i = 0; i < 5; i++) {
      dataT.push({key: ('Bài viết ' + ((this.state.page - 1) * 5 + i))})
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
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          
        </View>
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
  }
});
