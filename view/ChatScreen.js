import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, AsyncStorage } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from "react-native-elements";
import { TextInput } from 'react-native-gesture-handler';
import ApiChat from '../services/api';

  
export class RightListItems extends PureComponent {
    constructor(props){
      super(props);
    }
  
    render() {
      let _time = new Date(this.props.item.NgayGioGui);
      // alert(this.props.item.NgayGioGui);
      return (
        <View style={{flexDirection: 'row', alignSelf: 'flex-end',}}>
          <View style={{justifyContent: 'flex-end', paddingBottom: 7, paddingHorizontal: 10,}}>
            <Text style={{fontSize: 12, color: 'silver',}}>
              {_time.getDate()+'/'+(_time.getMonth()+1)+' - '+_time.getHours()+':'+_time.getMinutes()}
            </Text>
          </View>
          <View style={[styles.BubbleChat, styles.rightBubbleChat]}>             
            <Text style={{paddingTop: 5, color: 'white', fontSize: 17}}>
              {this.props.item.NoiDung}
            </Text>
          </View>
        </View>
      )
    }
}
  
export class LeftListItems extends PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        let _time = new Date(this.props.item.NgayGioGui);
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
            <View style={{justifyContent: 'flex-end', paddingBottom: 7, paddingHorizontal: 10,}}>
              <Text style={{fontSize: 12, color: 'silver',}}>
                {_time.getDate()+'/'+(_time.getMonth()+1)+' - '+_time.getHours()+':'+_time.getMinutes()}
              </Text>
            </View>
        </View>
        )
    }
} 
  
export default class ChatScreen extends Component {
  _isMounted = false;
    constructor(props) {
      super(props);
      this.state = {
        myID: '',
        receiverID:  this.props.navigation.getParam('type')===1
        ?this.props.navigation.getParam('data').MaBenhNhan
        :this.props.navigation.getParam('data').MaBacSi,  
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
      this._isMounted = true;
      const userId = await AsyncStorage.getItem('UserId');
      
      if (this._isMounted)
        this.setState({
          myID: userId
        });
      // this.props.screenProps.socket.emit('join room', {
      //   MaTaiKhoan: userId,
      //   LoaiTaiKhoan: 1,
      // });

      if (this._isMounted)
        this.loadMessages();


      this.props.screenProps.socket.on('chat message', (msg) => {
        if(msg!==null){
          if ((msg.MaNguoiGui===this.state.receiverID && msg.LoaiNguoiGui===this.props.navigation.getParam('type'))
           || (msg.MaNguoiNhan===this.state.receiverID && msg.LoaiNguoiNhan===this.props.navigation.getParam('type'))){
            msg.NgayGioGui=msg.DateValue
            if (this._isMounted)
              this.setState({
                chatMessages: [msg, ...this.state.chatMessages]
              });
          }
        }
      });

      if (this._isMounted)
      await this.props.screenProps.socket.on('not seen message', async () => {
        const info = {
          MaTaiKhoan: this.state.receiverID,
          LoaiNguoiChinh: this.props.navigation.getParam('type'),
          MaTaiKhoanLienQuan: this.state.myID,
          TenNguoiLienQuan: this.props.screenProps.user.thongTinChung.hoTen,
          AvatarNguoiLienQuan: this.props.screenProps.user.thongTinChung.avatar,
          LoaiNguoiLienQuan: 1,
          LoaiThongBao: 2    // Thông báo có tin nhắn mới từ người khác
        }
        if (this._isMounted)
          await this.props.screenProps.socket.emit('create notifications', info);
        const info2 = {
          MaNguoiGui: this.state.myID,
          LoaiNguoiGui: 1,
          MaNguoiNhan: this.state.receiverID,
          LoaiNguoiNhan: this.props.navigation.getParam('type'),
          updateList: true,
        }
        if (this._isMounted)
          await this.props.screenProps.socket.emit('update relationship', info2);
      });
    }

    componentWillUnmount() {
      this._isMounted = false;
      this.apiChat.updateSeeing({
        MaTaiKhoan: this.state.myID,
        LoaiTaiKhoan: 1,
        MaTaiKhoanLienQuan: this.state.receiverID,
        LoaiTaiKhoanLienQuan: this.props.navigation.getParam('type')
      })
    }

    async submitChatMessage() {
      let today = new Date();
      let _today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      if (this._isMounted){
        this.setState({
          chatMessage: {
            MaNguoiGui: this.state.myID,
            LoaiNguoiGui: 1,
            MaNguoiNhan: this.state.receiverID,
            LoaiNguoiNhan: this.props.navigation.getParam('type'),
            NoiDung: this.state.txtInput,
            NgayGioGui: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes(),
            DateValue: today,
          },
          txtInput: '',
        }, ()=>
        this.props.screenProps.socket.emit('chat message', this.state.chatMessage)
        )
      }
    }

    keyExtractor = (item, index) => index.toString()
  
    _renderItem = ({item}) => {
      if(item.MaNguoiGui===this.state.myID){
        return(<RightListItems item={item}/>);
      }
      else{
        return(<LeftListItems item={item} avatar={this.props.navigation.getParam('data').Avatar}/>);
      }
    }

    loadMessages = async () => {
      await this.apiChat.getMessages(
        { id: this.state.myID, type: 1},
        { id: this.state.receiverID, type: this.props.navigation.getParam('type') },
        this.state.page
      ).then((msg) => {
        let dataTemp = []
        if(msg!==null){
          msg.map((item) => {     
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
        if (this._isMounted)
          this.setState({
            chatMessages: [...this.state.chatMessages, ...dataTemp]
          },() => {});
      })
    }

    handleLoadMore = () => {
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.loadMessages();
      })
    }
  
    render() {
      return (
        <View style={styles.wrapper}>
          <FlatList
              // contentContainerStyle={{paddingVertical: 20}}
              data={this.state.chatMessages}
              renderItem={this._renderItem}
              keyExtractor={this.keyExtractor}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.001}
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
      // paddingRight: 15,
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
      // maxWidth: scale(250),
      paddingHorizontal: 15,
      paddingTop: 10,
      paddingBottom: 15,
      borderRadius: 20,
      marginBottom: 10,
    },
    rightBubbleChat: {
        marginRight: 10,
        maxWidth: scale(250),
        alignItems: 'flex-end',
        backgroundColor: '#1084ff',
    },
    leftBubbleChat: {
        marginLeft: 10,
        maxWidth: scale(200),
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff',//white
    },
});
  