import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

export default class CustomButtonComponent extends Component{
  render(){
    return(
      <View>
        <TouchableHighlight
          underlayColor={"#E8E8E8"}
          onPress={this.props.onPress}
          style={this.props.button_styles}>
          <View>
            <Text style={this.props.button_text_styles}>{this.props.text}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }


}


AppRegistry.registerComponent('CustomButtonComponent', ()=>CustomButtonComponent);
