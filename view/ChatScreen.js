import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, chatMessage, TouchableOpacity, FlatList, Alert, AsyncStorage } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from "react-native-elements";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import socketIOClient from 'socket.io-client';
import { config } from '../services/config'
import { TextInput } from 'react-native-gesture-handler';
import ApiChat from '../services/api';

let { baseURL } = config  
const socket = socketIOClient(baseURL)

export class DateTime extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          currDate: '',
          time: '',
        }
    }

    componentDidMount() {
        // Get current dd/MM/yyyy
        let today = new Date(),
            _date = today.getDate(),
            _month = today.getMonth() + 1,
            _year = today.getFullYear();
        let _hr = today.getHours(),
            _min = today.getMinutes();
        this.setState({
        currDate: _date + '-' + _month + '-' + _year,
        time: _hr + ':' + _min,
        });
    }

    render() {
        return(
        <View style={{justifyContent: 'flex-end', paddingBottom: 7, paddingHorizontal: 10,}}>
            <Text style={{fontSize: 12, color: 'silver',}}>
            {this.state.time}
            </Text>
        </View>
        )
    }
}
  
export class RightListItems extends PureComponent {
    constructor(props){
      super(props);
    }
  
    render() {
      return (
        <View style={{flexDirection: 'row', alignSelf: 'flex-end',}}>
          <DateTime />
          <View style={[styles.BubbleChat, styles.rightBubbleChat]}>             
            <Text style={{paddingTop: 5, color: 'white', fontSize: 17}}>
              {this.props.item.NoiDung}
            </Text>
          </View>
          {/* <Avatar
                size="medium"
                rounded
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqUifDeYJGapfmg23wf6fEGWG9EHJwYdFRyM-dSTr1PANe6Be9Vg'}}
                activeOpacity={0.7}
              /> */}
        </View>
      )
    }
}
  
export class LeftListItems extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        return (
        <View style={{flexDirection: 'row', alignSelf: 'flex-start',}}>
            <Avatar
                size="medium"
                rounded
                source={{ uri: 'data:image/jpeg;base64,' + this.props.avatar}}
                activeOpacity={0.7}
                />
            <View style={[styles.BubbleChat, styles.leftBubbleChat]}>             
              <Text style={{paddingTop: 5, color: 'black', fontSize: 17}}>
                  {this.props.item.NoiDung}
              </Text>
            </View>
            {/* <DateTime /> */}
        </View>
        )
    }
} 
  
