/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, AsyncStorage} from 'react-native';
import { ListItem } from 'react-native-elements';
import ApiService from "../services/api";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class Notifications extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      isMore: true,
      page: 1,
      loading: false,
      totalPages: 5,
      data: [],
      numberNoti: 1,
      refreshing: true,
      haveData: false,
    };

    this.apiService = ApiService()
  }

  async componentDidMount() {
    this._isMounted = true;
    const userId = await AsyncStorage.getItem('UserId');
    this.props.screenProps.socket.emit('seen notifications', {
      MaTaiKhoan: userId,
      LoaiTaiKhoan: 1,
    })
    await this.handleLoadList();
    this.props.screenProps.socket.on('update list notifications', (info, id) => {
      let date = new Date(info.date)
      let temp = [{
        idNguoiLienQuan: info.MaTaiKhoanLienQuan,
        name: info.TenNguoiLienQuan,
        avatar_url: info.AvatarNguoiLienQuan,
        subtitle: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' vào lúc ' + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes(),
        isSeen: 0,
        typePeople: info.LoaiNguoiLienQuan,
        typeNotifications: info.LoaiThongBao,
        key: id,
      }]
      if (this._isMounted)
        this.props.screenProps.socket.emit('seen notifications', {
          MaTaiKhoan: userId,
          LoaiTaiKhoan: 1,
        })

      if (this._isMounted)
        this.setState({
          data: temp.concat(this.state.data)
        })
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  keyExtractor = (item, index) => item.key.toString()

  renderItem = ({ item, index }) => {
    let message1 = item.typePeople===1
      ? 'Người thân '
      : 'Bác sĩ ';

    let message2 = ''
    switch(item.typeNotifications) {
      case 1: {
        message2 += ' muốn theo dõi sức khỏe của bạn'
        break;
      }
      case 2:  {
        message2 += ' gửi tin nhắn mới cho bạn'
        break;
      }
      case 3:  {
        message2 += ' chấp nhận lời mời theo dõi của bạn'
        break;
      }
    }

    const message = (
      <Text style={{flexDirection:'row',}}>
        <Text>{message1}</Text>
        <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
        <Text>{message2}</Text>
      </Text>
    )
    return (
    <TouchableOpacity>
      <ListItem
        title={message}
        subtitle={item.subtitle}
        leftAvatar={{
          source: { uri: 'data:image/jpeg;base64,' + item.avatar_url },
          title: item.name[0]
        }}
        containerStyle={{
          backgroundColor: item.isSeen===1? 'white': 'rgba(74, 195, 180, 0.2)'
        }}
        contentContainerStyle={{
          // paddingRight: 30,
        }}
        titleProps={{
          padding: 10,
        }}
        subtitleStyle={{
          fontWeight: item.isSeen===1?'100':'bold',
          color: 'rgba(74, 195, 180, 0.7)'
        }}
        onPress={async () => {
          let dataTemp = JSON.parse(JSON.stringify(this.state.data))
          dataTemp[index].isSeen = 1
          if (this._isMounted)
            this.setState({
              data: dataTemp
            })
          const userId = await AsyncStorage.getItem('UserId');
          this.apiService.seenThisNotification({
            MaTaiKhoan: userId,
            LoaiNguoiChinh: 1,
            Id: item.key})

          // chuyen trang toi trang can thiet

          switch(item.typeNotifications) {
            case 1: {
              // message2 += ' muốn theo dõi sức khỏe của bạn'
              if (item.typePeople===1){
                this.apiService.getBenhNhanInfo({MaBenhNhan: item.idNguoiLienQuan})
                .then((result) => {
                  if (result !== null)
                  {
                    // alert(JSON.stringify(result))
                    const data = result[0]
                    this.props.navigation.navigate('RelativeProfile', { myID: this.props.screenProps.user.thongTinChung.sdt, data: data })
                  }
                })
              }
              else{
                this.apiService.findDoctorByID(item.idNguoiLienQuan)
                .then((result) => {
                  if (result !== null)
                  {
                    // alert(JSON.stringify(result))
                    const data = result[0]
                    this.props.navigation.navigate('DoctorProfile', { myID: this.props.screenProps.user.thongTinChung.sdt, data: data })
                  }
                })
              }
              break;
            }
            case 2:  {
              // message2 += ' tin nhắn mới'
              if (item.typePeople===1){
                this.apiService.getBenhNhanInfo({MaBenhNhan: item.idNguoiLienQuan})
                .then((result) => {
                  if (result !== null)
                  {
                    // alert(JSON.stringify(result))
                    const data = result[0]
                    this.props.navigation.navigate('RelativeProfile', { myID: this.props.screenProps.user.thongTinChung.sdt, data: data })
                  }
                })
              }
              else{
                this.apiService.findDoctorByID(item.idNguoiLienQuan)
                .then((result) => {
                  if (result !== null)
                  {
                    // alert(JSON.stringify(result))
                    const data = result[0]
                    this.props.navigation.navigate('DoctorProfile', { myID: this.props.screenProps.user.thongTinChung.sdt, data: data })
                  }
                })
              }
              break;
            }
            case 3: {
              // message2 += ' muốn theo dõi sức khỏe của bạn'
              if (item.typePeople===1){
                this.apiService.getBenhNhanInfo({MaBenhNhan: item.idNguoiLienQuan})
                .then((result) => {
                  if (result !== null)
                  {
                    // alert(JSON.stringify(result))
                    const data = result[0]
                    this.props.navigation.navigate('RelativeProfile', { myID: this.props.screenProps.user.thongTinChung.sdt, data: data })
                  }
                })
              }
              else{
                this.apiService.findDoctorByID(item.idNguoiLienQuan)
                .then((result) => {
                  if (result !== null)
                  {
                    // alert(JSON.stringify(result))
                    const data = result[0]
                    this.props.navigation.navigate('DoctorProfile', { myID: this.props.screenProps.user.thongTinChung.sdt, data: data })
                  }
                })
              }
              break;
            }
          }

          // const info = {
          //   MaTaiKhoan: userId,
          //   LoaiNguoiChinh: 1,
          //   MaTaiKhoanLienQuan: "0123456",
          //   TenNguoiLienQuan: 'Lê Thị D',
          //   AvatarNguoiLienQuan: 'https://img.pokemondb.net/artwork/large/charizard-mega-y.jpg',
          //   LoaiNguoiLienQuan: 2,
          //   LoaiThongBao: 1
          // }
          // await this.props.screenProps.socket.emit('create notifications', info);

        }}
      />
    </TouchableOpacity>
  )}


  handleLoadList = async () => {
    const userId = await AsyncStorage.getItem('UserId');
    this.apiService.getListNotifications({
      MaTaiKhoan: userId,
      LoaiNguoiChinh: 1,
      page: this.state.page,
    })
      .then((result) => {
        let dataTemp = []

        if (result !== null) {
          result.notifications.map((item) => {
            let date = new Date(item.ThoiGian)
            let temp = {
              idNguoiLienQuan: item.MaTaiKhoanLienQuan,
              name: item.TenNguoiLienQuan,
              avatar_url: item.AvatarNguoiLienQuan,
              subtitle: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' vào lúc ' + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes(),
              isSeen: item.DaXem,
              typePeople: item.LoaiNguoiLienQuan,
              typeNotifications: item.LoaiThongBao,
              key: item.Id,
            }

            dataTemp.push(temp)
          })
        }
        if (this._isMounted)
          this.setState({
            data: [...this.state.data, ...dataTemp],
            refreshing: false,
          })
      })
  }

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    },async () => {
      await this.handleLoadList()
    })
  }

  handleRefresh = () => {
    this.setState({
      page: 1,
      data: [],
      refreshing: true,
    },async () => {
      await this.handleLoadList()
    })
  }

  render () {
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.data}
        renderItem={this.renderItem}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.001}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
