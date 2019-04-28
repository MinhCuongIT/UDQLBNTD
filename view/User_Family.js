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

class FlatListItem extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      activeRowKey: null,
    }
  }
  
  render () {
    const swipeoutSetting = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null)
          this.setState({ activeRowKey: null });
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({
          activeRowKey: this.props.item.key,
        });
        // alert(this.props.item.key);
      },
      right: [
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            Alert.alert(
              'Xác nhận',
              'Bạn muốn xóa bác sĩ này?',
              [
                { 
                  text: 'Không', 
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                { 
                  text: 'Có', 
                  onPress: () => {
                    dataSource.splice(this.props.index, 1);
                    this.props.parentSectionList.refreshSectionList(deletingRow);
                  }
                }
              ],
              { cancelable: true },
            );
          },
          component: (
            <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
            >
              <AntDesign name='delete' size={30} color='white' />
            </View>
          ),
          type: 'delete',
        }
      ],
      rowId: this.props.index,
      secId: 1,
    }

    return (
      <Swipeout {...swipeoutSetting}>
        <ListItem
          title={
            <View>
              <Text style={{fontSize: 20, color: 'black'}}>
                {this.props.item.name}
              </Text>
            </View>
          }
          // subtitle={this.props.item.type}
          leftAvatar={{
                  rounded: true,
                  size: "medium",
                  title: this.props.item.name[0],
                  imageProps: {resizeMode:'contain'},
                  source: { uri: this.props.item.avatar_url },
                  activeOpacity: 0.7,
                  showEditButton: false,
                  marginLeft: 20,
                }}
          contentContainerStyle={{height: 40,}}
        //   onPress={() => {
        //         this.props.navigation.navigate('DoctorProfile', { data: this.props.item })
        //       }}
        />
      </Swipeout>
    )
  }
}

export default class User_Family extends Component {
    constructor(props){
      super(props);
      this.state = {
        flatListData: [],
        deletedRowKey: null,
      };
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
  
    componentDidMount() {
      this.setState({
        flatListData: dataSource,
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
                      <FlatListItem item={item} index={index} navigation={this.props.navigation} parentSectionList={this} />
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