export default class ChatScreen extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        myID: '',
        receiverID: this.props.navigation.getParam('data').MaBenhNhan,  
        txtInput: '',
        chatMessage: '',
        chatMessages: [],
        page: 1
      };

      this.apiChat = ApiChat();
    }
  
    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('title'),
        headerTitleStyle: {
          fontWeight: 'bold',
          // color: 'white', người gửi
        },
        headerStyle: {
          backgroundColor: 'rgba(74, 195, 180, 1)',
        },
        headerTintColor: 'white',
      };
    };

    async componentDidMount() {  
      const userId = await AsyncStorage.getItem('UserId');
      this.setState({
        myID: userId
      });
      socket.emit('join room', {
        MaTaiKhoan: userId,
        LoaiTaiKhoan: 1,
      });
      this.apiChat.getMessages(
        { id: this.state.myID, type: 1},
        { id: this.state.receiverID, type: this.props.navigation.getParam('type') },
        this.state.page
      ).then((msg) => {
        let dataTemp = []
        if(msg!==null){
          // alert(JSON.parse(JSON.stringify(msg)))   
          msg.map((item) => {     
            // alert(JSON.stringify(item))
            let date = new Date(item.NgayGioGui)
            let temp = {
              MaNguoiGui: item.MaNguoiGui,
              LoaiNguoiGui: item.LoaiNguoiGui,
              MaNguoiNhan: item.MaNguoiNhan,
              LoaiNguoiNhan: item.LoaiNguoiNhan, 
              NoiDung: item.NoiDung,
              NgayGioGui: date,
            }

            dataTemp.push(temp)
          })
        }
        this.setState({
          chatMessages: [...this.state.chatMessages, ...dataTemp]
        },() => {});
      })
      // this.socket = io(baseURL); cai nay sua sau cho theo format cua t, h lam de test trc
      socket.on('chat message', (msg) => {
        if(msg!==null){
          this.setState({
            chatMessages: [msg, ...this.state.chatMessages]
          });
        }
      });
    }

    async submitChatMessage() {
      // alert(this.state.myID)
      let today = new Date();
      let _today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      this.setState({
        chatMessage: {
          MaNguoiGui: this.state.myID,
          LoaiNguoiGui: 1,
          MaNguoiNhan: this.state.receiverID,//ừa
          LoaiNguoiNhan: this.props.navigation.getParam('type'),// 
          NoiDung: this.state.txtInput,
          NgayGioGui: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes(),
        },
        txtInput: '',
      }, async () => {
      // alert(JSON.stringify(this.state.chatMessage))
        await socket.emit('chat message', this.state.chatMessage);
      });
      // alert(this.state.myID)

      // let mess=[{ content: 'reply: ' + this.state.txtInput.toString(), type: 2, key: (this.state.items.length + 1).toString() }]
      // mess.push({ content: this.state.txtInput.toString(), type: 1 , key: this.state.items.length.toString()});
      
      // if (this.state.chatMessage !== '')
      // {
      //   //Adding Items To Array.
      //   this.setState({
      //     items: [...mess, ...this.state.items],
      //     txtInput: '',
      //   });
      // }
    }

    keyExtractor = (item, index) => index.toString()
  
    _renderItem = ({item}) => {
      // alert(JSON.stringify(item))
      if(item.MaNguoiGui===this.state.myID){
        return(<RightListItems item={item}/>);
      }
      else{
        return(<LeftListItems item={item} avatar={this.props.navigation.getParam('data').Avatar}/>);
      }
    }
  
    render() {
      return (
        <View style={styles.wrapper}>
          <FlatList
              contentContainerStyle={{paddingVertical: 20}}
              data={this.state.chatMessages}
              renderItem={this._renderItem}
              keyExtractor={this.keyExtractor}
              inverted
          >
          </FlatList> 
          <View style={[{flexDirection: 'row'},styles.customChat]}>
            <TextInput
              placeholder="Nhập tin nhắn..."
              onChangeText={(txtInput) => this.setState({txtInput})}
              value={this.state.txtInput}
              style={[styles.chatBox]}
            />
            <TouchableOpacity 
              onPress={() => {this.submitChatMessage()}}
              style={[ styles.chatBtn]}
              >
              <Icon name="md-send" size={35} color="#1084ff" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
}
  
// ======================================================
  
  
const styles = StyleSheet.create({
    wrapper: {
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 0,
      justifyContent: 'flex-end',
      backgroundColor: '#F5FCFF',
      flex: 1,
    },
  
    customChat: {
      marginLeft: 0,
      marginBottom: 15,
      marginVertical: 15,
      height: 40,
    },
    chatBox: {
      borderRadius: 15,
      marginRight: 15,
      paddingVertical: 5,
      paddingHorizontal: 15,
      height: 40,
      borderWidth: 1,
      borderColor: '#1084ff',//black
      flex: 0.9,
    },
    chatBtn: {
      alignItems: 'center',
      marginRight: 0,
      flex: 0.1, 
    },
  
    // Custom Bubble Chat
    BubbleChat: {
      maxWidth: scale(250),
      paddingHorizontal: 15,
      paddingTop: 10,
      paddingBottom: 15,
      borderRadius: 20,
      marginBottom: 10,
    },
    rightBubbleChat: {
        marginRight: 10,
        alignItems: 'flex-end',
        backgroundColor: '#1084ff',
    },
    leftBubbleChat: {
        marginLeft: 10,
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff',//white
    },
});
  