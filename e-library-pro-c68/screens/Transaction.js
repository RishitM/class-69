import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import * as Persmissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends Component {
constructor(){
  super();
  this.state={
    domState:'normal',
    hasCameraPermissions:'null',
    scanned:false,
    scannedData:''

  }
}
// asking camera permission
getCameraPermissions = async domState =>{
  const{status}=await Persmissions.askAsync(Permissions.CAMERA);
  // updating state
  this.setState({
    hasCameraPermissions: status=== 'granted',
    domState:domState,
    scanned:false, 
  })
  }
  
  handleBarCodeScanned = async ({type, data}) =>{
    this.setState({
      scanned:true,
      scannedData:data,
      domState:'normal'
    })
  }
  


  render() {
    const {domstate, hascameraPermissions, scannedData, scanned} = this.state;
    if (domstate === 'scanner')
    {
      return(
        <BarCodeScanner
        onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned()}
        ></BarCodeScanner>
      )
    }
     return (
      <View style={styles.container}>
       
        <Text style={styles.text}>{
          hasCameraPermissions ? scannedData:'Request for camera permission'
        }</Text>
         <TouchableOpacity
         onPress={()=> this.getCameraPermissions('scanner')}
         style={styles.button}
         >
          <Text style={styles.buttonText}>QR Code</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  button:
   { width: "43%", 
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20", 
    borderRadius: 15 }
    , buttonText: 
    { fontSize: 24, color: "#FFFFFF" }
});
