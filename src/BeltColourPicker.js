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
      <Picker.Item label="White" value="White" />
      <Picker.Item label="Orange" value="Orange" />
      <Picker.Item label="Yellow" value="Yellow" />
      <Picker.Item label="Green" value="Green" />
      <Picker.Item label="Purple" value="Purple" />
      <Picker.Item label="Blue" value="Blue" />
      <Picker.Item label="Brown" value="Brown" />
      <Picker.Item label="Red" value="Red" />
      <Picker.Item label="Provisional Black" value="Grey" />
      <Picker.Item label="Black" value="Black" />

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