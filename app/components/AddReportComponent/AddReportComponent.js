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
  Picker,
  Image,
  ScrollView
} from 'react-native';

import { CheckBox } from 'react-native-elements'

import * as firebase from 'firebase';


import RNFetchBlob from 'react-native-fetch-blob';
import CameraRollPicker from 'react-native-camera-roll-picker';

import Modal from 'react-native-modal';

class CarEntry{
  constructor(licensePlate){
    this.LicensePlate = licensePlate;
  }
}

export class AddReportComponent extends Component{
  constructor(props){
    super(props);

    this.imageText = 'Click to Select an image:';
    this.pickedCars = [];
    this.pickedCarsDataSource = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 !== r2
    });


    this.state = {
      Picture: '',
      StreetName: '',
      StreetNo: '',
      PickedCars: [],
      Author: '',
      Status: '',
      Date: '',
      isModalVisible: false,
      isCarsModalVisible: false,
      imageIsUpdated: false,
      updatedImage: '',
      imageText: 'Click to Select an image:',
      carsSource: this.pickedCarsDataSource.cloneWithRows(this.pickedCars),
      selectedCar: '',
      dataIsLoaded: false
    };

    this.firebaseReportsRef = null;
    this.firebaseReportDetailsRef = null;
    this.firebaseUsersRef = null;
  }

  toggleCarModal(){
    this.setState({
      isCarsModalVisible: !this.state.isCarsModalVisible
    });
  }

  pickCar(){
    //console.log('Picked car: ' + this.state.selectedCar);

    this.toggleCarModal();
    let _car = new CarEntry(this.state.selectedCar);
    this.pickedCars.push(_car);
    let newCars = this.pickedCars.slice();

    this.setState({
      carsSource: this.pickedCarsDataSource.cloneWithRows(newCars)
    });

    //console.log(this.pickedCars);
  }

  toggleModal(){
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
  }

  deleteRow(rowData){
    //console.log('called delete');
    this.pickedCars = this.pickedCars.filter((x) => x.LicensePlate !== rowData.LicensePlate);

    let clone = this.pickedCars.slice();
    this.setState({
      carsSource: this.pickedCarsDataSource.cloneWithRows(clone)
    });

    this.setState({
      carsSource: this.pickedCarsDataSource.cloneWithRows(this.pickedCars)
    });
  }

  componentWillMount(){
    this.setState({
      carsSource: this.pickedCarsDataSource.cloneWithRows(this.pickedCars)
    });
  }

  renderRow(rowData){
    return(
      <CheckBox
        center
        title={rowData.LicensePlate}
        iconRight
        iconType='material'
        checkedIcon='remove'
        uncheckedIcon='remove'
        checkedColor='red'
        onPress={() => this.deleteRow(rowData)}
      />
    )
  }

  onRefresh() {
    let newPickedCars = this.pickedCars.slice();

    this.setState({
      carsSource: this.pickedCarsDataSource.cloneWithRows(newPickedCars)
    });
  }

  getSelectedImages = (selectedImages, currentImage) => {
    this.toggleModal();

    const image = currentImage.uri

    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob


    let uploadBlob = null
    const imageRef = firebase.storage().ref('Reports').child('' + Date.now());
    let mime = 'image/jpg'
    fs.readFile(image, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
    })
    .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        // URL of the image uploaded on Firebase storage
        console.log(url);
        this.setState({
          Picture: url,
          updatedImage: url,
          imageIsUpdated: true
        });

      })
      .catch((error) => {
        console.log(error);

      })

  }

  addReport(){
    //console.log(this.state.Picture, this.state.StreetName, this.state.StreetNo);
    //console.log(this.state.PickedCars);

    const {goBack} = this.props.navigation;
    var user = firebase.auth().currentUser;
    this.firebaseReportsRef = firebase.database().ref('/Reports');

    if(user != null){
      if(this.state.Picture != '' && this.state.StreetName != '' && this.state.StreetNo != '' && this.state.PickedCars != []){
        var author = user.uid;
        var status = 'pending';
        var date = Date.now();

        //console.log(this.state.PickedCars);

        var newReportKey = this.firebaseReportsRef.push({
          Picture: this.state.Picture,
          StreetName: this.state.StreetName,
          StreetNo: this.state.StreetNo,
          //PickedCars: this.state.PickedCars,
          Author: author,
          Status: status,
          Date: date
        }).key;

        //console.log(this.state.PickedCars);


      //console.log('LUNGIME:'+this.pickedCars.length);

        for(i=0; i<this.pickedCars.length; i++){
          firebase.database().ref('/Reports/' + newReportKey + '/PickedCars').push(this.pickedCars[i]);
        }





        firebase.database().ref('/Users/' + user.uid + '/reports/' + newReportKey).set(true);
        goBack();
      }
    }

  }

  render(){
    return(
      <ScrollView style={styles.appContainer}>

        <View style={styles.imageFieldContainer}>

          <View style={styles.titleView}>

            <Text style={styles.titleText} onPress={() => this.toggleModal()}>
              {this.state.imageText}
            </Text>

          </View>

          <View style={styles.contentView}>

            {
              this.state.imageIsUpdated &&
              <Image
                style={styles.updatedImage}
                source={{uri: this.state.updatedImage}}></Image>

            }


            <Modal style={styles.modalDialog} isVisible={this.state.isModalVisible}>
              <View style={styles.cameraPicker}>
                <CameraRollPicker selected={[]} maximum={1} callback={this.getSelectedImages} />
              </View>
            </Modal>
          </View>
        </View>

        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            Street Name:
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            onChangeText={(text) => this.setState({StreetName: text})}>

          </TextInput>
        </View>

        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            Street Number:
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            keyboardType='numeric'
            onChangeText={(text) => this.setState({StreetNo: text})}>

          </TextInput>
        </View>

        <View style={styles.titleView}>

          <Text
            onPress={()=>this.toggleCarModal()}
            style={styles.titleText}>
            Pick a Car:
          </Text>
        </View>

        <View style={styles.inputContainer}>


          <View style={styles.plates}>
            <ListView
              dataSource = {this.state.carsSource}
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

          <Modal style={styles.modalDialog} isVisible={this.state.isCarsModalVisible}>

            <View style={styles.carsModalContent}>
              <Text style={styles.carsModalText}>Add the License Plate of the car:</Text>


              <TextInput style={styles.carsModalInput}
                onChangeText={(licensePlateNumber) => this.setState({selectedCar: licensePlateNumber})}></TextInput>

              <TouchableHighlight
                style={styles.button}
                onPress={() => this.pickCar()}
              underlayColor='#dddddd'>
                <Text style={styles.btnText}>Add car</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.button}
                onPress={() => this.toggleCarModal()}
              underlayColor='#dddddd'>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableHighlight>

            </View>
          </Modal>
        </View>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {this.addReport()}}
        underlayColor='#dddddd'>
          <Text style={styles.btnText}>Add report</Text>
        </TouchableHighlight>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  appContainer:{ // 1
    flex: 1
  },

  imageFieldContainer:{ // 2
    flexDirection: 'column',
  },

  titleView:{ // 3
    backgroundColor: '#48afdb',
    flexDirection: 'row'
  },

  contentView:{ // 3
    justifyContent: 'center',
    flexDirection: 'row'
  },

  modalDialog:{
    //flexDirection: 'column',

    height: 100
  },

  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20
  },

  cameraPicker:{
    flex: 1,
  },

  updatedImage:{
    width: 150,
    height: 150,
    margin: 20,
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

  carsModalContent:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    //borderWidth:3,
    //borderColor: 'red'
  },

  carsModalText:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },

  carsModalInput:{
    height: 30,
    width: 300,
    padding: 5,
    margin: 10,
    //marginRight: 5,
    fontSize: 18,
    color: 'black',
    //borderWidth: 1,
    //borderColor: '#48afdb',
    //borderRadius: 4
  },

  button:{
    height: 36,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    alignSelf: 'stretch',
    margin: 5
  },

  btnText:{
    fontSize: 18,
    color: '#fff',
    marginTop: 6
  },

  plates:{
    flexDirection: 'column',
  }

})
