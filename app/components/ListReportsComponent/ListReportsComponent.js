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
import {ReportComponent} from './../ReportComponent/ReportComponent';


import * as firebase from 'firebase';

export class ListReportsComponent extends Component{

  constructor(props){
    super(props);

    this.reports = []; // 1
    this.reportsDataSource = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 !== r2
    }); //2

    this.state = {
      reportsSource: this.reportsDataSource.cloneWithRows(this.reports),
      dataIsLoaded: false,
      userIsAdmin: false
    };

    this.firebaseReportsRef = null;
    this.firebaseReportDetailsRef = null;

    this.firebaseUsersRef = null;

    this.userIsAdmin = false;

    this.syncListView = this.syncListView.bind(this);
    this.checkAdminState = this.checkAdminState.bind(this);

  }

  syncListView(){
    this.firebaseReportsRef = firebase.database().ref('/Reports');
    var user = firebase.auth().currentUser;


    this.firebaseReportsRef.on('child_added', (newReport)=>{
      console.log('REPORT ADDED');


      if(this.userIsAdmin){
        console.log('Case1');
        var PickedCars = [];

        var _report = new ReportComponent(
          newReport.key,
          newReport.val().Picture,
          newReport.val().StreetName,
          newReport.val().StreetNo && newReport.val().Status == 'pending' ? newReport.val().StreetNo + ' - PENDING' : newReport.val().StreetNo,
          //newReport.val().PickedCars,
          [],
          newReport.val().Author,
          newReport.val().Status,
          newReport.val().Date
        );

        this.reports.push(_report);


        this.setState({
          reportsSource: this.state.reportsSource.cloneWithRows(this.reports)
        });


      }
      else if(
        (newReport.val().Status == 'approved' && !this.userIsAdmin) ||
        (newReport.val().Status == 'pending' && newReport.val().Author == user.uid)
      ){
          console.log('Case2');

          var _report = new ReportComponent(
            //newReport.val().Id,
            newReport.key,
            newReport.val().Picture,
            newReport.val().StreetName,
            newReport.val().StreetNo && newReport.val().Status == 'pending' ? newReport.val().StreetNo + ' - PENDING' : newReport.val().StreetNo,
            newReport.val().PickedCars,
            newReport.val().Author,
            newReport.val().Status,
            newReport.val().Date
          );

          this.reports.push(_report);


          this.setState({
            reportsSource: this.state.reportsSource.cloneWithRows(this.reports)
          });



      }else{
        console.log('Case3 - do not show');
      }
    });

    this.firebaseReportsRef.on('child_changed', (updatedReport) =>{
      //console.log(this.reports);
      //console.log(this.reports);

      var _updatedReport = updatedReport.val();
      var auxRep = new ReportComponent(
        updatedReport.key,
        _updatedReport.Picture,
        _updatedReport.StreetName,
        _updatedReport.StreetNo && updatedReport.Status == 'pending' ? updatedReport.StreetNo + ' - PENDING' : updatedReport.StreetNo,
        _updatedReport.PickedCars,
        _updatedReport.Author,
        _updatedReport.Status,
        _updatedReport.Date,
      );

      this.goAndUpdate(auxRep);

      var auxReportsSource = [];
      auxReportsSource = this.reports.slice();

      this.setState({
        reportsSource: this.state.reportsSource.cloneWithRows(auxReportsSource)
      });

      this.onRefresh();



    });
    this.firebaseReportsRef.on('child_removed', (removedReport)=>{
      console.log('REPORT DELETED');

      console.log(removedReport.key);
      console.log(this.reports[0].Id);

      this.reports = this.reports.filter((x) => x.Id !== removedReport.key);


      this.setState({
        reportsSource: this.state.reportsSource.cloneWithRows(this.reports)
      });
    });
  }

  goAndUpdate(_updatedReport){
    this.reports.forEach(function(rep){
      if(rep.getID() == _updatedReport.getID()){
        console.log('found and replaced');
        rep.setPicture(_updatedReport.getPicture());
        rep.setStreetName(_updatedReport.getStreetName());
        rep.setStreetNo(_updatedReport.getStreetNo());
        rep.setPickedCars(_updatedReport.getPickedCars());
        rep.setAuthor(_updatedReport.getAuthor());
        rep.setStatus(_updatedReport.getStatus());
        rep.setDate(_updatedReport.getDate());
      }
    });
  }

  checkAdminState(){
    var user = firebase.auth().currentUser;
    if(user != null){
      this.firebaseUsersRef = firebase.database().ref('Users');
      this.firebaseUsersRef.child(user.uid).once('value', function(snapshot){
        this.userIsAdmin = snapshot.val().userIsAdmin;
        this.syncListView();
      }.bind(this));
      /*
      this.firebaseUsersRef.child(user.uid).once('value').then(function(snapshot){
        console.log('------>BLA');
        console.log(snapshot.val().userIsAdmin);
        this.userIsAdmin = snapshot.val().userIsAdmin;
      });
      */

    }
  }

  componentDidMount(){
    //console.log('DidMount');

    this.checkAdminState();
  }

  manageReport(_report){
    //console.log(_report);


    if(this.userIsAdmin){
      if(_report.getStatus() == 'pending'){
        this.firebaseReportsRef.child(_report.getID()).child('Status').set('approved');
        this.onRefresh();
      }
    }else{
      console.log('User is not admin');
    }

  }

  onRefresh() {
    console.log('Refresh in Reports');
    let reports2 = this.reports.slice();

    //console.log(reports2);

    this.setState({
      reportsSource: this.reportsDataSource.cloneWithRows(reports2)
    });
  }

  componentWillMount(){
    //console.log('ListReports Will Mount');
  }

  componentWillUnmount(){
    //console.log("ListReports Will Un Mount");
  }

  renderRow(rowData){
    const {navigate} = this.props.navigation;

    return(
      <TouchableOpacity
        style = {{
          height: 60,
          //borderRadius: 4,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 0.5,
          borderColor: 'grey',
        }}
        onPress = {() => {this.manageReport(rowData)}}
      >
        <Text style={styles.rowText}>
          {rowData.getStreetName()} {rowData.getStreetNo()}
        </Text>

      </TouchableOpacity>
    )
  }

  onRefresh() {
    let newReports = this.reports.slice();

    this.setState({
      reportsSource: this.reportsDataSource.cloneWithRows(newReports)
    });
  }

  addReport(){
    const {navigate} = this.props.navigation;

    navigate("AddReport", {});

  }

  render(){

    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight style={styles.addBtn} onPress={() => this.addReport()}>
            <Text style={styles.addBtnText}>
              Add your own report
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.body}>
          <ListView
            dataSource = {this.state.reportsSource}
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



      </View>

        );
  }

}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column'
  },

  header:{

  },

  body:{

  },

  addBtn:{
    borderWidth: 1,
    padding: 15,
    borderColor: 'black',
    alignItems: 'center',
    backgroundColor: '#4169E1',

  },

  addBtnText:{
    fontSize: 25,
    fontWeight: 'bold'
  },

  rowText:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }

});
