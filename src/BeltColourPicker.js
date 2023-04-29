import React, { useState,Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Picker }  from '@react-native-picker/picker'

const NUMBER_TO_PROVISIONAL_BLACK_BELT = 192 / 24; 
var Width = Dimensions.get('window').width //full width of the device

function retrieveBeltLevel(number) {
  var x = Math.floor(number / 24); // Divides the total number of classes by the required number of classes for each belt except for provisional-black and black.
  if (x < NUMBER_TO_PROVISIONAL_BLACK_BELT) { // Implies the student reaches the number of classes necessary for a black belt.
    switch (x) {
    case 0:
      return 'white';
    case 1: 
      return 'orange';
    case 2: 
      return 'yellow';
    case 3: 
      return 'green';
    case 4:
      return 'purple';
    case 5: 
      return 'blue';
    case 6: 
      return 'brown';
    case 7: 
      return 'red';
    default:
      return 'white'; 
    }
  }
  else if (8 <= x && x < 10) {
    return 'grey'; 
  }
  else if (x >= 10) {
    return 'black'
  }
  else {
    return 'break'
  }
}; 
 
// Retrieves all the necessary colours from Java. 
const colorMapping = {
  white: 'white',
  orange: 'orange',
  yellow: 'yellow',
  green: 'green',
  purple: 'purple',
  blue: 'blue',
  brown: 'saddlebrown',
  red: 'red',
  grey: 'grey',
  black: 'black',
 };
 
 const BeltColourPicker = ({navigation, numberOfClasses}) => {
  let beltColour = retrieveBeltLevel(numberOfClasses);
  const [selectedValue, setSelectedValue] = useState(beltColour);

 
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
      <Picker.Item label="White" value="white" />
      <Picker.Item label="Orange" value="orange" />
      <Picker.Item label="Yellow" value="yellow" />
      <Picker.Item label="Green" value="green" />
      <Picker.Item label="Purple" value="purple" />
      <Picker.Item label="Blue" value="blue" />
      <Picker.Item label="Brown" value="brown" />
      <Picker.Item label="Red" value="red" />
      <Picker.Item label="Provisional Black" value="grey" />
      <Picker.Item label="Black" value="black" />

     </Picker>
   );
 };

 export default BeltColourPicker

 const styles = StyleSheet.create({
  picker: {
    width: Width,
  },
});