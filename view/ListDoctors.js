import React, {Component, PureComponent} from 'react';
import { StyleSheet, Text, View, FlatList, SectionList, 
  Dimensions, Alert, AsyncStorage } from 'react-native';
import { ListItem, SearchBar, Image, Divider, Button } from "react-native-elements";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ApiDoctor from '../services/api';




class SectionListItem extends PureComponent {
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
    //                 let indexSection  = dataSource.indexOf(this.props.section);
    //                 dataSource[indexSection].data.splice(this.props.index, 1);
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
          leftAvatar={{
                  rounded: true,
                  size: "medium",
                  // title: this.props.item.HoTen[0],
                  imageProps: {resizeMode:'contain'},
                  source: { uri: this.props.item.Avatar },
                  activeOpacity: 0.7,
                  showEditButton: false,
                  marginLeft: 20,
                }}
          contentContainerStyle={{height: 40,}}
          onPress={() => {
                this.props.navigation.navigate('DoctorProfile', { myID: this.props.myID, 
                                                                  data: this.props.item,
                                                                  type: this.props.section.title==='Tiểu Đường'?2:3 })
              }}
        />
      // </Swipeout>
    )
  }
}

class SectionHeader extends PureComponent {
  constructor (props) {
    super(props);
  }

  render() {
    return(
      <View style={{marginHorizontal: 20}}>
        <ListItem
          leftAvatar={{ source: this.props.iconSectionHeader, size: 30 }}
          title={
            <View>
              <Text style={styles.sectionTitle}>{this.props.sectionTitle}</Text>
            </View>
          }
          rightElement={
            <Ionicons name="md-add-circle"
              size={30}
              color='rgba(74, 195, 180, 1)'
              onPress={() => {
                this.props.navigation.navigate('AddDoctor', { myID: this.props.myID, type: this.props.type });
              }}
              />
          }
        />
        <Divider />
      </View>
    )
  }
}

export default class ListDoctors extends Component {
    constructor(props){
      super(props);
      this.state = {
        sectionListData: [],
        deletedRowKey: null,
        search: '',
        myID: '',
        refreshing: false
      };
      
      this.apiDoctor = ApiDoctor();
    }

  
    static navigationOptions = ({ navigation }) => {
      return {
        title: 'Bác Sĩ Của Tôi',
        headerTitleStyle: {
          fontWeight: 'bold',
          marginLeft: 40,
          color: 'white',
        },
        headerStyle: {
          backgroundColor: 'rgba(74, 195, 180, 1)',
        },
        // headerTitle: (
        //   <SearchBar
        //     round
        //     lightTheme
        //     containerStyle={{backgroundColor: 'rgba(74, 195, 180, 1)', width: Dimensions.get('window').width - 75}}
        //     inputContainerStyle={{backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 50, height: 40,}}
        //     inputStyle={{color: 'white',}}
        //     underlineColorAndroid='transparent'
        //     placeholder="Nhập tên bác sĩ..."
        //     searchIcon={{color: 'white',}}
        //     placeholderTextColor='rgba(255,255,255,0.5)'
        //     onChangeText={navigation.getParam('updateSearch')}
        //     value={navigation.getParam('search')}
        //   />
        // ),
        // headerRight: (
        //   <TouchableOpacity
        //     style={{ backgroundColor: 'transparent', alignItems: 'center', paddingVertical: 20, marginRight: 10,}}
        //     onPress={() => { alert("Thêm thành công"); }}
        //   >
        //     <Text style={{color: 'white', fontSize: 20}}> Thêm </Text>
        //   </TouchableOpacity>
        // )
      }
    };

    getMyListDoctors = () => {      
      let arrayholder = [
        {
          data: [],
          title: 'Tiểu Đường'
        },
        {
          data: [],
          title: 'Huyết Áp'
        },
      ];

      this.apiDoctor.getMyListDoctors(this.state.myID)
        .then((result) => {
          if(result){
            const TYPE_DIABETES = 2, TYPE_BLOOD_PRESSURE = 3;
            for(let i=0; i<result.length; i++){
              if(result.list_doctors[i].Loai==TYPE_DIABETES){
                arrayholder[0].data.push(result.list_doctors[i])
              }
              else if(result.list_doctors[i].Loai==TYPE_BLOOD_PRESSURE){
                arrayholder[1].data.push(result.list_doctors[i])
              }
            }
          }
          this.setState({
            sectionListData: arrayholder,
            refreshing: false
          });
        });
    }
  
