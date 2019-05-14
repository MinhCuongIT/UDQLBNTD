import React, {Component, PureComponent} from 'react';
import { StyleSheet, Text, View, FlatList, SectionList, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar, Image, Divider, Button } from "react-native-elements";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import { TouchableOpacity } from 'react-native-gesture-handler';

var dataSource = [
  // Tiểu Đường
  {
    data: [
        {
          key: '0001',
          name: 'Nguyễn Thiện An',
          gender: 'Nam',
          birthday: '10/12/1985',
          id_card: '272466984',
          address: '121 Hoàng Xuân Nhị, p.Phú Trung, Q.Tân Phú, tp.HCM',
          number_phone: '0935412084',
          email: 'nta85@gmail.com',
          avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG28.png',
          type: 'Tiểu Đường', 
        },
        {
          key: '0002',
          name: 'Nguyễn Văn Chung',
          gender: 'Nam',
          birthday: '10/12/1985',
          id_card: '272466984',
          address: '121 Hoàng Xuân Nhị, p.Phú Trung, Q.Tân Phú, tp.HCM',
          number_phone: '0935412084',
          email: 'nta85@gmail.com',
          avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG151.png',
          type: 'Tiểu Đường',
        },
        { 
          key: '0003',
          name: 'Trần Thị Thu Hương',
          gender: 'Nữ',
          birthday: '10/12/1985',
          id_card: '272466984',
          address: '121 Hoàng Xuân Nhị, p.Phú Trung, Q.Tân Phú, tp.HCM',
          number_phone: '0935412084',
          email: 'nta85@gmail.com',
          avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG150.png',
          type: 'Tiểu Đường',
        },
        { 
          key: '0004',
          name: 'Lê Tiến Đạt',
          gender: 'Nam',
          birthday: '10/12/1985',
          id_card: '272466984',
          address: '121 Hoàng Xuân Nhị, p.Phú Trung, Q.Tân Phú, tp.HCM',
          number_phone: '0935412084',
          email: 'nta85@gmail.com',
          avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG158.png',
          type: 'Tiểu Đường',
        },
        { 
          key: '0005',
          name: 'Hoàng Thị Minh Thư',
          gender: 'Nữ',
          birthday: '10/12/1985',
          id_card: '272466984',
          address: '121 Hoàng Xuân Nhị, p.Phú Trung, Q.Tân Phú, tp.HCM',
          number_phone: '0935412084',
          email: 'nta85@gmail.com',
          avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG67.png',
          type: 'Tiểu Đường',
        },
        { 
          key: '0006',
          name: 'Ngô Bá Khá',
          gender: 'Nam',
          birthday: '10/12/1985',
          id_card: '272466984',
          address: '121 Hoàng Xuân Nhị, p.Phú Trung, Q.Tân Phú, tp.HCM',
          number_phone: '0935412084',
          email: 'nta85@gmail.com',
          avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG49.png',
          type: 'Tiểu Đường',
        },
    ],
    title: 'Tiểu Đường',
  },
  // Huyết Áp
  {
      data: [
          { 
            key: '0007',
            name: 'Trần Thị Thu Phương',
            gender: 'Nữ',
            birthday: '10/12/1985',
            id_card: '272466984',
            address: '121 Hoàng Xuân Nhị, p.Phú Trung, Q.Tân Phú, tp.HCM',
            number_phone: '0935412084',
            email: 'nta85@gmail.com',
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG149.png',
            type: 'Huyết Áp',
          },
          { 
            key: '0008',
            name: 'Lý Thiên Kim',
            gender: 'Nữ',
            birthday: '10/12/1985',
            id_card: '272466984',
            address: '121 Hoàng Xuân Nhị, p.Phú Trung, Q.Tân Phú, tp.HCM',
            number_phone: '0935412084',
            email: 'nta85@gmail.com',
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG115.png',
            type: 'Huyết Áp',
          },
          { 
            key: '0009',
            name: 'Huỳnh Ngọc Như',
            gender: 'Nữ',
            birthday: '10/12/1985',
            id_card: '272466984',
            address: '121 Hoàng Xuân Nhị, p.Phú Trung, Q.Tân Phú, tp.HCM',
            number_phone: '0935412084',
            email: 'nta85@gmail.com',
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG105.png',
            type: 'Huyết Áp',
          },
          { 
            key: '00010',
            name: 'Trần Thị Xuân Thủy',
            gender: 'Nữ',
            birthday: '10/12/1985',
            id_card: '272466984',
            address: '121 Hoàng Xuân Nhị, p.Phú Trung, Q.Tân Phú, tp.HCM',
            number_phone: '0935412084',
            email: 'nta85@gmail.com',
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG45.png',
            type: 'Huyết Áp',
          },
          { 
            key: '00011',
            name: 'Tăng Tịnh Thy',
            gender: 'Nữ',
            birthday: '10/12/1985',
            id_card: '272466984',
            address: '121 Hoàng Xuân Nhị, p.Phú Trung, Q.Tân Phú, tp.HCM',
            number_phone: '0935412084',
            email: 'nta85@gmail.com',
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG45.png',
            type: 'Huyết Áp',
          },
          { 
            key: '00012',
            name: 'Ngô Tất Tố',
            gender: 'Nam',
            birthday: '10/12/1985',
            id_card: '272466984',
            address: '121 Hoàng Xuân Nhị, p.Phú Trung, Q.Tân Phú, tp.HCM',
            number_phone: '0935412084',
            email: 'nta85@gmail.com',
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG45.png',
            type: 'Huyết Áp',
          },
      ],
      title: 'Huyết Áp',
  },
];

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
          // subtitle={this.props.item.type}
          leftAvatar={{
                  rounded: true,
                  size: "medium",
                  title: this.props.item.HoTen[0],
                  imageProps: {resizeMode:'contain'},
                  source: { uri: this.props.item.Avatar },
                  activeOpacity: 0.7,
                  showEditButton: false,
                  marginLeft: 20,
                }}
          contentContainerStyle={{height: 40,}}
          onPress={() => {
                this.props.navigation.navigate('DoctorProfile', { data: this.props.item })
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
                this.props.navigation.navigate('AddDoctor');
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
        userID: '937296327',
      };
      
      this.arrayholder = [
        {
          data: [],
          title: 'Tiểu Đường'
        },
        {
          data: [
            {
              "MaBacSi" : "0121451315",
              "Password" : null,
              "HoTen" : "Huỳnh Ngọc Như",
              "Avatar" : "http://pngimg.com/uploads/pokemon/pokemon_PNG28.png",
              "CMND" : "215224698",
              "GioiTinh" : "1",
              "Email" : "hnn92@gmail.com",
              "BenhVien" : "Bệnh Viện Y Phạm Ngọc Thạch",
              "Khoa" : "Huyết Áp",
              "IsDeleted" : "0"
            },
          ],
          title: 'Huyết Áp'
        },
        {
          data: [],
          title: 'XXX'
        }
      ];
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
  
    componentDidMount() {
      this.makeRemoteRequest();
      // this.props.navigation.setParams({updateSearch: this.updateSearch,});
    }

    makeRemoteRequest = () => {
      let newDoctor = this.props.navigation.getParam('data');
      // if(newDoctor.Khoa=='Tiểu Đường'){
      //   this.arrayholder.
      // }
      // Alert.alert(JSON.stringify(newDoctor));
      // this.arrayholder = [...this.arrayholder, this.props.navigation.getParam('data')];
      this.setState({
        sectionListData: this.arrayholder,
      });
    };
  
    keyExtractor = (item, index) => index.toString()

    //Hiển thị phân loại bác sĩ theo lĩnh vực
    setSectionHeader = ({section}) => {
      switch(section.title) {
   
        case "Tiểu Đường":
          return(<SectionHeader iconSectionHeader={require('../images/Diabetes.png')} sectionTitle={section.title} navigation={this.props.navigation} />);
        case 'Huyết Áp':
          return(<SectionHeader iconSectionHeader={require('../images/BloodPressure.png')} sectionTitle={section.title} navigation={this.props.navigation} />);
        case 'XXX':
          return(<SectionHeader iconSectionHeader={require('../images/BloodPressure.png')} sectionTitle={section.title} navigation={this.props.navigation} />);
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
  
    render() {
      return (
        <View style={styles.wrapper}>
            <SectionList
                sections={this.state.sectionListData}
                keyExtractor={this.keyExtractor}
                renderItem={
                  ({item, index, section}) =>{
                    return (
                      <SectionListItem item={item} index={index} navigation={this.props.navigation} section={section} parentSectionList={this} />
                    )
                  }
                }
                renderSectionHeader={this.setSectionHeader}
                stickySectionHeadersEnabled={true}
                ListFooterComponent={this.footerComponent.bind(this)}
                ListEmptyComponent={this.emptyListComponent.bind(this)}
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