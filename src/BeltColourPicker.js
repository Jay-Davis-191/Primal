import React, { useState,Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Picker }  from '@react-native-picker/picker'
import { FindBeltLevel } from './FindBeltLevel';
var Width = Dimensions.get('window').width //full width of the device
var selectedBeltColour = ''; 
var pickerData = []


// Retrieves all the necessary colours from Java. 
const colorMapping = {
  White: 'white',
  Orange: 'orange',
  Yellow: 'yellow',
  Green: 'green',
  Purple: 'purple',
  Blue: 'blue',
  Saddlebrown: 'saddlebrown',
  Red: 'red',
  Grey: 'grey',
  Black: 'black',
 };

 const BeltColourPicker = ({navigation, numberOfClasses, name}) => {
  let BELT_COLOUR = FindBeltLevel(numberOfClasses);
  applyPickerItems(BELT_COLOUR); 
  const [selectedValue, setSelectedValue] = useState(BELT_COLOUR);
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
      {pickerData}
    </Picker>
   );
 };
 
 const applyPickerItems = (BELT_COLOUR) => {
  pickerData = []
  addToPickerData('White'); 
  if (BELT_COLOUR == 'White') {
    return pickerData; 
  }
  addToPickerData('Orange'); 
  if (BELT_COLOUR == 'Orange') {
    return pickerData; 
  }
  addToPickerData('Yellow'); 
  if (BELT_COLOUR == 'Yellow') {
    return pickerData; 
  }
  addToPickerData('Green'); 
  if (BELT_COLOUR == 'Green') {
    return pickerData; 
  }
  addToPickerData('Purple'); 
  if (BELT_COLOUR == 'Purple') {
    return pickerData; 
  }
  addToPickerData('Blue'); 
  if (BELT_COLOUR == 'Blue') {
    return pickerData; 
  }
  addToPickerData('Saddlebrown'); 
  if (BELT_COLOUR == 'Saddlebrown') {
    return pickerData; 
  }
  addToPickerData('Red'); 
  if (BELT_COLOUR == 'Red') {
    return pickerData; 
  }
  addToPickerData('Grey'); 
  if (BELT_COLOUR == 'Grey') {
    return pickerData; 
  }
  addToPickerData('Black'); 
  if (BELT_COLOUR == 'Black') {
    return pickerData; 
  }
 }

 const addToPickerData = (colour) => {
  let beltColourAsString = String(colour); 
  let colourCapitalized = beltColourAsString.toLowerCase();
  pickerData.push(<Picker.Item value={colour} style={{backgroundColor: colourCapitalized}} />);  
 }

 export default BeltColourPicker

 const styles = StyleSheet.create({
  picker: {
    width: Width,
  },
});

export var selectedBeltColour; 