import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from "react-native-elements";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';


export class DateTime extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        currDate: '',
        time: '',
        }
    }

    componentWillMount() {
        // Get current dd/MM/yyyy
        var _date = new Date().getDate(),
            _month = new Date().getMonth() + 1,
            _year = new Date().getFullYear();
        var _hr = new Date().getHours(),
            _min = new Date().getMinutes();
        this.setState({
        currDate: _date + '/' + _month + '/' + _year,
        time: _hr + ':' + _min,
        // date: [...this.state.date, ...{_date: currDate, _time: time}],
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
              {this.props.item.content}
            </Text>
          </View>
          <Avatar
                size="medium"
                rounded
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqUifDeYJGapfmg23wf6fEGWG9EHJwYdFRyM-dSTr1PANe6Be9Vg'}}
                activeOpacity={0.7}
              />
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
                source={{ uri: this.props.avatar}}
                activeOpacity={0.7}
                />
            <View style={[styles.BubbleChat, styles.leftBubbleChat]}>             
            <Text style={{paddingTop: 5, color: 'black', fontSize: 17}}>
                {this.props.item.content}
            </Text>
            </View>
            <DateTime />
        </View>
        )
    }
} 
  
export default class ChatScreen extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        textInput: '',
        items: [],
        // date: [],
      };
    }
  
    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('title'),
        headerTitleStyle: {
          fontWeight: 'bold',
          // color: 'white',
        },
        headerStyle: {
          backgroundColor: 'rgba(54, 175, 160, 1)',
        },
        headerTintColor: 'white',
      };
    };
  
  
    AddItemsToArray = () => {
      let mess=[{ content: 'reply: ' + this.state.textInput.toString(), type: 2, key: (this.state.items.length + 1).toString() }]
      mess.push({ content: this.state.textInput.toString(), type: 1 , key: this.state.items.length.toString()});
      
      if (this.state.textInput !== '')
      {
        //Adding Items To Array.
        this.setState({
          items: [...mess, ...this.state.items],
          textInput: '',
          // date: [...this.state.date, ...{ _currday: this.props.currDate, _time: this.props.time }],
        });
      }
    }
  
    _renderItem = (item) => {
      if(item.type===1){
        return(<RightListItems item={item}/>);
      }
      else{
        return(<LeftListItems item={item} avatar={this.props.navigation.state.params.avatar}/>);
      }
    }
  
    render() {
      return (
        <View style={styles.wrapper}>
          <FlatList
              contentContainerStyle={{paddingVertical: 20}}
              data={this.state.items}
              renderItem={({item}) => this._renderItem(item)}
              inverted
          >
          </FlatList> 
          <View style={[{flexDirection: 'row'},styles.customChat]}>
            <TextInput
              placeholder="Nhập tin nhắn..."
              onChangeText={(textInput) => this.setState({textInput})}
              value={this.state.textInput}
              style={[styles.chatBox]}
            />
            <TouchableOpacity 
              onPress={this.AddItemsToArray}
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
  