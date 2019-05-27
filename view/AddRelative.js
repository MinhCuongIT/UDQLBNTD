import React, {Component, PureComponent} from 'react';
import { StyleSheet, Text, View, FlatList, SectionList, Dimensions, Alert, AsyncStorage } from 'react-native';
import { ListItem, SearchBar, Image, Divider, Button } from "react-native-elements";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ApiRelative from '../services/api';


class FlatListItem extends PureComponent {
  constructor (props) {
    super(props);
  }
  
  render () {
    return (
        <ListItem
          title={
            <View>
              <Text style={{fontSize: 20, color: 'black'}}>
                {this.props.item.HoTen}
              </Text>
            </View>
          }
          // subtitle={this.props.item.type}
          leftAvatar={{
                  rounded: true,
                  size: "medium",
                  // title: this.props.item.HoTen[0],
                  imageProps: {resizeMode:'contain'},
                  source: { uri: 'data:image/jpeg;base64,' + this.props.item.Avatar },
                  activeOpacity: 0.7,
                  showEditButton: false,
                  marginLeft: 20,
                }}
          contentContainerStyle={{height: 40,}}
          onPress={ () => {
            this.props.navigation.navigate('RelativeProfile', { data: this.props.item });
          } }
        />
    )
  }
}

export default class AddRelative extends Component {
    constructor(props){
      super(props);
      this.state = {
        flatListData: [],
        search_RelativeID: '',
        // myID: this.props.navigation.getParam('myID'),
      };

      this.apiRelative = ApiRelative();

      this.updateSearch = this.updateSearch.bind(this);
    }

  
    static navigationOptions = ({ navigation }) => {
      return {
        title: 'Thêm Người Thân',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: 'rgba(74, 195, 180, 1)',
        },
        headerTintColor: 'white',
      }
    };

    updateSearch = search_RelativeID => {
      this.setState({ search_RelativeID, flatListData: [] });
      if (search_RelativeID.length===10){
        this.apiRelative.findRelativeByID(search_RelativeID)
            .then((result) => {
                this.setState({
                    flatListData: result
                });
            });
      }
    }

    keyExtractor = (item, index) => index.toString()
  
    render() {
      return (
        <View style={styles.wrapper}>
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingRight: 5}}>
                <SearchBar
                    round
                    lightTheme
                    containerStyle={{backgroundColor: 'transparent', width: Dimensions.get('window').width, borderBottomWidth: 0, borderRightWidth: 0}}
                    inputContainerStyle={{backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 50, height: 40}}
                    inputStyle={{color: 'white',}}
                    underlineColorAndroid='transparent'
                    placeholder="Nhập số điện thoại..."
                    searchIcon={null}
                    placeholderTextColor='white'
                    onClear={() => { this.setState({ search_DoctorID: ''}) }}
                    onChangeText={this.updateSearch}
                    value={this.state.search_RelativeID}
                />
            </View>
            <FlatList
                renderItem={
                  ({item, index}) => {
                    return(<FlatListItem item={item} index={index} navigation={this.props.navigation} />)
                  }
                }
                data={this.state.flatListData}
                keyExtractor={this.keyExtractor}
                KeyBoardShouldPersistTaps='always'
            ></FlatList>
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
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'gray',
        marginLeft: -5
    },
    customImg: {
        borderRadius: 250,
        backgroundColor: 'transparent',
        width: 30,
        height: 30,
    },
});