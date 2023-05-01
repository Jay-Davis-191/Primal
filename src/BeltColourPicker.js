import React, { useState,Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Picker }  from '@react-native-picker/picker'
import { FindBeltLevel } from './FindBeltLevel';
var Width = Dimensions.get('window').width //full width of the device
var selectedBeltColour = ''; 


// Retrieves all the necessary colours from Java. 
const colorMapping = {
  White: 'white',
  Orange: 'orange',
  Yellow: 'yellow',
  Green: 'green',
  Purple: 'purple',
  Blue: 'blue',
  Brown: 'saddlebrown',
  Red: 'red',
  Grey: 'grey',
  Black: 'black',
 };

 const BeltColourPicker = ({navigation, numberOfClasses}) => {
  let beltColour = FindBeltLevel(numberOfClasses);
  const [selectedValue, setSelectedValue] = useState(beltColour);
  selectedBeltColour = selectedValue; 

 
   const handleValueChange = (value) => {
     setSelectedValue(value);
   };
 
   const pickerStyle = {
     ...styles.picker,
     backgroundColor: colorMapping[selectedValue],
   };
 
   return (
     <Picker
       style={pickerStyle}
       selectedValue={selectedValue}
       onValueChange={handleValueChange}
     >
      <Picker.Item label="White" value="White" style={{backgroundColor: 'white'}} />
      <Picker.Item label="Orange" value="Orange" style={{backgroundColor: 'orange'}} />
      <Picker.Item label="Yellow" value="Yellow" style={{backgroundColor: 'yellow'}} />
      <Picker.Item label="Green" value="Green" style={{backgroundColor: 'green'}} />
      <Picker.Item label="Purple" value="Purple" style={{backgroundColor: 'purple'}} />
      <Picker.Item label="Blue" value="Blue" style={{backgroundColor: 'blue'}} />
      <Picker.Item label="Brown" value="Brown" style={{backgroundColor: 'saddlebrown'}} />
      <Picker.Item label="Red" value="Red" style={{backgroundColor: 'red'}} />
      <Picker.Item label="Provisional Black" value="Grey" style={{backgroundColor: 'grey'}} />
      <Picker.Item label="Black" value="Black" style={{backgroundColor: 'black' }} />

     </Picker>
   );
 };

 export default BeltColourPicker

 const styles = StyleSheet.create({
  picker: {
    width: Width,
  },
});

export var selectedBeltColour; 