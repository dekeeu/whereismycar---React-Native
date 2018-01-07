import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
  Image
} from 'react-native';

import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import CustomHeaderComponent from '../CustomHeaderComponent/CustomHeaderComponent';

import RegisterComponent from '../RegisterComponent/RegisterComponent';
import MyProfileComponent from '../MyProfileComponent/MyProfileComponent';

import * as firebase from 'firebase';

import { NavigationActions } from 'react-navigation';

//import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk'


export class LoginComponent extends Component{

  componentWillMount(){
    console.log('Login Mount!');
  }

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }

/*
  _fbAuth(){
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function(result){
        if(result.isCancelled){
          alert('Login cancelled');
        }else{
          AccessToken.getCurrentAccessToken().then((accessTokenData) => {
            const credential = firebase.auth().FacebookAuthProvider.credential(accessTokenData.accessToken);
            firebase.auth().signInWithCredential(credential).then((result)=>{

            }, (error)=>{
              console.log(error);
            })
          }, (error =>{
            console.log('Some error occured ' + error);
          }))
        }
      },
      function(error){
        alert('Login fail with error: ' + error);
      }
    )
  }
*/

  login(){
    this.setState({
      loaded: false
    });

    //console.log('----->Login action')

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(user){
        //console.log('--->SignedIn');

        AsyncStorage.setItem('user_data', JSON.stringify(user));
        //AsyncStorage.setItem('user_data', JSON.stringify(userData));

        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'MyProfile'})
          ]
        });

        this.props.navigation.dispatch(resetAction);

      }.bind(this))
      .catch(function(error){
        console.log('Error');
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;

        if(errorCode){
          switch(errorCode){
            case "auth/invalid-email":
              alert('Invalid email !');
              break;

            case "auth/user-disabled":
              alert('Your account has been disabled !');
              break;

            case "auth/user-not-found":
              alert('User not found !');
              break;

            case "auth/wrong-password":
              alert('Incorrect password !');
              break;
          }
        }
      })

  }

  goToSignup(){
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Register'})
      ]
    })
    this.props.navigation.dispatch(resetAction)

    //this.props.navigation.navigate('Register');
  }

  loginWithFacebook(){

  }

  render(){
    return(
      <View style={styles.container}>

        <View style={styles.body}>
          <TextInput
            style={styles.textinput}
            onChangeText={(value)=>this.setState({email: value})}
            placeholder={"Email Address"}></TextInput>

          <TextInput
            style={styles.textinput}
            onChangeText={(value)=>this.setState({password: value})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          ></TextInput>

          <View style={styles.buttons}>
            <CustomButtonComponent
              text='Login'
              onPress={this.login.bind(this)}
              button_styles={styles.primary_button}
              button_text_styles={styles.primary_button_text}
            ></CustomButtonComponent>

            <CustomButtonComponent
              text='New Here ?'
              onPress={this.goToSignup.bind(this)}
              button_styles={styles.primary_button}
              button_text_styles={styles.primary_button_text}></CustomButtonComponent>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
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

  buttons:{
    flexDirection: 'row'
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
    color: '#0485A9',
    fontSize: 16
  },

  primary_button: {
    margin: 10,
    padding: 15,
    backgroundColor: '#529ecc'
  },

  primary_button_text: {
    color: '#FFF',
    fontSize: 18
  },

  image: {
    width: 100,
    height: 100
  }
});




AppRegistry.registerComponent('LoginComponent', () => LoginComponent);
