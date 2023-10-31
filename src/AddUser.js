import React, { useState,Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native'
import { firebase } from '../config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

var Width = Dimensions.get('window').width //full width of the device

const AddUser = (name, email, password, financialDetails, DOB) => { 
    const isValid = checkEntries(name, email, password, financialDetails, DOB); 
    if (isValid) {
        firebase.firestore().collection('Users').add({
            Active: true, 
            DOB: String(DOB), 
            Email: email,
            FinancialDetails: financialDetails,
            Name: name, 
            NumberOfClasses: 0, 
            Password: password,
        })
    }
    return isValid; 
};

export default AddUser


const checkEntries = (name, email, password, financialDetails, DOB) => {
    if (String(name).trim() === '') {
        console.warn('Name is empty')
        return false; 
    }
    if (String(email).trim() === '') {
        console.warn('Email is empty')
        return false; 
    }
    if (String(password).trim() === '') {
        console.warn('Password is empty')
        return false; 
    }
    if (String(financialDetails).trim() === '') {
        console.warn('Financial details is empty')
        return false; 
    }
    if (String(DOB).trim() === '' || String(DOB) == 'DOB') {
        console.warn('Date of birth is empty')
        return false; 
    }
    return true;
}


const styles = StyleSheet.create({
    picker: {
        width: Width,
    },
});