import React, {Component, PureComponent} from 'react';
import { StyleSheet, Text, View, FlatList, SectionList, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar, Image, Divider, Button } from "react-native-elements";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ApiFindDoctor from '../services/api';

var dataSource = [
    // Tiểu Đường
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
      }
  ];

class FindDoctorSearchBar extends PureComponent {
    constructor (props) {
        super(props);
      }

    render() {
        const phone_width = Dimensions.get('window').width,
            btnSeacrh_width = 75;
        return(
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingRight: 5}}>
                <SearchBar
                    round
                    lightTheme
                    containerStyle={{backgroundColor: 'transparent', width: phone_width - btnSeacrh_width, borderBottomWidth: 0, borderRightWidth: 0}}
                    inputContainerStyle={{backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 50, height: 40}}
                    inputStyle={{color: 'white',}}
                    underlineColorAndroid='transparent'
                    placeholder="Nhập số điện thoại..."
                    searchIcon={null}
                    placeholderTextColor='white'
                    onChangeText={this.props.updateSearch}
                    value={this.props.search}
                />
                <MaterialCommunityIcons
                  name="account-search-outline"
                  size={30}
                  color='rgba(74, 195, 180, 1)'
                  style={{margin: 15}}
                  onPress={this.props.fetchData}
                />
            </View>
        )
    }
}

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
                  title: this.props.item.HoTen[0],
                  imageProps: {resizeMode:'contain'},
                //   source: { uri: this.props.item.avatar_url },
                  activeOpacity: 0.7,
                  showEditButton: false,
                  marginLeft: 20,
                }}
          contentContainerStyle={{height: 40,}}
        //   onPress={() => {
        //         this.props.navigation.navigate('DoctorProfile', { data: this.props.item })
        //       }}
        />
    )
  }
}

export default class AddDoctor extends Component {
    constructor(props){
      super(props);
      this.state = {
        flatListData: [],
        search_DoctorID: '',
      };

      this.apiFindDoctor = ApiFindDoctor();

      this.updateSearch = this.updateSearch.bind(this);
      this.fetchData = this.fetchData.bind(this);
    }

  
    static navigationOptions = ({ navigation }) => {
      return {
        title: 'Thêm Bác Sĩ',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: 'rgba(74, 195, 180, 1)',
        },
        headerTintColor: 'white',
      }
    };

    // componentWillMount() {
    //     this.fetchData('0946531215');
    // }

    fetchData = () => {
        this.apiFindDoctor.find_doctor(this.state.search_DoctorID)
            .then((result) => {
                this.setState({
                    flatListData: [...this.state.flatListData,result]
                });
            });
    }

    updateSearch = search => {
      this.setState({
        search_DoctorID: search,
      })
    }

    // componentDidMount() {
    //   this.updateSearch
    // }

    keyExtractor = (item, index) => index.toString()
  
    render() {
      return (
        <View style={styles.wrapper}>
            <FindDoctorSearchBar search={this.state.search_DoctorID} updateSearch={this.updateSearch} fetchData={this.fetchData} />
            <FlatList
                renderItem={
                  ({item, index}) => {
                    return(<FlatListItem item={item} index={index} navigation={this.props.navigation} />)
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