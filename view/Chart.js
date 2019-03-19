/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { VictoryChart, VictoryLine } from "victory-native";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};

export default class Chart extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <VictoryChart minDomain={{ y: 0,x: 0 }}>
                    <VictoryLine data={[
                        { x: 1, y: 2, label: 2 },
                        { x: 2, y: 3, label: 3 },
                        { x: 3, y: 5.5, label: 5.5},
                        { x: 4, y: 4, label: 4},
                        { x: 5, y: 10, label: 10}
                    ]}/>
                </VictoryChart>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
