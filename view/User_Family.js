import React, {Component, PureComponent} from 'react';
import { StyleSheet, Text, View, FlatList, 
  SectionList, Dimensions, Alert, AsyncStorage } from 'react-native';
import { ListItem, SearchBar, Image, Divider, Button } from "react-native-elements";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ApiRelative from '../services/api';


class FlatListItem extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      activeRowKey: null,
    }
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
          leftAvatar={{
                  rounded: true,
                  size: "medium",
                  // title: this.props.item.name[0],
                  imageProps: {resizeMode:'contain'},
                  source: { uri: 'data:image/jpeg;base64,' + this.props.item.Avatar },
                  activeOpacity: 0.7,
                  showEditButton: false,
                  marginLeft: 20,
                }}
          contentContainerStyle={{height: 40,}}
          containerStyle={{
            backgroundColor: this.props.item.DaXem===1? 'white': 'rgba(74, 195, 180, 0.2)'
          }}
          onPress={() => {
                  this.props.navigation.navigate('RelativeProfile', { myID: this.props.myID, data: this.props.item, refresh: this.props.refresh })
              }}
        />
    )
  }
}

export default class User_Family extends Component {
    constructor(props){
      super(props);
      this.state = {
        flatListData: [],
        deletedRowKey: null,
        myID: '',
        refreshing: false
      };

      this.apiRelative = ApiRelative();
    }

  
    static navigationOptions = ({ navigation }) => {
      return {
        title: 'Danh Sách Người Thân',
        headerTitleStyle: {
          fontWeight: 'bold',
          marginLeft: 40,
          color: 'white',
        },
        headerStyle: {
          backgroundColor: 'rgba(74, 195, 180, 1)',
        },
        headerRight: (
          <TouchableOpacity
            style={{ backgroundColor: 'transparent', alignItems: 'center', paddingVertical: 20, marginRight: 10,}}
            onPress={ () => {
              navigation.navigate('AddRelative');
            } }
          >
            <Text style={{color: 'white', fontSize: 20}}> Thêm </Text>
          </TouchableOpacity>
        )
      }
    };
  
    async componentDidMount() {
      const id = await AsyncStorage.getItem('UserId');
      this.setState({
        myID: id,
      });
      this.getMyListRelatives();
    }

    getMyListRelatives = () => {
      let arrayholder = [];
      this.apiRelative.getMyListRelatives(this.state.myID)
        .then((result) => {
          if(result){
            for(let i=0; i<result.length; i++){
              arrayholder.push(result.list_relations[i])
            }
          }
          this.setState({
                flatListData: arrayholder,
                refreshing: false
              });
        });
    }

    keyExtractor = (item, index) => index.toString()

    // Reload danh sách bác sĩ
    refreshSectionList = (deletedKey) => {
      this.setState((prevState) => {
        return {
          deletedRowKey: deletedKey,
        };
      });
    }

    handleRefresh = () => {
      this.setState({
        refreshing: true
      }, () => {
        this.getMyListRelatives();
      })
    }
    
  
    render() {
      return (
        <View style={styles.wrapper}>
            <FlatList
                renderItem={
                  ({item, index}) =>{
                    return (
                      <FlatListItem refresh={this.handleRefresh} item={item} index={index} navigation={this.props.navigation} myID={this.state.myID} parentSectionList={this} />
                    )
                  }
                }
                data={this.state.flatListData}
                keyExtractor={this.keyExtractor}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
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