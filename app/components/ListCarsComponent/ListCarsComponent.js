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
  Alert
} from 'react-native';

import { List, ListItem, FlatList } from 'react-native';
import {CarComponent} from './../CarComponent/CarComponent';

import * as firebase from 'firebase';


import PieChartScreen from './../OtherComponents/PieChartScreen';

export class ListCarsComponent extends Component{

  constructor(props){
    super(props);

    this.cars = [];
    this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});

    this.state = {
      carSource: this.ds.cloneWithRows(this.cars),
      dataIsLoaded: false,
      pieValues: []
    }


    this.editCar = this.editCar.bind(this);
    this.removeCar = this.removeCar.bind(this);
    this.onRefresh = this.onRefresh.bind(this);


    this.firebaseCarsRef = null;
    this.firebaseCarDetailsRef = null;

  }

  componentDidMount(){
    console.log('DidMount');
    var user = firebase.auth().currentUser;

    if(user != null){
      this.firebaseCarDetailsRef = firebase.database().ref('/Cars');

      this.firebaseCarDetailsRef.on('child_added', (dSnapshot) => {

        if(dSnapshot.val().Owner == user.uid){
          var _car = new CarComponent(dSnapshot.key, dSnapshot.val().Brand, dSnapshot.val().Model, dSnapshot.val().Color, dSnapshot.val().LicensePlateNumber,dSnapshot.val().Owner, dSnapshot.val().UsageNumber);

          this.cars.push(_car);

          this.state.pieValues.push({
            value: Number.parseInt(_car.getUsageNumber()),
            label: _car.getBrand() + ' ' + _car.getModel()
          });



          this.setState({
            carSource: this.state.carSource.cloneWithRows(this.cars)
          });



      }

      });

      this.firebaseCarDetailsRef.on('child_changed', (dSnapshot) => {
        console.log('A car was changed !');

        if(dSnapshot.val().Owner == user.uid){

          console.log("Updated car");

          var dS = [];
          dS = this.cars.slice();

          this.setState({
            carSource: this.state.carSource.cloneWithRows(dS)
          });
      }

      });


      this.firebaseCarDetailsRef.on('child_removed', (dataSnapshot) =>{
        console.log('A car was deleted !');

        if(dataSnapshot.val().Owner == user.uid){
          this.cars = this.cars.filter((x) => x.Id !== dataSnapshot.key);
          this.setState({
            carSource: this.state.carSource.cloneWithRows(this.cars)
          });
        }
      });

    }

    console.log('ListCars loaded');
  }

  componentWillMount(){
    console.log('WillMount');
  }

  componentWillUnmount(){
    console.log("PAAAA");
  }

  removeCar(rowData){
    this.firebaseCarDetailsRef.child(rowData.Id).remove();
  }

  editCar(rowData){

    this.firebaseCarDetailsRef.child(rowData.Id).set({
      Brand: rowData.getBrand(),
      Model: rowData.getModel(),
      Color: rowData.getColor(),
      LicensePlateNumber: rowData.getLicensePlateNumber(),
      UsageNumber: rowData.getUsageNumber(),
      Owner: firebase.auth().currentUser.uid
    });

  }

  renderRow(rowData){
    const {navigate} = this.props.navigation;

    return(
      <TouchableOpacity
        style = {{
          height: 60,
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: 'grey',
        }}
        onPress = {() => {
          console.log("PIEVALORI:");
          console.log(this.state.pieValues);
          navigate("EditCar", {
            item: rowData,
            update: this.editCar,
            remove: this.removeCar,
            pieval: this.state.pieValues,
            refresh: this.onRefresh

          });
        }}
      >
        <Text style={{flex: 1, fontSize: 16}}>
          {rowData.getBrand()} {rowData.getModel()}
        </Text>
      </TouchableOpacity>
    )
  }

  onRefresh() {
    console.log('Refresh');
    let cars2 = this.cars.slice();

    this.setState({
      carSource: this.ds.cloneWithRows(cars2)
    })
  }

  render(){

    const {navigate} = this.props.navigation;

    if (this.state.dataIsLoaded) {
            return <View><Text>Loading...</Text></View>;
    }

    return(
      <View>
        <ListView
          dataSource = {this.state.carSource}
          renderRow = {this.renderRow.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.dataIsLoaded}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          enableEmptySections={true}
        ></ListView>

      </View>

    );
  }
}



const styles = StyleSheet.create({

  container: {
    flexDirection: 'column'
  },

  list:{
    marginBottom: 20
  },

  car:{
    flex: 1,
    fontSize: 16
  }

});
