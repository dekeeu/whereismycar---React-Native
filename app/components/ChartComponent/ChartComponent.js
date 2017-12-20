import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import ChartsListScreen from "./../OtherComponents/ChartsListScreen";

export class ChartComponent extends Component{
  constructor(){
    super();
  }



  render(){
    return(
      <ChartsListScreen></ChartsListScreen>
    )
  }

}


const styles = StyleSheet.create({

})
