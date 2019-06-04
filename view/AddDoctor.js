import React, {Component, PureComponent} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Alert } from 'react-native';
import { ListItem, SearchBar } from "react-native-elements";
import ApiDoctor from '../services/api';


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
                  // rounded: true,
                  size: "medium",
                  // title: this.props.item.HoTen[0],
                  // imageProps: {resizeMode:'contain'},
                  source: { uri: 'data:image/jpeg;base64,' + this.props.item.Avatar },
                  activeOpacity: 0.7,
                  showEditButton: false,
                  marginLeft: 20,
                }}
          contentContainerStyle={{height: 40,}}
          onPress={ () => {
            this.props.navigation.navigate('DoctorProfile', { myID: this.props.myID, data: this.props.item, type: this.props.type });
          } }
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
        myID: this.props.navigation.getParam('myID'),
        type: this.props.navigation.getParam('type')
      };

      this.apiFindDoctor = ApiDoctor();

      this.updateSearch = this.updateSearch.bind(this);
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

    updateSearch = search_DoctorID => {
      this.setState({ search_DoctorID, flatListData: [] });
      if (search_DoctorID.length===10){
        this.apiFindDoctor.findDoctorByID(search_DoctorID)
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
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <SearchBar
                    lightTheme
                    containerStyle={{backgroundColor: 'transparent', width: Dimensions.get('window').width, borderBottomWidth: 0, borderRightWidth: 0}}
                    inputContainerStyle={{backgroundColor: 'rgba(0,0,0,0.1)', height: 40}}
                    inputStyle={{color: 'white',}}
                    keyboardType='numeric'
                    underlineColorAndroid='transparent'
                    placeholder="Nhập số điện thoại..."
                    searchIcon={null}
                    placeholderTextColor='white'
                    onClear={() => { this.setState({ search_DoctorID: ''}) }}
                    onChangeText={this.updateSearch}
                    value={this.state.search_DoctorID}
                />
            </View>
            <FlatList
                renderItem={
                  ({item, index}) => {
                    return(<FlatListItem item={item} index={index} navigation={this.props.navigation} myID={this.state.myID} type={this.state.type}/>)
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
      backgroundColor: '#F5FCFF',
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