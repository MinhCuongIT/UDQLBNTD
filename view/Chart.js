/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Image, Platform, StyleSheet,
    Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {VictoryChart, VictoryLine, VictoryLabel, VictoryTheme, VictoryAxis} from "victory-native";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};

export default class Chart extends Component {
    handleThongSo = () => {

    };

    handleBuaAn = () => {

    };

    render() {
        return (
          <ScrollView>
            <View style={styles.container}>
                {/*Header*/}
                <View style={styles.logo}>
                    <Image
                      style={{flex:3, height:50}}
                      source={require('../images/logoDemo.png')}
                      resizeMode={'center'}
                    />
                    <Text style={{flex:7, fontSize: 45, padding:10}}>Tên app</Text>
                </View>

                {/*Body*/}
                <View style={styles.content}>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                          style={styles.button1}
                          onPress={this.handleThongSo}
                        >
                            <Text style={{fontSize:25, textAlign: 'center'}}> Nhập thông số sức khỏe </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.button1}
                          onPress={this.handleBuaAn}
                        >
                            <Text style={{fontSize:25, textAlign: 'center'}}> Nhập thông tin bữa ăn </Text>
                        </TouchableOpacity>
                    </View>

                    <View pointerEvents="none" style={{margin: 10}}>
                    <VictoryChart domainPadding={{ y: 50,x: 20 }} theme={VictoryTheme.material}>
                        <VictoryLine data={[
                            { x: 'T2', y: 7.2},
                            { x: 'T3', y: 7.5},
                            { x: 'T4', y: 6.5},
                            { x: 'T5', y: 7},
                            { x: 'T6', y: 8},
                            { x: 'T7', y: 6.3},
                            { x: 'CN', y: 6.2},
                        ]}
                         style={{
                             data: {opacity: 0.5},
                             parent: {border: "1px dotted #001"}
                         }}
                          // labels={(d) => `${d.y}`}
                          // labelComponent={<VictoryLabel dy={-5} dx={5}/>}
                        />
                        <VictoryAxis dependentAxis
                          label="mmol//L"
                          style={{
                              axisLabel: { padding: 35 }
                          }}
                        />
                        <VictoryAxis
                             label="THỐNG KÊ 7 NGÀY GẦN NHẤT"
                             style={{
                                 axisLabel: {padding: 35, fontSize:15 }
                             }}
                        />
                    </VictoryChart>
                    </View>
                    <View style={{margin: 30}}>
                        <Text style={{fontSize:30, textDecorationLine:'underline', fontWeight: 'bold'}}>Thông tin sức khỏe</Text>
                        <Text style={{fontSize:17, margin:5}}>Lượng đường trong máu trung bình: </Text>
                        <Text style={{fontSize:17, margin:5}}>Lượng đường trong máu cao nhất: </Text>
                        <Text style={{fontSize:17, margin:5}}>Lượng đường trong máu thấp nhất: </Text>
                        <Text style={{fontSize:17, margin:5}}>Chiều cao: </Text>
                        <Text style={{fontSize:17, margin:5}}>Cân nặng: </Text>
                        <TouchableOpacity
                          style={styles.button2}
                          onPress={this.handleBuaAn}
                        >
                            <Text style={{fontSize:20, textAlign: 'center'}}> Xem lại lịch sử các thông số </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
          </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
    },
    containerT: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
    buttons:{
        flexDirection: 'row',
    },
    button1:{
        borderRadius: 60,
        backgroundColor: 'lightsalmon',
        margin: 20,
        padding: 15,
        flex:1,
        borderWidth: 2,
        borderColor: 'orangered'
    },
    button2:{
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'lightsalmon',
        margin: 10,
        padding: 15,
        flex:1,
        borderWidth: 2,
        borderColor: 'orangered'
    }
});
