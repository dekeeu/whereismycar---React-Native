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


import {LoginComponent} from './app/components/LoginComponent/LoginComponent';

import {RegisterComponent} from './app/components/RegisterComponent/RegisterComponent';

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
    tabBarLabel: 'My Profile',
    headerTitle: 'My Profile'
  },

  Contact:{
    screen: SendEmailComponent,
    tabBarLabel: 'Send email',
    headerTitle: 'Send email'
  },

  AddCar: {
    screen: AddCarComponent,
    tabBarLabel: 'Add a Car',
    headerTitle: 'Add a Car'
  },

  ListCars: {
    screen: ListCarsComponent,
    tabBarLabel: 'List of Cars',
    headerTitle: 'List of Cars'
  },

  EditCar:{
    screen: EditCarComponent,
    tabBarLabel: 'Edit Car',
    headerTitle: 'Edit Car'
  },

  Login:{
    screen: LoginComponent,
    tabBarLabel: 'Login',
    headerTitle: 'Login'
  },

  Register:{
    screen: RegisterComponent,
    tabBarLabel: 'Register',
    headerTitle: 'Register'
  }


})

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
AppRegistry.registerHeadlessTask('TASK_SYNC_ADAPTER', () => TestTask);
