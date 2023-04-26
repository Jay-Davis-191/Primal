import React, { useState, useEffect } from 'react'
import { firebase } from '../../config';
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';
import { collection, query, where } from 'firebase/firestore';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


export default function getSteps() {

var collectionData = "Moves"; 
const db = getFirestore();
const docRef = doc(db, "Moves", "Pushups");

docSnap.data(); 

try {
    const docSnap = getDoc(docRef); 
    if (docSnap.exists()) {
        return "asjdasd";
    } else {
        console.log("Document does not exist");
    }

} catch (error) {
    console.log(error); 
}
}