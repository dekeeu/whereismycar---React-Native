import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  BackHandler,
  List,
  Button,
  Alert,
  processColor
} from 'react-native';

import {StackNavigator, SafeAreaView} from 'react-navigation';

import {CarComponent} from './../CarComponent/CarComponent';
import CustomButtonComponent from './../CustomButtonComponent/CustomButtonComponent';

import ChartsListScreen from './../OtherComponents/ChartsListScreen';
import {PieChart} from 'react-native-charts-wrapper';

export class EditCarComponent extends Component{
  constructor(props){
    super(props);
    //console.log("EDITCARCONSTRUCTOR");
    //console.log(props);

    this.Brand = '';
    this.Model = '';
    this.Color = '';
    this.LicensePlateNumber = '';
    this.UsageNumber = 0;

    this.pieValues = [];

    //this.pieValues = props.pieValues;

    //console.log(this);

    if(this.props.navigation.state.params){
      if(this.props.navigation.state.params.pieval){
        this.pieValues = this.props.navigation.state.params.pieval;
        //console.log('------>');
        //console.log(this.pieValues);
        //console.log('------->More------->');
        //console.log(this.props.navigation);
      }
    }

    this.state = {
      legend: {
        enabled: false,
        textSize: 8,
        form: 'CIRCLE',
        position: 'RIGHT_OF_CHART',
        wordWrapEnabled: true
      },

      data: {

        dataSets: [{

          values: this.pieValues,


          label: 'Most parked cars',
          config: {
            colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
            valueTextSize: 20,
            valueTextColor: processColor('green'),
            sliceSpace: 5,
            selectionShift: 13
          }
        }],
      },
      description: {
        text: '',
        textSize: 15,
        textColor: processColor('darkgray')

      }
    };

  }

  componentDidMount(){
    //console.log("DID");


  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }
  }



  render(){
    const {goBack} = this.props.navigation;
    let carItem = this.props.navigation.state.params.item;
    //let reload = this.props.navigation.state.params.refresh;
    let editCar = this.props.navigation.state.params.update;
    let removeCar = this.props.navigation.state.params.remove;


    //let _pieValues = this.props.navigation.state.params.pieval;
    //this.pieValues = _pieValues;

    let refresh = this.props.navigation.state.params.refresh;
    let reloadStats = this.props.navigation.state.params.reloadStats;

    //console.log(stats);

    //console.log("From edit: " + carItem);

    this.Brand = carItem.getBrand();
    this.Model = carItem.getModel();
    this.Color = carItem.getColor();
    this.UsageNumber = carItem.getUsageNumber();

    //console.log("UsssssaGeNumber:" + this.UsageNumber);

    this.LicensePlateNumber = carItem.getLicensePlateNumber();



    return(
      <View style={styles.container}>
        <Text style={styles.text}>
          Edit Car
        </Text>

        <TextInput
          style={styles.text_input}
          onChangeText={(value) => this.Brand = value}
        placeholder='Brand'>
          {this.Brand}
        </TextInput>

        <TextInput
          style={styles.text_input}
          onChangeText={(value) => this.Model = value}
        placeholder='Model'>
          {this.Model}
        </TextInput>

        <TextInput
          style={styles.text_input}
          onChangeText={(value) => this.Color = value}
        placeholder='Color'>
          {this.Color}
        </TextInput>

        <TextInput
          style={styles.text_input}
          onChangeText={(value) => this.UsageNumber = value}
        placeholder='Usage Number:'>
          {this.UsageNumber}
        </TextInput>

        <TextInput
          style={styles.text_input}
          onChangeText={(value) => this.LicensePlateNumber = value}
        placeholder='License Plate Number:'>
          {this.LicensePlateNumber}
        </TextInput>

        <View style={styles.btns}>

          <CustomButtonComponent
            text='Update'
            onPress={() =>{
              carItem.setBrand(this.Brand);
              carItem.setModel(this.Model);
              carItem.setColor(this.Color);
              carItem.setLicensePlateNumber(this.LicensePlateNumber);
              carItem.setUsageNumber(Number.parseInt(this.UsageNumber));

              editCar(carItem);
              reloadStats();
              refresh();
              goBack();
            }}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text}
          ></CustomButtonComponent>

          <CustomButtonComponent
            text='Delete'
            onPress={() =>
              Alert.alert(
                  'Delete car',
                  'Are you sure you want to delete this car?',
                  [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => {console.log('OK Pressed'); removeCar(carItem); goBack()}},
                  ],
                { cancelable: false }
              )
            }
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text}></CustomButtonComponent>

        </View>

        <SafeAreaView style={{flex: 1}}>

          <View style={styles.container}>
            <PieChart
              style={styles.chart}
              logEnabled={true}
              chartDescription={this.state.description}
              data={this.state.data}
              legend={this.state.legend}

              //pvals={this.pieValues}


              entryLabelColor={processColor('black')}
              entryLabelTextSize={20}


              rotationEnabled={true}
              rotationAngle={45}
              drawSliceText={true}
              usePercentValues={false}
              styledCenterText={{text:'', color: processColor('pink'), size: 20}}
              centerTextRadiusPercent={100}
              holeRadius={40}
              holeColor={processColor('#f0f0f0')}
              transparentCircleRadius={45}
              transparentCircleColor={processColor('#f0f0f088')}
              maxAngle={350}
              onSelect={this.handleSelect.bind(this)}
            />
          </View>

        </SafeAreaView>


      </View>
    )
  }

}


const styles = StyleSheet.create({
  chart: {
    flex: 1,
    fontSize: 13
  },

  container: {
    flex: 1,
    flexDirection: 'column'
  },

  button:{
    margin: 10,
    padding: 15,
    backgroundColor: '#529ecc'
  },

  btns:{
      flexDirection: 'row'
  },

  text_input: {
    height: 40,
    width: 190,
    borderColor: 'gray',
    borderWidth: 0.5,
    margin: 10
    //flex: 1
  },

  text: {
    color: 'white',
    fontSize: 18
  },

  primary_button: {
    margin: 10,
    padding: 15,
    backgroundColor: '#529ecc'
  },

  primary_button_text: {
    color: '#FFF',
    fontSize: 18
  }


})
