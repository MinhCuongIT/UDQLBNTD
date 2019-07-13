/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
  Platform, StyleSheet,
  Text, View, Image, FlatList, Dimensions, ImageBackground, TouchableOpacity,
  Alert, SectionList, ScrollView, AsyncStorage, RefreshControl,
  YellowBox
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Avatar, Badge, withBadge } from 'react-native-elements';
import ActionButton from 'react-native-circular-action-menu';
import ApiService from "../services/api";
import socketIOClient from "socket.io-client";
import firebase from "react-native-firebase";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
type Props = {};

class Logo extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', }}>
          <Image
            style={{ height: 50, width: 50, marginLeft: 30 }}
            source={require('../images/logo-bigsize.png')}
          />
          <Image
            style={{ height: 50, width: 150, marginLeft: 20 }}
            source={require('../images/AppName.png')}
          />
        </View>
      </View>
    )
  }
}

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    const BadgedIcon = withBadge(navigation.getParam('numberNoti'))(Icon)
    return {
      headerTitle: <Logo />,
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
          style={{ marginRight: 30 }}
        >
          {navigation.getParam('numberNoti') !== 0
            ? <BadgedIcon color={'white'} size={30} type="FontAwesome5" name="bell" />
            : <Icon color={'white'} size={30} type="FontAwesome5" name="bell" />}
        </TouchableOpacity>
      ),
    }
  }

  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      isMore: true,
      page: 1,
      loading: false,
      totalPages: 5,
      // data: [],
      numberNoti: 0,
      refreshing: false,
      // haveData: false,
      dateToday: new Date(),
    };

    this.apiService = ApiService()
  }

  async componentDidMount() {
    // const info = {
    //   MaTaiKhoan: "111",
    //   MaTaiKhoanLienQuan: "789",
    //   LoaiNguoiLienQuan: 1,
    //   LoaiThongBao: 2
    // }
    this._isMounted = true;
    const userId = await AsyncStorage.getItem('UserId');
    // const socket = socketIOClient(`http://192.168.1.4:5500/1/${userId}`);
    // await this.props.screenProps.setSocket(socket)
    await this.props.screenProps.socket.emit('join room', {
      MaTaiKhoan: userId,
      LoaiTaiKhoan: 1,
    });

    this.props.screenProps.socket.on('rejoin room', () => {
      this.props.screenProps.socket.emit('join room', {
        MaTaiKhoan: userId,
        LoaiTaiKhoan: 1,
      });
    });

    await this.props.screenProps.socket.emit('get notifications number', {
      MaTaiKhoan: userId,
      LoaiTaiKhoan: 1,
    });
    await this.props.screenProps.socket.on('get notifications number', (info) => {
      if (this._isMounted)
        this.setState({
          numberNoti: info
        })

      this.props.navigation.setParams({ numberNoti: this.state.numberNoti });
    })

    await this.props.screenProps.socket.on('update notifications number', () => {
      this.props.screenProps.socket.emit('get notifications number', {
        MaTaiKhoan: userId,
        LoaiTaiKhoan: 1,
      });
    })

    this.loadItems();
    this.loadUser();
    this.checkPermission();
    this.createNotificationListeners();
  }

  async componentWillMount() {
    this._isMounted = true;
    const userId = await AsyncStorage.getItem('UserId');
    await this.props.screenProps.socket.emit('join room', {
      MaTaiKhoan: userId,
      LoaiTaiKhoan: 1,
    });
    this.props.screenProps.socket.emit('get notifications number', {
      MaTaiKhoan: userId,
      LoaiTaiKhoan: 1,
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.notificationListener();
    this.notificationOpenedListener();
  }

  loadUser = async () => {
    const userId = await AsyncStorage.getItem('UserId');
    this.apiService.getBenhNhanInfo({
      MaBenhNhan: userId,
    }).then((result) => {
      if (result !== null) {
        // this.setState({
        //   userName: result[0].HoTen
        // })
        var pullResult = result[0];
        let NgaySinhT = new Date(pullResult.NgaySinh);
        var source = pullResult.Avatar;
        // alert(pullResult.GioiTinh)
        this.props.screenProps.setUser({
          thongTinChung: {
            anhBia: require("../images/hinh_bien.jpg"),
            avatar: source,
            hoTen: pullResult.HoTen,
            sdt: pullResult.MaBenhNhan,
            cmnd: (pullResult.CMND === null) ? "Chưa có dữ liệu" : pullResult.CMND,
            gioiTinh: (pullResult.GioiTinh === null) ? 1 : pullResult.GioiTinh.data[0],
            ngaySinh: (pullResult.NgaySinh === null) ? "Chưa có dữ liệu" : (NgaySinhT.getFullYear() + '-' + (NgaySinhT.getMonth() + 1) + '-' + NgaySinhT.getDate()),
            diaChi: (pullResult.DiaChi === null) ? "Chưa có dữ liệu" : pullResult.DiaChi,
            ngheNghiep: (pullResult.NgheNghiep === null) ? "Chưa có dữ liệu" : pullResult.NgheNghiep,
            nhomMau: (pullResult.NhomMau === null) ? "Chưa có dữ liệu" : pullResult.NhomMau,
          },
          lienHe: {
            email: (pullResult.Email === null) ? "Chưa có dữ liệu" : pullResult.Email,
          },
          taiKhoan: {
            password: pullResult.Password,
          }
        })
      }
    })
  }
  async loadItems() {
    const userId = await AsyncStorage.getItem('UserId');
    // await this.setState({
    //   data: []
    // })
    this.setState({
      dateToday: new Date()
    })
    this.props.screenProps.setData([]);
    for (let i = 0; i < 2; i++) {
      await this.loadDataItem(userId, i)
    }
    this.apiService.getTodayMeal({ MaBenhNhan: userId })
      .then((result) => {
        let dataTemp = [
          [],
          [],
          [],
        ]

        if (result !== null) {
          for (let i = 0; i < result.meals.length; i++) {
            let temp = result.meals[i]
            dataTemp[temp.Buoi - 1].push({
              MonAn: temp.MonAn,
              id: temp.Id,
            })
          }

          this.props.screenProps.setTodayMeals(dataTemp)
        }

      })
  }

  loadDataItem = async (userId, i) => {
    let dataT = [];
    await this.apiService.getHealthValue({
      MaBenhNhan: userId,
      Loai: i + 1,
    }).then(async (result) => {
      // if (result !== null && result.length > 0) {
      // alert(result[0].Loai + ' ' + result.length)
      let getData = i + 1 === 1
        //Đường huyết
        ? {
          data: [],
          color: (opacity = 1) => `rgba(70, 200, 120, ${opacity})`,
          strokeWidth: 6
        }
        // Huyết áp
        : [{
          data: [],
          color: (opacity = 1) => `rgba(22, 19, 208, ${opacity})`,
          strokeWidth: 6

        },
        {
          data: [],
          color: (opacity = 1) => `rgba(212, 25, 28, ${opacity})`,
          strokeWidth: 6
        }]
      let valueData = {
        data: {
          labels: [],
          datasets:
            [
              {
                data: [],
                color: (opacity = 0.7) => `rgba(255, 0, 0, ${opacity})`,
                strokeWidth: 2
              },
              {
                data: [],
                color: (opacity = 1) => `rgba(240, 180, 00, ${opacity})`,
                strokeWidth: 2
              },
            ]
        },
        date: [],
        type: i + 1 === 1
          ? 'ĐƯỜNG HUYẾT (mmol/L)'
          : 'HUYẾT ÁP (mmHg)',
        id: i + 1,
        highDomain: i + 1 === 1
          ? 10.2 //Đường huyết
          : 0,   //Huyết áp
        lowDomain: i + 1 === 1
          ? 3.8 //Đường huyết
          : 0,  //Huyết áp
        unit: i + 1 === 1
          ? 'mmol/L' //Đường huyết
          : 'mmHg',  //Huyết áp
      }

      const highDomain = valueData.highDomain
      const lowDomain = valueData.lowDomain
      if (result !== null && result.length > 0) {
        for (let index = (result.length - 1); index >= 0;) {
          switch (result[0].Loai) {
            case 1: {
              const getDate = new Date(result[index].NgayNhap)
              valueData.date.push(getDate)
              valueData.data.datasets[0].data.push(highDomain);
              valueData.data.datasets[1].data.push(lowDomain);
              getData.data.push(result[index].ChiSo)

              valueData.data.labels.push(getDate.getDate() + '/' + (getDate.getMonth() + 1))
              index--;
              break;
            }
            case 2: {
              const getDate = new Date(result[index].blood_pressure01.NgayNhap)
              valueData.date.push(getDate)
              getData[0].data.push(result[index].blood_pressure02.ChiSo);
              // --index;
              getData[1].data.push(result[index].blood_pressure01.ChiSo);

              valueData.data.labels.push(getDate.getDate() + '/' + (getDate.getMonth() + 1))
              index--;
              break;
            }
          }
        }
      }
      switch (i + 1) {
        case 1: {
          valueData.data.datasets.push(getData);
          break;
        }
        case 2: {
          valueData.data.datasets = valueData.data.datasets.concat(getData);
          break;
        }
      }
      // await this.setState(
      //   {
      //     data: [...this.state.data,...dataT],
      //   }
      // );
      dataT.push(valueData);
      await this.props.screenProps.setData([...this.props.screenProps.data, ...dataT])

      // this.setState({
      //   haveData: true
      // })
      this.props.screenProps.setHaveData(true)
      // }
    })
  }

  handleLoadMore = () => {
    if (this.state.page < this.state.totalPages) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.loadItems()
        }
      );
    }
  };

  handleNewsDetail = (item) => {
    this.props.navigation.navigate('NewsDetails', { item: item })
  };

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    this.loadItems().then(() => {
      this.setState({ refreshing: false });
    });

    // const userId = await AsyncStorage.getItem('UserId')
    // const info = {
    //   MaTaiKhoan: userId,
    //   LoaiNguoiChinh: 1,
    //   MaTaiKhoanLienQuan: "0123456",
    //   TenNguoiLienQuan: 'Trần Thị B',
    //   AvatarNguoiLienQuan: 'https://img.pokemondb.net/artwork/large/charizard-mega-y.jpg',
    //   LoaiNguoiLienQuan: 2,
    //   LoaiThongBao: 1
    // }
    // await this.props.screenProps.socket.emit('create notifications', info);

  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
      // alert('enable')
    } else {
      // alert('unenable')
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      // alert('token')
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // alert(fcmToken)
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
        const userId = await AsyncStorage.getItem('UserId');
        await firebase.messaging().subscribeToTopic(`1-${userId}`);
      }
    }
    // alert(fcmToken)
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  render() {
    let listChart = this.props.screenProps.haveData//this.state.haveData
      ? this.props.screenProps.data.map(item => {
        const chartConfig = {
          backgroundGradientFrom: '#F5FCFF',
          backgroundGradientTo: '#F5FCFF',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2
        }
        const screenWidth = Dimensions.get('window').width

        const highDomain = item.highDomain
        const lowDomain = item.lowDomain
        const unit = item.unit
        // alert(item.date)
        return (
          <View key={item.type}>
            <View style={{ flexDirection: 'row', margin: 10, marginTop: 20, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', }}>
                {/*<Image*/}
                {/*source={item.type==='ĐƯỜNG HUYẾT (mmol/L)'*/}
                {/*? require('../images/Diabetes.png')*/}
                {/*: require('../images/BloodPressure.png')}*/}
                {/*style={styles.chartTitleIcon}*/}
                {/*/>*/}
                <Text style={{ marginHorizontal: 10, fontSize: 20, fontWeight: 'bold' }}>{item.type}</Text>
              </View>
              <TouchableOpacity
                onPress={() => item.type === 'ĐƯỜNG HUYẾT (mmol/L)'
                  ? this.props.navigation.navigate('AddDiabetes')
                  : this.props.navigation.navigate('AddBloodPressure')
                }
              >
                <Image
                  source={require('../images/plus.png')}
                  style={styles.chartTitleIcon}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => { this.props.navigation.navigate('HomeDetails', { item: item }) }}
            >
              <LineChart
                data={item.data}
                width={screenWidth + 1}
                height={220}
                chartConfig={chartConfig}
                onDataPointClick={(item) => {
                  Alert.alert(
                    highDomain !== 0
                      ? item.value >= highDomain
                        ? 'Giá trị chỉ số là ' + item.value.toString() + ' ' + unit + ', ở ngưỡng cao'
                        : item.value <= lowDomain
                          ? 'Giá trị chỉ số là ' + item.value.toString() + ' ' + unit + ', ở ngưỡng thấp'
                          : 'Giá trị chỉ số là ' + item.value.toString() + ' ' + unit + ', ở mức bình thường'
                      : 'Giá trị chỉ số là ' + item.value.toString() + ' ' + unit + ''
                  )
                }}
                withShadow={false}
                bezier
              />
            </TouchableOpacity>
            <View style={{ marginLeft: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
              {/*<View style={item.type==='ĐƯỜNG HUYẾT (mmol/L)'?styles.errorStatus:styles.normalStatus}></View>*/}
              {/*<TouchableOpacity*/}
              {/*onPress={async () => {*/}
              {/*// await AsyncStorage.clear();this.props.navigation.navigate('LoginStack')*/}
              {/*}}*/}
              {/*style={styles.btnMess}*/}
              {/*>*/}
              {/*<Text style={{color: 'white', fontSize: 17}}>*/}
              {/*Liên hệ bác sĩ chuyên môn*/}
              {/*</Text>*/}
              {/*</TouchableOpacity>*/}
            </View>
          </View>
        )
      })
      : <TouchableOpacity
        onPress={async () => {
          // await AsyncStorage.clear();this.props.navigation.navigate('LoginStack')
        }}
      ><Text style={{
        margin: 10,
        marginTop: 30,
        fontSize: 15,
        fontWeight: '300',
      }}>
          Chưa có dữ liệu về sức khỏe
      </Text></TouchableOpacity>

    let listMealsBreakfast =
      this.props.screenProps.todayMeals[0].length > 0
        ? this.props.screenProps.todayMeals[0].map((item, index) => {
          return (
            <Text key={item.id.toString()} style={{ color: 'black' }}>{item.MonAn}</Text>)
        })
        : <Text style={{ color: 'black' }}>Chưa có món ăn</Text>

    let listMealsLunch =
      this.props.screenProps.todayMeals[1].length > 0
        ? this.props.screenProps.todayMeals[1].map((item, index) => {
          return (
            <Text key={item.id.toString()} style={{ color: 'black' }}>{item.MonAn}</Text>)
        })
        : <Text style={{ color: 'black' }}>Chưa có món ăn</Text>

    let listMealsDinner =
      this.props.screenProps.todayMeals[2].length > 0
        ? this.props.screenProps.todayMeals[2].map((item, index) => {
          return (
            <Text key={item.id.toString()} style={{ color: 'black' }}>{item.MonAn}</Text>)
        })
        : <Text style={{ color: 'black' }}>Chưa có món ăn</Text>

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View style={{ flexDirection: 'row', }}>
            <Avatar
              title={this.props.screenProps.user.thongTinChung.hoTen[0]}
              containerStyle={{ margin: 10, marginLeft: 20 }}
              size={120}
              rounded
              source={{ uri: 'data:image/jpeg;base64,' + this.props.screenProps.user.thongTinChung.avatar }}
            />
            <View style={{ justifyContent: 'center', width: 0, flexGrow: 1, marginRight: 20 }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: "center" }}> {this.props.screenProps.user.thongTinChung.hoTen} </Text>
            </View>
          </View>
          {listChart}
          <View>
            <View style={{ flexDirection: 'row', margin: 10, marginTop: 20, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', }}>
                {/*<Image*/}
                {/*source={require('../images/diet.png')}*/}
                {/*style={styles.chartTitleIcon}*/}
                {/*/>*/}
                <Text style={{ marginHorizontal: 10, fontSize: 20, fontWeight: 'bold' }}>THỰC ĐƠN NGÀY {this.state.dateToday.getDate()} / {this.state.dateToday.getMonth() + 1}</Text>
              </View>
              <TouchableOpacity
                onPress={() => { this.props.navigation.navigate('AddMeal') }
                }
              >
                <Image
                  source={require('../images/plus.png')}
                  style={styles.chartTitleIcon}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('MealDetails')
              }}
            >
              <View style={{ borderRadius: 10, borderColor: '#EFEFEF', margin: 5, borderWidth: 1 }}>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                  <View style={{ width: 90, justifyContent: 'center' }}>
                    <Text style={{ color: 'black' }}>Sáng</Text>
                  </View>
                  <View>
                    {listMealsBreakfast}
                  </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#EFEFEF' }}>
                  <View style={{ width: 90, justifyContent: 'center' }}>
                    <Text style={{ color: 'black' }}>Trưa</Text>
                  </View>
                  <View>
                    {listMealsLunch}
                  </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                  <View style={{ width: 90, justifyContent: 'center' }}>
                    <Text style={{ color: 'black' }}>Tối</Text>
                  </View>
                  <View>
                    {listMealsDinner}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ height: 25 }} />
        </ScrollView>
        {/*<ActionButton buttonColor="rgba(231,76,60,1)" position={'right'}>*/}
        {/*<ActionButton.Item buttonColor='rgba(230, 50, 50, 0.9)' size={50} onPress={() => this.props.navigation.navigate('AddDiabetes')}>*/}
        {/*<Image source={require('../images/Diabetes.png')} style={styles.actionButtonIcon}/>*/}
        {/*</ActionButton.Item>*/}
        {/*<ActionButton.Item buttonColor='rgba(230, 130, 100, 0.9)' size={50} onPress={() => this.props.navigation.navigate('AddBloodPressure')}>*/}
        {/*<Image source={require('../images/BloodPressure.png')} style={styles.actionButtonIcon}/>*/}
        {/*</ActionButton.Item>*/}
        {/*</ActionButton>*/}

      </View>
    );
  }

  ////////////////////// Add these methods //////////////////////

  //Remove listeners allocated in createNotificationListeners()

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      // alert(notification)
      this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
      this.props.navigation.navigate('AddDiabetes')
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;

      switch(notificationOpen.notification.data.loaiThongBao){
        case '1': {
          // message2 += ' muốn theo dõi sức khỏe của bạn'
          if (notificationOpen.notification.data.loaiTaiKhoanLienQuan==='1'){
            this.apiService.getBenhNhanInfo({MaBenhNhan: notificationOpen.notification.data.maTaiKhoanLienQuan})
              .then(async (result) => {
                if (result !== null)
                {
                  // alert(JSON.stringify(result))
                  const data = result[0]

                  const info2 = {
                    MaNguoiGui: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiNguoiGui: 1,
                    MaNguoiNhan: notificationOpen.notification.data.maTaiKhoanLienQuan,
                    LoaiNguoiNhan: 1,
                    updateList: true,
                  }
                  await this.props.screenProps.socket.emit('update relationship', info2);
                  this.props.screenProps.socket.emit('seen notifications', {
                    MaTaiKhoan: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiTaiKhoan: 1,
                  })
                  this.apiService.seenThisNotification({
                    MaTaiKhoan: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiNguoiChinh: 1,
                    Id: parseInt(notificationOpen.notification.data.idNoti)})

                  this.props.navigation.navigate('RelativeProfile', { myID: this.props.screenProps.user.thongTinChung.sdt, data: data })
                }
              })
          }
          else{
            this.apiService.findDoctorByID(notificationOpen.notification.data.maTaiKhoanLienQuan)
              .then(async (result) => {
                if (result !== null)
                {
                  // alert(JSON.stringify(result))
                  const data = result[0]

                  const info2 = {
                    MaNguoiGui: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiNguoiGui: 1,
                    MaNguoiNhan: notificationOpen.notification.data.maTaiKhoanLienQuan,
                    LoaiNguoiNhan: 1,
                    updateList: true,
                  }
                  await this.props.screenProps.socket.emit('update relationship', info2);
                  this.props.screenProps.socket.emit('seen notifications', {
                    MaTaiKhoan: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiTaiKhoan: 1,
                  })
                  this.apiService.seenThisNotification({
                    MaTaiKhoan: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiNguoiChinh: 1,
                    Id: parseInt(notificationOpen.notification.data.idNoti)})

                  this.props.navigation.navigate('DoctorProfile', { myID: this.props.screenProps.user.thongTinChung.sdt, data: data })
                }
              })
          }
          break;
        }
        case '2':  {
          // message2 += ' tin nhắn mới'
          if (notificationOpen.notification.data.loaiTaiKhoanLienQuan==='1'){
            this.apiService.getBenhNhanInfo({MaBenhNhan: notificationOpen.notification.data.maTaiKhoanLienQuan})
              .then(async (result) => {
                if (result !== null)
                {
                  // alert(JSON.stringify(result))
                  const data = result[0]
                  // this.props.navigation.navigate('RelativeProfile', { myID: this.props.screenProps.user.thongTinChung.sdt, data: data })
                  await this.apiService.updateSeeingSeen({
                    MaTaiKhoan: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiTaiKhoan: 1,
                    MaTaiKhoanLienQuan: notificationOpen.notification.data.maTaiKhoanLienQuan,
                    LoaiTaiKhoanLienQuan: 1
                  })

                  // socket list
                  const info2 = {
                    MaNguoiGui: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiNguoiGui: 1,
                    MaNguoiNhan: notificationOpen.notification.data.maTaiKhoanLienQuan,
                    LoaiNguoiNhan: 1,
                    updateList: true,
                  }
                  await this.props.screenProps.socket.emit('update relationship', info2);
                  this.props.screenProps.socket.emit('seen notifications', {
                    MaTaiKhoan: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiTaiKhoan: 1,
                  })
                  this.apiService.seenThisNotification({
                    MaTaiKhoan: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiNguoiChinh: 1,
                    Id: parseInt(notificationOpen.notification.data.idNoti)})
                  // navigate
                  this.props.navigation.navigate('Chat', { myID: this.props.screenProps.user.thongTinChung.sdt, title: data.HoTen, data: data, type: 1 })
                }
              })
          }
          else{
            this.apiService.findDoctorByID(notificationOpen.notification.data.maTaiKhoanLienQuan)
              .then(async (result) => {
                if (result !== null)
                {
                  // alert(JSON.stringify(result))
                  const data = result[0]
                  await this.apiService.updateSeeingSeen({
                    MaTaiKhoan: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiTaiKhoan: 1,
                    MaTaiKhoanLienQuan: notificationOpen.notification.data.maTaiKhoanLienQuan,
                    LoaiTaiKhoanLienQuan: 2
                  })

                  // socket list
                  const info2 = {
                    MaNguoiGui: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiNguoiGui: 1,
                    MaNguoiNhan: notificationOpen.notification.data.maTaiKhoanLienQuan,
                    LoaiNguoiNhan: 2,
                    updateList: true,
                  }
                  await this.props.screenProps.socket.emit('update relationship', info2);
                  this.props.screenProps.socket.emit('seen notifications', {
                    MaTaiKhoan: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiTaiKhoan: 1,
                  })
                  this.apiService.seenThisNotification({
                    MaTaiKhoan: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiNguoiChinh: 1,
                    Id: parseInt(notificationOpen.notification.data.idNoti)})
                  // navigate
                  this.props.navigation.navigate('Chat', { myID: this.props.screenProps.user.thongTinChung.sdt, title: data.HoTen, data: data, type: 2 })
                }
              })
          }
          break;
        }
        case '3': {
          // message2 += ' muốn theo dõi sức khỏe của bạn'
          if (notificationOpen.notification.data.loaiTaiKhoanLienQuan==='1'){
            this.apiService.getBenhNhanInfo({MaBenhNhan: notificationOpen.notification.data.maTaiKhoanLienQuan})
              .then(async (result) => {
                if (result !== null)
                {
                  // alert(JSON.stringify(result))
                  const data = result[0]

                  const info2 = {
                    MaNguoiGui: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiNguoiGui: 1,
                    MaNguoiNhan: notificationOpen.notification.data.maTaiKhoanLienQuan,
                    LoaiNguoiNhan: 1,
                    updateList: true,
                  }
                  await this.props.screenProps.socket.emit('update relationship', info2);
                  this.props.screenProps.socket.emit('seen notifications', {
                    MaTaiKhoan: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiTaiKhoan: 1,
                  })
                  this.apiService.seenThisNotification({
                    MaTaiKhoan: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiNguoiChinh: 1,
                    Id: parseInt(notificationOpen.notification.data.idNoti)})

                  this.props.navigation.navigate('RelativeProfile', { myID: this.props.screenProps.user.thongTinChung.sdt, data: data })
                }
              })
          }
          else{
            this.apiService.findDoctorByID(item.notificationOpen.notification.data.maTaiKhoanLienQuan)
              .then(async (result) => {
                if (result !== null)
                {
                  // alert(JSON.stringify(result))
                  const data = result[0]

                  const info2 = {
                    MaNguoiGui: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiNguoiGui: 1,
                    MaNguoiNhan: notificationOpen.notification.data.maTaiKhoanLienQuan,
                    LoaiNguoiNhan: 1,
                    updateList: true,
                  }
                  await this.props.screenProps.socket.emit('update relationship', info2);
                  this.props.screenProps.socket.emit('seen notifications', {
                    MaTaiKhoan: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiTaiKhoan: 1,
                  })
                  this.apiService.seenThisNotification({
                    MaTaiKhoan: this.props.screenProps.user.thongTinChung.sdt,
                    LoaiNguoiChinh: 1,
                    Id: parseInt(notificationOpen.notification.data.idNoti)})

                  this.props.navigation.navigate('DoctorProfile', { myID: this.props.screenProps.user.thongTinChung.sdt, data: data })
                }
              })
          }
          break;
        }
      }
      // this.showAlert(title, body);
      // alert(JSON.stringify(notificationOpen.notification.data))
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  logo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'tomato',
  },
  content: {
    flex: 8,
    backgroundColor: '#F5FCFF',
  },
  newsList: {
    marginVertical: 15,
    flex: 1,
  },
  news: {
    backgroundColor: '#17BEAE',
    height: Dimensions.get('window').width / 2,
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    borderRadius: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
  normalStatus: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: '#52C41C'
  },
  errorStatus: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: '#FF1400'
  },
  btnMess: {
    // width: Dimensions.get('window').width - 55,
    // height: 45,
    borderRadius: 20,
    // borderWidth: 1.5,
    borderColor: 'rgba(255, 0, 0, 0.7)',
    alignItems: 'center',
    padding: 7,
    backgroundColor: 'rgba(104, 225, 210, 0.8)',//   'rgba(50, 50, 255, 0.9)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 80,
  },
  actionButtonIcon: {
    // fontSize: 20,
    height: 30,
    width: 30,
    // color: 'white',
  },
  chartTitleIcon: {
    height: 30,
    width: 30,
  },
});
