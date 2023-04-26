import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighLight, Dimensions } from 'react-native'
import { initializeApp } from 'firebase/app' // validate yourself
import { firebase } from '../config';
import { getStorage, ref, getDownloadURL } from 'firebase/storage' // access the storage database
import storage from '@react-native-firebase/storage'

var width = Dimensions.get('window').width //full width of the device
var height = Dimensions.get('window').height //full height of the device
var path; 


export default function FetchImage({Class, Category, SelectedMove, PhotoPath}) {
    const [url, setUrl] = useState();

    useEffect(() => {
        const func = async () => {
            const storage = getStorage();
            //const reference = ref(storage, '/Images/Adult/Fitness/Pushups.jpg');
            //path = '/Images/' + Class + '/' + Category + '/' + SelectedMove + '.jpg'
            path = PhotoPath; 
            //const path = '/Images/Adults/Fitness/Pushups.jpg'; 
            const reference = ref(storage, path);
            await getDownloadURL(reference).then((x) => {
                setUrl(x);
            })
        }
        if (url == undefined) {func()};
    }, []);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 50}}>
            <Image
                style={{width:width * 3 / 4, height: height / 5}}
                source={{ uri: url }}
            />
        </View>
    );
}