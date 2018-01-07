import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  TouchableHighlight,
  TextInput,
  ListView,
  Picker
} from 'react-native';

import * as firebase from 'firebase';

export class AddCarComponent extends Component{
  constructor(props){
    super(props);

    this.state = {
      Brand: 'Seat',
      Model: '',
      Color: '',
      LicensePlateNumber: '',
      UsageNumber: '0'
    }
  }

  addCar(){
    var user = firebase.auth().currentUser;
    const {goBack} = this.props.navigation;

    if(user != null){
      if(this.state.Model != '' && this.state.Brand != '' && this.state.Color != '' && this.state.LicensePlateNumber != '' && this.state.UsageNumber != ''){
          var newCarKey = firebase.database().ref('/Cars').push({
            Model: this.state.Model,
            Brand: this.state.Brand,
            Color: this.state.Color,
            LicensePlateNumber: this.state.LicensePlateNumber,
            UsageNumber: Number.parseInt(this.state.UsageNumber),
            Owner: user.uid
          }).key;

          //console.log("11111111");

          firebase.database().ref('/Users/' + user.uid + '/owned_cars' + '/' + newCarKey).set(true);

          //console.log("2222222");

          goBack();

          //console.log("3333333");
      }
    }
  }

  render(){
    return(
      <View style={styles.appContainer}>

        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            Car brand:
          </Text>
        </View>

        <View>
          <Picker selectedValue = {this.state.Brand} onValueChange = {(text) => this.setState({Brand : text})}>
            <Picker.Item label = "Seat" value = "seat" />
            <Picker.Item label = "Fiat" value = "fiat" />
            <Picker.Item label = "BMW" value = "bmw" />
            <Picker.Item label = "Ferrari" value = "ferrari" />
            <Picker.Item label = "Mercedes" value = "mercedes" />
          </Picker>
        </View>


        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            Car model:
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            onChangeText={(text) => this.setState({Model: text})}>

          </TextInput>
        </View>

        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            Car color:
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            onChangeText={(text) => this.setState({Color: text})}>

          </TextInput>
        </View>



        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            Car License Plate Number:
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            onChangeText={(text) => this.setState({LicensePlateNumber: text})}>

          </TextInput>
        </View>

        <TouchableHighlight
          style={styles.button}
          onPress={() => this.addCar()}
        underlayColor='#dddddd'>
          <Text style={styles.btnText}>Add !</Text>
        </TouchableHighlight>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },

  titleView:{
    backgroundColor: '#48afdb',
    //paddingTop: 30,
    //paddingBottom: 10,
    flexDirection: 'row'
  },

  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20
  },

  inputContainer:{
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },

  input:{
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4
  },

  button:{
    height: 36,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center'
  },

  btnText:{
    fontSize: 18,
    color: '#fff',
    marginTop: 6
  }
})
