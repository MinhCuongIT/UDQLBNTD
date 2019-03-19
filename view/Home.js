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

export default class Home extends Component {
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

        {/*Header*/}
        <View style={styles.logo}>
          <Image
            style={{flex:3, height:50}}
            source={require('../images/logoDemo.png')}
            resizeMode={'center'}
          />
          <Text style={{flex:7, fontSize: 45, padding:10}}>Tên app</Text>
        </View>

        {/*Body*/}
        <View style={styles.content}>
          <FlatList
            data={this.state.data}
            style={styles.newsList}
            renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => this.handleNewsDetail(item)}
              >
                <View style={styles.news}>
                  <View style={{flex:3,}}>
                    <ImageBackground source={require('../images/newsDemo.png')}
                                     style={{width: '100%', height: '100%'}}
                                     imageStyle={{borderTopLeftRadius:20, borderTopRightRadius:20}}>

                    </ImageBackground>
                  </View>
                  <Text style={{flex: 1, color: 'white', fontSize: 20, fontWeight: 'bold', paddingLeft: 20, paddingTop: 10}}>
                    {item.key}
                  </Text>
                </View>
              </TouchableOpacity>
            }
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.001}
          />
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
