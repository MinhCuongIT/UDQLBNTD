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
    // const swipeoutSetting = {
    //   autoClose: true,
    //   onClose: (secId, rowId, direction) => {
    //     if (this.state.activeRowKey != null)
    //       this.setState({ activeRowKey: null });
    //   },
    //   onOpen: (secId, rowId, direction) => {
    //     this.setState({
    //       activeRowKey: this.props.item.key,
    //     });
    //     // alert(this.props.item.key);
    //   },
    //   right: [
    //     {
    //       onPress: () => {
    //         const deletingRow = this.state.activeRowKey;
    //         Alert.alert(
    //           'Xác nhận',
    //           'Bạn muốn xóa bác sĩ này?',
    //           [
    //             { 
    //               text: 'Không', 
    //               onPress: () => console.log('Cancel Pressed'),
    //               style: 'cancel',
    //             },
    //             { 
    //               text: 'Có', 
    //               onPress: () => {
    //                 dataSource.splice(this.props.index, 1);
    //                 this.props.parentSectionList.refreshSectionList(deletingRow);
    //               }
    //             }
    //           ],
    //           { cancelable: true },
    //         );
    //       },
    //       component: (
    //         <View
    //             style={{
    //               flex: 1,
    //               alignItems: 'center',
    //               justifyContent: 'center',
    //               flexDirection: 'column',
    //             }}
    //         >
    //           <AntDesign name='delete' size={30} color='white' />
    //         </View>
    //       ),
    //       type: 'delete',
    //     }
    //   ],
    //   rowId: this.props.index,
    //   secId: 1,
    // }

    return (
      // <Swipeout {...swipeoutSetting}>
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
                  // title: this.props.item.name[0],
                  imageProps: {resizeMode:'contain'},
                  source: { uri: 'data:image/jpeg;base64,' + this.props.item.Avatar },
                  activeOpacity: 0.7,
                  showEditButton: false,
                  marginLeft: 20,
                }}
          contentContainerStyle={{height: 40,}}
          onPress={() => {
                  this.props.navigation.navigate('RelativeProfile', { myID: this.props.myID, data: this.props.item })
              }}
        />
      // {/* </Swipeout> */}
    )
  }
}

export default class User_Family extends Component {
    constructor(props){
      super(props);
      this.state = {
        flatListData: [],
        deletedRowKey: null,
        myID: ''
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
        }
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
                flatListData: arrayholder
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

    
  
    render() {
      return (
        <View style={styles.wrapper}>
            <FlatList
                renderItem={
                  ({item, index}) =>{
                    return (
                      <FlatListItem item={item} index={index} navigation={this.props.navigation} myID={this.state.myID} parentSectionList={this} />
                    )
                  }
                }
                data={this.state.flatListData}
                keyExtractor={this.keyExtractor}
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