    async componentDidMount() {
      const id = await AsyncStorage.getItem('UserId');
      this.setState({
        myID: id
      })
      this.getMyListDoctors();
    }

    // makeRemoteRequest = () => {
    //   let newDoctor = this.props.navigation.getParam('data');
    //   // if(newDoctor.Khoa=='Tiểu Đường'){
    //   //   this.arrayholder.
    //   // }
    //   // Alert.alert(JSON.stringify(newDoctor));
    //   // this.arrayholder = [...this.arrayholder, this.props.navigation.getParam('data')];
    //   this.setState({
    //     sectionListData: this.arrayholder,
    //   });
    // };
  
    keyExtractor = (item, index) => index.toString()

    //Hiển thị phân loại bác sĩ theo lĩnh vực
    setSectionHeader = ({section}) => {
      switch(section.title) {
   
        case "Tiểu Đường":
          return(<SectionHeader iconSectionHeader={require('../images/Diabetes.png')} sectionTitle={section.title} navigation={this.props.navigation} myID={this.state.myID} type={2}/>);
        case 'Huyết Áp':
          return(<SectionHeader iconSectionHeader={require('../images/BloodPressure.png')} sectionTitle={section.title} navigation={this.props.navigation} myID={this.state.myID} type={3}/>);
        default:
          break;
      
        }
   
    }

    // //Cập nhật từ khóa trong Search-bar
    // //và tiến hành search trong danh sách bác sĩ
    // updateSearch = search => {
    //   this.setState({
    //     search: search,
    //   })
    //   this.props.navigation.setParams({search: search});    

    //   var newData = [];

    //   for(let i=0; i < this.arrayholder.length; i++){
    //     const result = this.arrayholder[i].data.filter(user => {
    //       const userData = user.name.toUpperCase();
    //       const textData = search.toUpperCase();
    //       return userData.indexOf(textData) > -1;
    //     });
    //     if (result.length > 0)
    //         newData = [...newData,...result];
    //   }

    //   let tempObject_Diabetes = { data: [], title: "Tiểu Đường"},
    //       tempObject_BloodPressure = { data: [], title: "Huyết Áp"};
    //   for (let i=0; i<newData.length; i++) {
    //     if (newData[i].type=='Diabetes'){
    //       tempObject_Diabetes.data.push(newData[i]);
    //     }
    //     else {
    //       tempObject_BloodPressure.data.push(newData[i]);
    //     }
    //   }

    //   let tempArray = [];
    //   tempArray.push(tempObject_Diabetes);
    //   tempArray.push(tempObject_BloodPressure);
      
    //   this.setState({
    //     sectionListData: tempArray,
    //   });
    // }

    // Reload danh sách bác sĩ
    refreshSectionList = (deletedKey) => {
      this.setState((prevState) => {
        return {
          deletedRowKey: deletedKey,
        };
      });
    }

    footerComponent() {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This is the `SectionList` Footer
          </Text>
        </View>
      )
    }

    emptyListComponent() {
      return (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            no data for this row
          </Text>
        </View>
      )
    }
  
    handleRefresh = () => {
      this.setState({
        refreshing: true
      }, () => {
        this.getMyListDoctors();
      })
    }

    render() {
      return (
        <View style={styles.wrapper}>
            <SectionList
                sections={this.state.sectionListData}
                keyExtractor={this.keyExtractor}
                renderItem={
                  ({item, index, section}) =>{
                    return (
                      <SectionListItem item={item} index={index} section={section} navigation={this.props.navigation} myID={this.state.myID} parentSectionList={this} />
                    )
                  }
                }
                renderSectionHeader={this.setSectionHeader}
                stickySectionHeadersEnabled={true}
                // ListFooterComponent={this.footerComponent.bind(this)}
                ListEmptyComponent={this.emptyListComponent.bind(this)}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
            ></SectionList>
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

    empty     : {padding: 3, backgroundColor: 'orange'},
    emptyText : {fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: '#34495e'},

    footer    : {width: Dimensions.get('window').width, padding: 24, backgroundColor: 'yellow'},
    footerText: {fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#34495e'},
});