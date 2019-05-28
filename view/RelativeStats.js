import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View,
     ScrollView, Alert, AsyncStorage, RefreshControl,
    TouchableOpacity, Dimensions, Image } from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import ApiService from "../services/api";

export default class RelativeStats extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
          myID: '',
          relativeID: this.props.navigation.getParam('data').MaBenhNhan,
          refreshing: false,
          data: [],
          haveData: false,
          todayMeals: [
            [],
            [],
            [],
          ]
      };

      this.apiService = ApiService()
    }
  
    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('data').HoTen,
        headerTitleStyle: {
          fontWeight: 'bold',
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
      })
      this.loadItems();
    }

    async loadItems(){
    const userId = this.state.relativeID;
    await this.setState({
      data: []
    })
    for (let i = 0; i < 2; i++) {
        await this.loadDataItem(userId, i)
    }
    this.apiService.getTodayMeal({MaBenhNhan: userId})
        .then((result) => {
        let dataTemp = [
            [],
            [],
            [],
        ]

        if (result!==null){
            for (let i = 0; i < result.meals.length; i++){
            let temp = result.meals[i]
            dataTemp[temp.Buoi - 1].push({
                MonAn: temp.MonAn,
                id: temp.Id,
            })
            }

            this.setState({
                todayMeals: dataTemp,
            })
            // this.props.screenProps.setTodayMeals(dataTemp)
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
                    data: [ ],
                    color: (opacity = 0.7) => `rgba(255, 0, 0, ${opacity})`,
                    strokeWidth: 2
                },
                {
                    data: [ ],
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
            lowDomain:  i + 1 === 1
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
        dataT.push(valueData);
        
        await this.setState(
            {
              data: [...this.state.data,...dataT],
            }
          );
        // await this.props.screenProps.setData([...this.props.screenProps.data,...dataT])

        this.setState({
          haveData: true
        })
        // this.props.screenProps.setHaveData(true)
        // }
    })
    }

    handleRefresh = () => {
      this.setState({
        refreshing: true
      }, async () => {
        const userId = this.state.relativeID;
        this.loadItems()
        .then( () => {
            this.setState({
                refreshing: false,
              })
        })
        // this.apiFollow.checkMyRelationship(userId, this.state.profile.MaBenhNhan)
        // .then((result) => {
        //   if(result!==null){
        //     this.setState({
        //       typeRelationship: result,
        //       refreshing: false
        //     })
        //   }
        // });
      })
    }

    render() {
      let listChart = this.state.haveData//this.state.haveData
      ?this.state.data.map(item => {
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
        return (
            <View key={item.type}>
              <View style={{flexDirection: 'row', margin: 10, marginTop: 20, justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', }}>
                  <Image
                    source={item.type==='ĐƯỜNG HUYẾT (mmol/L)'
                      ? require('../images/Diabetes.png')
                      : require('../images/BloodPressure.png')}
                    style={styles.chartTitleIcon}
                  />
                  <Text style={{marginHorizontal: 10, fontSize: 20, fontWeight: 'bold'}}>{item.type}</Text>
                </View>
              </View>
  
              <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('StatsDetailRelative', {item: item, name: this.props.navigation.getParam('data').HoTen})
                    }}
              >
                <LineChart
                  data={item.data}
                  width={screenWidth+1}
                  height={220}
                  chartConfig={chartConfig}
                  onDataPointClick={(item) => {Alert.alert(
                    highDomain!==0
                    ? item.value >= highDomain
                      ? 'Giá trị chỉ số là ' + item.value.toString() + ' ' + unit + ', ở ngưỡng cao'
                      : item.value <= lowDomain
                        ? 'Giá trị chỉ số là ' + item.value.toString() + ' ' + unit + ', ở ngưỡng thấp'
                        : 'Giá trị chỉ số là ' + item.value.toString() + ' ' + unit + ', ở mức bình thường'
                    : 'Giá trị chỉ số là ' + item.value.toString() + ' ' + unit + ''
                  )}}
                  withShadow={false}
                  bezier
                />
              </TouchableOpacity>
              <View style={{marginLeft: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
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
    this.state.todayMeals[0].length > 0
      ? this.state.todayMeals[0].map((item, index) => {
        return(
      <Text key={item.id.toString()} style={{ color: 'black' }}>{item.MonAn}</Text>)
    })
      : <Text style={{ color: 'black' }}>Chưa có món ăn</Text>

  let listMealsLunch =
  this.state.todayMeals[1].length > 0
      ? this.state.todayMeals[1].map((item, index) => {
        return(
          <Text key={item.id.toString()} style={{ color: 'black' }}>{item.MonAn}</Text>)
      })
      : <Text style={{ color: 'black' }}>Chưa có món ăn</Text>

  let listMealsDinner =
  this.state.todayMeals[2].length > 0
      ? this.state.todayMeals[2].map((item, index) => {
        return(
          <Text key={item.id.toString()} style={{ color: 'black' }}>{item.MonAn}</Text>)
      })
      : <Text style={{ color: 'black' }}>Chưa có món ăn</Text>

      return (
        <View style={styles.wrapper}>
            <ScrollView
            style={styles.content}
            refreshControl={
                <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
                />
            }
            >
            {listChart}
            <View>
            <View style={{flexDirection: 'row', margin: 10, marginTop: 20, justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row',}}>
                <Image
                  source={require('../images/diet.png')}
                  style={styles.chartTitleIcon}
                />
                <Text style={{marginHorizontal: 10, fontSize: 20, fontWeight: 'bold'}}>THỰC ĐƠN CỦA HÔM NAY</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                //   alert(this.state.relativeID)
                this.props.navigation.navigate('MealDetailRelative', { userId: this.state.relativeID, name: this.props.navigation.getParam('data').HoTen})
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
          </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    wrapper: {
      justifyContent: 'flex-start',
      backgroundColor: '#F5FCFF',
      flex: 1,
    },
    titleBorderBottom: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        marginHorizontal: 30,
        alignItems: 'center'
    },
  
    // Custom Card
    removeCardBorder: {
      borderColor: 'transparent',
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: .0,
      shadowRadius: 0,
      elevation: 0
    },
  
    customText: {
      fontSize: 20,
      color: 'black',
    },
  
    customTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15
    },
    customTextTitle: {
      marginLeft: 15,
      fontWeight: 'bold',
      color: 'gray'
    },
  
    // Custom buttons
    customBtns: {
      flexDirection: 'column',
    },
    customBtnText: {
      fontFamily: 'Arial',
      fontSize: 16,
      color: '#007AFF',
      fontWeight: 'bold',
      paddingHorizontal: 5
    },
    chartTitleIcon: {
      height: 30,
      width: 30,
    },
  });