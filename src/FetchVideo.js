import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighLight, Dimensions } from 'react-native'
import { initializeApp } from 'firebase/app' // validate yourself
import { firebase } from '../config';
import { getStorage, ref, getDownloadURL } from 'firebase/storage' // access the storage database
import storage from '@react-native-firebase/storage'
import { Video, AVPlaybackStatus } from 'expo-av';




export default function FetchVideo({ chosenMove }) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState();
    const [url, setUrl] = useState();
    var Width = Dimensions.get('window').width //full width of the device
    var Height = Dimensions.get('window').height //full height of the device


    useEffect(() => {
        const func = async () => {
            const storage = getStorage();
            //const reference = ref(storage, '/Videos/Adults/Fitness/Pushups.mp4');
            const reference = ref(storage, '/Videos/Adults/Fitness/' + chosenMove + '.mp4');
            await getDownloadURL(reference).then((x) => {
                setUrl(x);
            })
        }
        if (url == undefined) {func()};
    }, []);

    return (
            <Video
              ref={video}
              style={{width: Width-20, height: Height / 3, backgroundColor:'#292929' }}
              source={{
                //uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                // uri: 'https://www.w3schools.com/tags/movie.mp4' 
                uri: url
              }}
              useNativeControls
              muted={false}
              volume={100}
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={status => setStatus(() => status)}
            />

    );
}