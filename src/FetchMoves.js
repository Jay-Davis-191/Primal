import { View, Text, FlatList, StyleSheet, Pressable, Dimensions, Image, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config';
import { collection, query, where } from 'firebase/firestore'
import FetchImage from './FetchImage';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FindFitnessReps } from './FindFitnessReps';
import { FlashList } from "@shopify/flash-list";


var Width = Dimensions.get('window').width //full width of the device
var height = Dimensions.get('window').height //full height of the device
var numberOfReps = ''; 

const FetchMoves = ({navigation, chosenPage, beltLevel, ageGroup}) => {
    const [fitnessMoves, setFitnessMoves] = useState([]);
    const [url, setUrl] = useState();

    useEffect(() => {
        async function FindMovesData() {
            var movesRef = ''; 
            numberOfReps = ''; 
            if (chosenPage != "Fitness") {
                if (beltLevel == "Grey") {
                    movesRef = firebase.firestore().collection('Moves').where('Category', '==', chosenPage).where('Class', '==', ageGroup).where('BeltColour', '!=', "Black").orderBy('BeltColour');  // SQL Query to retrieve moves depending on category, ageGroup, and beltLevel. 
                }
                else {
                    movesRef = firebase.firestore().collection('Moves').where('Category', '==', chosenPage).where('Class', '==', ageGroup).where('BeltColour', '==', beltLevel);  // SQL Query to retrieve moves depending on category, ageGroup, and beltLevel. 
                }
            }
            else {
                numberOfReps = FindFitnessReps(beltLevel, ageGroup);
                movesRef = firebase.firestore().collection('Moves').where('Category', '==', chosenPage);  // SQL Query to retrieve moves depending on category, ageGroup, and beltLevel. 
            }

            // const initialRef = movesRef.where('BeltColour', '==', beltLevel)

            //const movesRef = firebase.firestore().collection('Moves').where('Category', '==', chosenPage).where('Sub-Category', '==', 'Mount');
            //!----IMPORTANT-------//
            //For Provisional Black Belt choice, just change the query to where.('BeltColour', '!=', 'Black'), makes every other move available;
            //const queryRef = await movesRef.where('Category', '==', 'Fitness').get(); 

            movesRef
            .onSnapshot(
                querySnapshot => {
                    const fitnessMoves = []
                    querySnapshot.forEach((doc) => {
                        const { Category, Photo, Steps } = doc.data();
                        fitnessMoves.push({
                            id: doc.id, 
                            Category, 
                            Photo, 
                            Steps
                        })
                    })
                    setFitnessMoves(fitnessMoves)
                }
            )
        }
        FindMovesData();
    }, [])

    return (
        <View style={{ flex:1, width: Width }}>
            <FlashList 
                data={fitnessMoves}
                numColumns={1}
                estimatedItemSize={Width}
                renderItem={({item}) => (
                    <TouchableHighlight 
                        // 2 lines of code below make click invisible. 
                        activeOpacity={1}
                        underlayColor='hidden'
                        onPress={() => navigation.navigate('SelectedMove', {move: item.id, steps: item.Steps})}>     
                        <View style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>{numberOfReps} {item.id}</Text>
                            <FetchImage
                                Class = 'Adults'
                                Category = {item.Category}
                                SelectedMove = {item.id}
                                PhotoPath = {item.Photo}
                            />
                        </View>
                    </TouchableHighlight>
                )}

            />
        </View>
    )
}

export default FetchMoves


const styles = StyleSheet.create({
    container:  {
        backgroundColor: '#292929',
        padding:15,
        borderRadius:15, 
        margin:5,
        marginHorizontal:10, 
    },

    innerContainer: {
        alignItems:'center',
        flexDirection:'column',
    },

    itemHeading: {
        fontWeight:'bold',
        marginBottom: 10, 
        color: 'white', 
    },

    itemText: {
        fontWeight:'300',
    },
})