/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';



import {ListCarsComponent} from './app/components/ListCarsComponent/ListCarsComponent';
import {EditCarComponent} from './app/components/EditCarComponent/EditCarComponent';
import {AddCarComponent} from './app/components/AddCarComponent/AddCarComponent';

import {SendEmailComponent} from './app/components/SendEmailComponent/SendEmailComponent';

import {MyProfileComponent} from './app/components/MyProfileComponent/MyProfileComponent';
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from 'react-navigation';
import { DrawerNavigator } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';


import {LoginComponent} from './app/components/LoginComponent/LoginComponent';

import {RegisterComponent} from './app/components/RegisterComponent/RegisterComponent';

import {ListReportsComponent} from './app/components/ListReportsComponent/ListReportsComponent';

import {AddReportComponent} from './app/components/AddReportComponent/AddReportComponent';

import * as firebase from 'firebase';



const firebaseConfig = {
  apiKey: "AIzaSyD6P_NBUnJQady5g6QVOYaI6fFTPocxmpw",
  authDomain: "where-is-my-car-app.firebaseapp.com",
  databaseURL: "https://where-is-my-car-app.firebaseio.com",
  storageBucket: "where-is-my-car-app.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

import SyncAdapter from 'react-native-sync-adapter';
import testTask from './app/tasks/TestTask';

const syncInterval = 60; // 1 minute
const syncFlexTime = 15; // 15 seconds

const StackNavigatorApp = StackNavigator({

  MyProfile: {
    screen: MyProfileComponent,
    navigationOptions:{
      headerTitle: 'My Profile',
      tabBarLabel: 'My Profile'
    }
  },

  ListReports:{
    screen: ListReportsComponent,
    navigationOptions:{
      headerTitle: 'List Reports',
      tabBarLabel: 'List Reports'
    }
  },

  Contact:{
    screen: SendEmailComponent,
    navigationOptions:{
      headerTitle: 'Send email',
      tabBarLabel: 'Send email'
    }
  },

  AddCar: {
    screen: AddCarComponent,
    navigationOptions:{
      headerTitle: 'Add a Car',
      tabBarLabel: 'Add a Car'
    }
  },

  ListCars: {
    screen: ListCarsComponent,
    navigationOptions:{
      headerTitle: 'List of Cars',
      tabBarLabel: 'List of Cars'
    }
  },

  EditCar:{
    screen: EditCarComponent,
    navigationOptions:{
      headerTitle: 'Edit Car',
      tabBarLabel: 'Edit Car'
    }
  },

  Login:{
    screen: LoginComponent,
    navigationOptions:{
      headerTitle: 'Login',
      tabBarLabel: 'Login'
    }
  },

  Register:{
    screen: RegisterComponent,
    navigationOptions:{
      headerTitle: 'Register',
      tabBarLabel: 'Register'
    }
  },

  AddReport: {
    screen: AddReportComponent,
    navigationOptions:{
      headerTitle: 'Add a Report',
      tabBarLabel: 'Add a Report'
    }
  },


});

/*

const DrawerNavigatorApp = DrawerNavigator({
  Home: {
    screen: StackNavigatorApp
  }
});

*/


export default class whereismycar extends Component{
  componentDidMount(){
    SyncAdapter.init({
      syncInterval,
      syncFlexTime,
    });
  }

  render(){
    return <StackNavigatorApp/>
  }

}

AppRegistry.registerComponent('whereismycar', () => whereismycar);
//AppRegistry.registerHeadlessTask('TASK_SYNC_ADAPTER', () => TestTask);
