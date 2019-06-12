import React, {Component, PureComponent} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Alert, TouchableOpacity, Share } from 'react-native';
import { ListItem, SearchBar } from "react-native-elements";
import ApiDoctor from '../services/api';


class FlatListItem extends PureComponent {
  constructor (props) {
    super(props); 
  }
  
  render () {
    // if(this.props.item.MaBacSi !== null){
      return(
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
    // }
    // else{
    //   return (
    //     <View style={{margin:10, flex:1}}>
    //       <Text style={{fontSize: 20, color: 'black'}}>
    //         Không tìm thấy tài khoản
    //       </Text>
    //     </View>
    //   )
    // }
  }
}

export default class AddDoctor extends Component {
    constructor(props){
      super(props);
      this.state = {
        flatListData: [],
        search_DoctorID: '',
        existDoctorId: true,
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

    onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'Vui lòng vào link sau: XXX để cài đặt ứng dụng',
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    }

    ListEmpty = () => {
      if(this.state.existDoctorId===false){
        return(
          <View style={{ justifyContent: 'center', flex: 1, margin: 10 }}>
            <TouchableOpacity
                style={{ backgroundColor: 'rgba(74, 195, 180, 1)', padding: 10, justifyContent: 'center' }}
                onPress={ this.onShare } >
                  <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>Mời {this.state.search_DoctorID} tham gia ứng dụng </Text>
                </TouchableOpacity>
          </View>
        );
      }
      else{
        return (
          //View to show when list is empty
          <View style={{ justifyContent: 'center', flex: 1, margin: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Hiện không có kết quả nào</Text>
          </View>
        );
      }
    };

    updateSearch = search_DoctorID => {
      this.setState({ search_DoctorID, flatListData: [], existDoctorId: true });
      if (search_DoctorID.length===10){
        this.apiFindDoctor.findDoctorByID(search_DoctorID)
            .then((result) => {
                if(result !== null){
                  this.setState({
                      flatListData: result
                  });
                }
                else{
                  this.setState({
                    existDoctorId: false
                });
                }
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
                ListEmptyComponent={this.ListEmpty}
                data={this.state.flatListData}
                keyExtractor={this.keyExtractor}
                extraData={this.state.existDoctorId}
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