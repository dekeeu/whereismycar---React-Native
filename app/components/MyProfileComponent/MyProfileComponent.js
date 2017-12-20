import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  AsyncStorage
} from 'react-native';

import {CarComponent} from './../CarComponent/CarComponent';
import {ListCarsComponent} from './../ListCarsComponent/ListCarsComponent';

import { NavigationActions } from 'react-navigation'

import * as firebase from 'firebase';

export class MyProfileComponent extends Component{

  constructor(props){
    super(props);

    this.state = {
      user: null,
      userName: 'undefined',
      userEmail: 'undefinedEmail'
    }

    /*
    this.cars_list = [
      new CarComponent("1", "seat", "ibiza", "blue"),
      new CarComponent("2", "mazda", "cx-7", "red"),
      new CarComponent("3", "bmw", "x6", "white"),
      new CarComponent("4", "fiat", "punto", "blue"),
      new CarComponent("5", "audi", "a7", "black"),
      new CarComponent("6", "bmw", "5series", "orange")
    ]
    */
  }

  componentDidMount(){
      var user = firebase.auth().currentUser;

      if(user != null){
        console.log('Utilizator curent: ' + user.uid);

        /*
        this.setState({
          userEmail: user.email,
          userNmae: user.displayName
        })
        */
        this.loadUserData();
      }else{
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login'})
          ]
        })

        this.props.navigation.dispatch(resetAction)
      }
  }

  render(){
    const {navigate} = this.props.navigation;

    //let _cars_list = this.cars_list;
    //console.log("Log:" + this.cars_list);

    return(<View>
      <View style={styles.container}>
        <Text style={styles.text}>Hi {this.state.userEmail}</Text>


        <TouchableOpacity
          onPress={() => navigate('AddCar')}
          style={styles.button}>

          <Text style={styles.text}>
            Add a new car
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate('ListCars')}
          style={styles.button}>
          <Text style={styles.text}>
            My Cars
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate('Contact', {})}
          style={styles.button}>
          <Text style={styles.text}>Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.logout.bind(this)}
          style={styles.button}>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>

          </View>

    </View>);
  }

  logout(){
    AsyncStorage.removeItem('user_data')
      .then(()=>{
        firebase.auth().signOut()
          .then(()=>{})
          .catch((error)=>{
            console.log(error);
          })
      .catch((error)=>{
        console.log(error);
      });

      });

      this.setState();

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login'})
        ]
      })
      this.props.navigation.dispatch(resetAction)
  }

  loadUserData(){
    AsyncStorage.getItem('user_data')
      .then((user_data_json) => {
        let user_data = JSON.parse(user_data_json);
        console.log(user_data);
        this.setState({
          user: user_data,
          userName: user_data.displayName,
          userEmail: user_data.email
        });

      });
  }
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },

  button: {
    margin: 10,
    padding: 15,
    backgroundColor: '#529ecc',

  },

  text: {
    color: 'black',
    fontSize: 18
  }
});
