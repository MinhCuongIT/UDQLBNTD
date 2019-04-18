/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Images from '../images/index';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class RegisterChooseTypePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [
        {srcImage: Images.typeAccount.doctor, key: 'Bác sĩ'},
        {srcImage: Images.typeAccount.patient, key: 'Tự theo dõi'},
        {srcImage: Images.typeAccount.support, key: 'Theo dõi người thân'},
      ]
    }
  }

  handleChooseType = (item) => {
    this.props.navigation.navigate('RegisterInformationPage', {key:item.key})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 40}}>
          <Text style={{fontSize: 27, fontWeight: 'bold', color: 'black'}}>Bạn thuộc nhóm nào?</Text>
        </View>
        <View >
          <FlatList
            data={this.state.items}
            style={styles.listItems}
            // numColumns={2}
            renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => this.handleChooseType(item)}
              >
                <View style={styles.typeItem}>
                    <Image source={item.srcImage}
                           style={{flex:3, margin:10}}
                           resizeMode={'contain'}
                    >
                    </Image>
                  <Text style={{ color: 'black', fontSize: 15,
                    fontWeight: 'bold', padding:5,
                  }}>
                    {item.key}
                  </Text>
                </View>
              </TouchableOpacity>
            }
          />
        </View>
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
  listItems: {
    margin: 15,
  },
  typeItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: Dimensions.get('window').width / 2.6,
    width: Dimensions.get('window').width / 2,
    // alignItems: 'center',
    justifyContent: 'center',
    alignItems:'center',
    margin: 5,
    borderRadius: 20,
  },
});
