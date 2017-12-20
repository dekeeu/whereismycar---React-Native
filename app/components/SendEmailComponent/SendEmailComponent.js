import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';

import { Platform, NativeModules } from 'react-native';

export class SendEmailComponent extends Component{
  componentDidMount(){

  }

  constructor(){
    super();

    this.MyUtils = require('./../MyUtilsComponent/MyUtilsComponent');

    this.state = {
      email: '',
      subject: '',
      body: ''
    }
  }

  handleEmailChange(value){
    console.log('Change email: ' + value);
    this.setState({
      email: value
    })
  }

  handleSubjectChange(value){
    console.log('Change subject: ' + value);
    this.setState({
      subject: value
    })
  }

  handleBodyChange(value){
    console.log('Change body: ' + value);
    this.setState({
      body: value
    })
  }

  sendEmail(){
    console.log(this.state.email + ' ' + this.state.subject + ' ' + this.state.body);

    if(this.state.email != '' && this.state.subject != '' && this.state.body != ''){
      this.MyUtils.sendEmail(this.state.email, this.state.subject, this.state.body);
    }

  }

  render(){
    return(
      <View>
        <View style={styles.header}>
          <Text>Contact form</Text>
        </View>


        <View style={styles.container}>
          <View style={styles.emailInput}>
            <Text>Email:</Text>
            <TextInput value={this.state.email} keyboardType='email-address' onChangeText={(value)=>this.handleEmailChange(value)} placeholder='example@example.com'></TextInput>
          </View>

          <View style={styles.emailSubject}>
            <Text>Subject:</Text>
            <TextInput placeholder='subject' onChangeText={(value)=>this.handleSubjectChange(value)}></TextInput>
          </View>


          <View style={styles.emailBody}>
            <Text>Body:</Text>
            <TextInput placeholder='Body' onChangeText={(value)=>this.handleBodyChange(value)} ></TextInput>
          </View>

          <View style={styles.sendBtn}>
            <Button onPress={this.sendEmail.bind(this)} title="Send Email"></Button>
          </View>
        </View>
      </View>
        );
  }
}

const styles = StyleSheet.create({
header:{
  //borderWidth: 0.5,
  //backgroundColor: 'red',
  height: 25,
  //flex: 3,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start'
},

break:{
  height: 10
},

container:{
  height: 300,
  flexDirection: 'column'
},

emailInput:{
  flex: 1
},

emailSubject:{
  flex: 1
},

emailBody:{
  flex: 1
},

sendBtn:{
  flex: 1
}


});
