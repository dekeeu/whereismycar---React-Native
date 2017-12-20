
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TextInput
} from 'react-native';

import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import CustomHeaderComponent from '../CustomHeaderComponent/CustomHeaderComponent';

import LoginComponent from '../LoginComponent/LoginComponent';


import { NavigationActions } from 'react-navigation';

import firebase from 'firebase';

export class RegisterComponent extends Component{
  static navigationOptions = {
    tabBarLabel: 'Register',
    tabBarIcon: ({tintColor}) => (
      <Image
        source = {require('../../icons/register.png')}
        style = {[styles.icon, {tintColor: tintColor}]}
          />

        ),
    showIcon: true
    };

  constructor(props){
    super(props);

    this.goToLogin = this.goToLogin.bind(this);

    this.state = {
      loaded: true,
      email: '',
      password: ''
    }

  }

  signup(){
    this.setState({
      loaded: false
    });

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(){
        alert('Account created!');
      }).then(function(){
        this.goToLogin();
      })
      .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        if(errorCode){
          switch(errorCode){
            case "auth/email-already-in-use":
              alert('Email is already in use !');
              break;

            case "auth/invalid-email":
              alert('Invalid e-mail !');
              break;

            case "auth/operation-not-allowed":
              alert('Contact developer !');
              break;

            case "auth/weak-password":
              alert('Password is too weak !');
              break;
          }
        }

      });

      this.setState({
        email: '',
        password: '',
        loaded: true
      });

  }

  goToLogin(){
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login'})
      ]
    })
    this.props.navigation.dispatch(resetAction)

    //this.props.navigation.navigate('Login');

  }

  render(){


    return(
      <View style={styles.container}>

        <View style={styles.body}>
          <TextInput
            style={styles.textinput}
            onChangeText={(value) => this.setState({email: value})}
            value={this.state.email}
            placeholder={"Email"}
          ></TextInput>

          <TextInput
            style={styles.textinput}
            onChangeText={(value)=>this.setState({password: value})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}></TextInput>

          <View style={styles.buttons}>
            <CustomButtonComponent
              text='Signup'
              onPress={this.signup.bind(this)}
              button_styles={styles.primary_button}
              button_text_styles={styles.transparent_button_text}></CustomButtonComponent>

            <CustomButtonComponent
              text='Got an Account ?'
              onPress={this.goToLogin.bind(this)}
              button_styles={styles.primary_button}
              button_text_styles={styles.transparent_button_text}>

            </CustomButtonComponent>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    //justifyContent: 'space-around'
    //borderColor: 'blue',
    //borderWidth: 1
  },

  body: {
    //flex: 1,
    //borderColor: 'red',
    //borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  icon: {
    width: 24,
    height: 24,
  },

  textinput: {
    height: 40,
    width: 190,
    borderColor: 'gray',
    borderWidth: 0.5,
    margin: 10
    //flex: 1
  },

  transparent_button: {
    marginTop: 10,
    padding: 15
  },

  transparent_button_text: {
    color: 'white',
    fontSize: 16
  },

  primary_button: {
    margin: 10,
    padding: 15,
    backgroundColor: '#529ecc',

  },

  primary_button_text: {
    color: 'white',
    fontSize: 18
  },

  buttons:{
    flexDirection: 'row'
  },

  image: {
    width: 100,
    height: 100
  }
});



//AppRegistry.registerComponent('RegisterComponent', () => RegisterComponent);
