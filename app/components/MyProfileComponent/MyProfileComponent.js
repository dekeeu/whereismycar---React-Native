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
  }

  componentDidMount(){
      //console.log('2k18');
      var user = firebase.auth().currentUser;
      //console.log(user);

      if(user != null){
        console.log('Utilizator curent: ' + user.uid);
        this.loadUserData();
      }else{
        console.log('User is null');
        //console.log(this.props);
        //console.log(this.props.navigation);


        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login'})
          ]
        })

        this.props.navigation.dispatch(resetAction)

        /*
        const goLogin = NavigationActions.navigate({
          routeName: 'Login'
        });

        this.props.navigation.dispatch(goLogin);
        */
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
          onPress={() => navigate('ListReports', {})}
          style={styles.button}>
          <Text style={styles.text}>List Reports</Text>
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
        //console.log(user_data);
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
