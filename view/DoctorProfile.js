import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, ListItem, Avatar } from "react-native-elements";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

class Info extends PureComponent {
  constructor (props) {
    super(props);
  }
  
  render () {
    return (
        <Card title='Thông Tin Cơ Bản'>
          <ListItem
            title={
              <View>
                <Text style={styles.info}>
                  {this.props.profile.gender}
                </Text>
              </View>
            }
            subtitle='Giới tính'
            chevron={{ size: 30}}
          />
          <ListItem
            title={
              <View>
                <Text style={styles.info}>
                  {this.props.profile.birthday}
                </Text>
              </View>
            }
            subtitle='Ngày sinh'
            chevron={{ size: 30}}
          />
          <ListItem
            title={
              <View>
                <Text style={styles.info}>
                  {this.props.profile.id_card}
                </Text>
              </View>
            }
            subtitle='CMND'
            chevron={{ size: 30}}
          />
          <ListItem
            title={
              <View>
                <Text style={styles.info}>
                  {this.props.profile.address}
                </Text>
              </View>
            }
            subtitle='Địa chỉ'
            chevron={{ size: 30}}
          />
        </Card>
    )
  }
}

  
export default class DoctorProfile extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        profile: this.props.navigation.getParam('data'),
      };
    }
  
    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('title'),
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: 'rgba(74, 195, 180, 1)',
        },
        headerTintColor: 'white',
      };
    };

    // componentDidMount() {
    //   alert(JSON.stringify(this.state.profile.data));
    // }

    render() {
      return (
        <View style={styles.wrapper}>
            <Info profile={this.state.profile}/>
        </View>
      );
    }
}
  
// ======================================================
  
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    flex: 1,
  },
  titleBorderBottom: {
      flex: 1,
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderBottomColor: 'grey',
      marginHorizontal: 30,
      alignItems: 'center'
  },
  info: {
    fontSize: 20,
    color: 'black',
  }
});
  