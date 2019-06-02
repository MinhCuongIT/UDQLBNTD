import React, {Component, PureComponent} from 'react';
import { StyleSheet, Text, View, FlatList, Alert, AsyncStorage } from 'react-native';
import { ListItem } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ApiDoctor from '../services/api';


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
          subtitle={this.props.item.ChuyenMon}
          leftAvatar={{
                  rounded: true,
                  size: "medium",
                  imageProps: {resizeMode:'contain'},
                  source: { uri: 'data:image/jpeg;base64,' + this.props.item.Avatar },
                  activeOpacity: 0.7,
                  showEditButton: false,
                  marginLeft: 20,
                }}
          contentContainerStyle={{height: 40,}}
          onPress={() => {
                  this.props.navigation.navigate('DoctorProfile', { myID: this.props.myID, data: this.props.item })
              }}
        />
    )
  }
}

export default class ListDoctors extends Component {
    constructor(props){
      super(props);
      this.state = {
        flatListData: [],
        deletedRowKey: null,
        myID: '',
        refreshing: false
      };

      this.apiDoctor = ApiDoctor();
    }

  
    static navigationOptions = ({ navigation }) => {
      return {
        title: 'Danh Sách Bác Sĩ',
        headerTitleStyle: {
          fontWeight: 'bold',
          marginLeft: 40,
          color: 'white',
        },
        headerStyle: {
          backgroundColor: 'rgba(74, 195, 180, 1)'
        },
        headerRight: (
          <TouchableOpacity
            style={{ backgroundColor: 'transparent', alignItems: 'center', paddingVertical: 20, marginRight: 30}}
            onPress={ () => {
              navigation.navigate('AddDoctor', { type: 2 });
            } }
          >
            <Ionicons name="md-person-add" size={30} color="white" />
          </TouchableOpacity>
        )
      }
    };
  
    async componentDidMount() {
      const id = await AsyncStorage.getItem('UserId');
      this.setState({
        myID: id,
      });
      this.getMyListDoctors();
      this.props.screenProps.socket.on('update relationship', async (info) => {
        if ((info.LoaiNguoiGui===2 && info.updateList===true) || (info.LoaiNguoiNhan===2 && info.updateList===true)){
          await this.getMyListDoctors()
        }
      });
    }

    getMyListDoctors = () => {
      let arrayholder = [];
      this.apiDoctor.getMyListDoctors(this.state.myID)
        .then((result) => {
          if(result){
            for(let i=0; i<result.length; i++){
              arrayholder.push(result.list_doctors[i])
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
    // refreshSectionList = (deletedKey) => {
    //   this.setState((prevState) => {
    //     return {
    //       deletedRowKey: deletedKey,
    //     };
    //   });
    // }

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