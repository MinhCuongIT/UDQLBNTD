import React, {Component, PureComponent} from 'react';
import { StyleSheet, Text, View, FlatList, SectionList, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar, Image, Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/AntDesign'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import { TouchableOpacity } from 'react-native-gesture-handler';

var dataSource = [
  // Tiểu Đường
  {
    data: [
        {
          key: '0001',
          type: 'Diabetes', 
          avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG28.png',
          name: 'Nguyễn Thiện An',
          subtitle: 'Bác sĩ',
        },
        {
          key: '0002',
          type: 'Diabetes',
          avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG151.png',
          name: 'Nguyễn Văn Chung',
          subtitle: 'Bác sĩ',
        },
        { 
          key: '0003',
          type: 'Diabetes',
          avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG150.png',
          name: 'Trần Thị Thu Hương',
          subtitle: 'Bác sĩ',
        },
        { 
          key: '0004',
          type: 'Diabetes',
          avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG158.png',
          name: 'Lê Tiến Đạt',
          subtitle: 'Bác sĩ',
        },
        { 
          key: '0005',
          type: 'Diabetes',
          avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG67.png',
          name: 'Hoàng Thị Minh Thư',
          subtitle: 'Bác sĩ',
        },
        { 
          key: '0006',
          type: 'Diabetes',
          avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG49.png',
          name: 'Ngô Bá Kiến',
          subtitle: 'Bác sĩ',
        },
    ],
    title: 'Tiểu Đường',
  },
  // Huyết Áp
  {
      data: [
          { 
            key: '0007',
            type: 'BloodPressure',
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG149.png',
            name: 'Trần Thị Thu Phương',
            subtitle: 'Bác sĩ',
          },
          { 
            key: '0008',
            type: 'BloodPressure',
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG115.png',
            name: 'Lý Thiên Kim',
            subtitle: 'Bác sĩ',
          },
          { 
            key: '0009',
            type: 'BloodPressure',
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG105.png',
            name: 'Huỳnh Ngọc Như',
            subtitle: 'Bác sĩ',
          },
          { 
            key: '00010',
            type: 'BloodPressure',
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG45.png',
            name: 'Trần Thị Xuân Thủy',
            subtitle: 'Bác sĩ',
          },
      ],
      title: 'Huyết Áp',
  },
];

export class SectionListItem extends PureComponent {
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
                    let indexSection  = dataSource.indexOf(this.props.section);
                    dataSource[indexSection].data.splice(this.props.index, 1);
                    // alert(dataSource[indexSection].data.length);
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
              <Icon name='delete' size={30} color='white' />
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
          subtitle={this.props.item.subtitle}
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
          onPress={() => {
                this.props.navigation.navigate('Chat', {title: this.props.item.name, avatar: this.props.item.avatar_url})
              }}
        />
      </Swipeout>
    )
  }
}

export default class ListDoctorsStack extends Component {
    constructor(props){
      super(props);
      this.state = {
        sectionListData: [],
        deletedRowKey: null,
        search: '',
      };
      
      this.arrayholder = [];
    }

  
    static navigationOptions = ({ navigation }) => {
      return {
        headerTitleStyle: {
          fontWeight: 'bold',
          marginLeft: 80,
          color: 'white',
        },
        headerStyle: {
          backgroundColor: 'rgba(54, 175, 160, 1)',
        },
        header: (
          <View style={{flexDirection: 'row', backgroundColor: 'rgba(54, 175, 160, 1)', width: Dimensions.get('window').width, height: 60}}>
            <SearchBar
              round
              lightTheme
              containerStyle={{backgroundColor: 'transparent', flex: 1}}
              inputContainerStyle={{backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 50, height: 40,}}
              inputStyle={{color: 'white',}}
              underlineColorAndroid='transparent'
              placeholder="Nhập tại đây..."
              searchIcon={{color: 'white',}}
              placeholderTextColor='rgba(255,255,255,0.5)'
              onChangeText={navigation.getParam('updateSearch')}
              value={navigation.getParam('search')}
            />
            <TouchableOpacity
              style={{ backgroundColor: 'transparent', alignItems: 'center', paddingVertical: 15}}
              onPress={() => { alert("Thêm thành công"); }}
            >
              <Text style={{color: 'white', fontSize: 20}}> Thêm </Text>
            </TouchableOpacity>
          </View>
        ),
      }
    };
  
    componentDidMount() {
      this.makeRemoteRequest();
      this.props.navigation.setParams({updateSearch: this.updateSearch,});
    }

    makeRemoteRequest = () => {
      this.setState({
        sectionListData: dataSource,
      });
      this.arrayholder = dataSource;
    };
  
    keyExtractor = (item, index) => index.toString()

    checkSwitch = ({section}) => {
      switch(section.title) {
   
        case "Tiểu Đường":
          return(
            <View style={styles.sectionTitleBorderBottom}>
              <Image
                source={require('../images/Diabetes.png')} 
                style={styles.customImg}
              />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>);
        
        case 'Huyết Áp':
          return(
            <View style={styles.sectionTitleBorderBottom}>
              <Image
                source={require('../images/BloodPressure.png')} 
                style={styles.customImg}
              />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>);

        default:
          break;
      
        }
   
    }

    updateSearch = search => {
      this.setState({
        search: search,
      })
      this.props.navigation.setParams({search: search});    

      var newData = [];

      for(let i=0; i < this.arrayholder.length; i++){
        const result = this.arrayholder[i].data.filter(user => {
          const userData = user.name.toUpperCase();
          const textData = search.toUpperCase();
          return userData.indexOf(textData) > -1;
        });
        if (result.length > 0)
            newData = [...newData,...result];
      }

      let tempObject_Diabetes = { data: [], title: "Tiểu Đường"},
          tempObject_BloodPressure = { data: [], title: "Huyết Áp"};
      for (let i=0; i<newData.length; i++) {
        if (newData[i].type=='Diabetes'){
          tempObject_Diabetes.data.push(newData[i]);
        }
        else {
          tempObject_BloodPressure.data.push(newData[i]);
        }
      }

      let tempArray = [];
      tempArray.push(tempObject_Diabetes);
      tempArray.push(tempObject_BloodPressure);
      
      this.setState({
        sectionListData: tempArray,
      });
      
      // alert(JSON.stringify(this.state.sectionListData));
    }

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
            <SectionList
                renderItem={
                  // this._renderItem
                  ({item, index, section}) =>{
                    return (
                      <SectionListItem item={item} index={index} navigation={this.props.navigation} section={section} parentSectionList={this} />
                    )
                  }
                }
                renderSectionHeader={this.checkSwitch}
                sections={this.state.sectionListData}
                keyExtractor={this.keyExtractor}
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
        fontSize: 30,
        margin: 10,
        color: 'black',
    },
    sectionTitleBorderBottom: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        marginHorizontal: 30,
        alignItems: 'center'
    },
    customImg: {
        borderRadius: 250,
        backgroundColor: 'transparent',
        width: 35,
        height: 35,
    },
});