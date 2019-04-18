import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, SectionList, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar, Image, Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/AntDesign'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';


var dataSource = [
    // Tiểu Đường
    {
      data: [
          {
            id: '0001',
            type: 'Diabetes', 
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG28.png',
            name: 'Nguyễn Thiện An',
            subtitle: 'Bác sĩ',
          },
          {
            id: '0002',
            type: 'Diabetes',
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG151.png',
            name: 'Nguyễn Văn Chung',
            subtitle: 'Bác sĩ',
          },
          { 
            id: '0003',
            type: 'Diabetes',
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG150.png',
            name: 'Trần Thị Thu Hương',
            subtitle: 'Bác sĩ',
          },
          { 
            id: '0004',
            type: 'Diabetes',
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG158.png',
            name: 'Lê Tiến Đạt',
            subtitle: 'Bác sĩ',
          },
          { 
            id: '0005',
            type: 'Diabetes',
            avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG67.png',
            name: 'Hoàng Thị Minh Thư',
            subtitle: 'Bác sĩ',
          },
          { 
            id: '0006',
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
              id: '0007',
              type: 'BloodPressure',
              avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG149.png',
              name: 'Trần Thị Thu Phương',
              subtitle: 'Bác sĩ',
            },
            { 
              id: '0008',
              type: 'BloodPressure',
              avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG115.png',
              name: 'Lý Thiên Kim',
              subtitle: 'Bác sĩ',
            },
            { 
              id: '0009',
              type: 'BloodPressure',
              avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG105.png',
              name: 'Huỳnh Ngọc Như',
              subtitle: 'Bác sĩ',
            },
            { 
              id: '00010',
              type: 'BloodPressure',
              avatar_url: 'http://pngimg.com/uploads/pokemon/pokemon_PNG45.png',
              name: 'Trần Thị Xuân Thủy',
              subtitle: 'Bác sĩ',
            },
        ],
        title: 'Huyết Áp',
    },
];

export default class ListDoctorsStack extends Component {
    constructor(props){
      super(props);
      this.state = {
        sectionListData: [],
        // isLoading: false,
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
          <SearchBar
            round
            lightTheme
            containerStyle={{backgroundColor: 'rgba(54, 175, 160, 1)', width: Dimensions.get('window').width, }}
            inputContainerStyle={{marginHorizontal: 10, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 50,}}
            inputStyle={{color: 'white',}}
            underlineColorAndroid='transparent'
            placeholder="Nhập tại đây..."
            searchIcon={{color: 'white',}}
            placeholderTextColor='rgba(255,255,255,0.5)'
            onChangeText={navigation.getParam('updateSearch')}
            value={navigation.getParam('search')}
          />
        ),
      }
    };
  
    componentDidMount() {
      this.makeRemoteRequest();
      this.props.navigation.setParams({updateSearch: this.updateSearch,});
    }

    makeRemoteRequest = () => {
      this.setState({
        // loading: true,
        sectionListData: dataSource,
      });
      this.arrayholder = dataSource;
    };
  
    keyExtractor = (item, index) => index.toString()
  
    _renderItem = ({ item, index, section }) => (
      <ListItem
        title={
          <View>
            <Text style={{fontSize: 20, color: 'black'}}>
              {item.name}
            </Text>
          </View>
        }
        subtitle={item.subtitle}
        leftAvatar={{
                rounded: true,
                size: "medium",
                title: item.name[0],
                imageProps: {resizeMode:'contain'},
                source: { uri: item.avatar_url },
                activeOpacity: 0.7,
                showEditButton: false,
                marginLeft: 20,
              }}
        contentContainerStyle={{height: 40,}}
        onPress={() => {
              this.props.navigation.navigate('Chat', {title: item.name, avatar: item.avatar_url})
            }}
        rightElement={
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 0.3, marginRight: 20, }}>
            <Icon
              name="profile"
              size={25}
              color="blue"
              onPress={() => alert("Xem")}
            />
            <Icon
              name="closesquareo"
              size={25}
              color="red"
              onPress={() => {this.deleteUser(item)}}
            />
          </View>

        }
      />
    )

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

    // _renderSectionHeader = ({section}) => (
    //     <View style={styles.sectionTitleBorderBottom}>
    //         <Image
    //           source={require('./img/BloodPressure.png')} 
    //           style={styles.customImg}
    //         />
    //         <Text style={styles.sectionTitle}>{section.title}</Text>
    //     </View>
    // )

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

    deleteUser = user => {
      let tempArray = dataSource;

      for (let i=0; i<tempArray.length; i++) {
        let index = tempArray[i].data.indexOf(user);
        alert(index);
        if (index > -1) {
          tempArray[i].data.splice(index, 1);
          break;
        }
      }

      dataSource = tempArray;
     
      // this.render();
      alert(JSON.stringify(tempArray));
    }
  
    render() {
      return (
        <View style={styles.wrapper}>
            <SectionList
                renderItem={this._renderItem}
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