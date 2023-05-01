import { View, Text, FlatList, StyleSheet, Pressable, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config';
import { FlashList } from '@shopify/flash-list';
var Width = Dimensions.get('window').width //full width of the device
var Height = Dimensions.get('window').height //full width of the device



const Fetch = () => {
    const [users, setUsers] = useState([]);
    const todoRef = firebase.firestore().collection('Users');

    useEffect(() => {
        async function retrieveAllUsersData() {
            todoRef
            .onSnapshot(
                querySnapshot => {
                    const users = []
                    querySnapshot.forEach((doc) => {
                        const { Name, Age, Username, Password, NumberOfClasses, Active } = doc.data()
                        users.push({
                            id: doc.id,
                            Name,
                            Age, 
                            Username,
                            Password, 
                            NumberOfClasses,
                            Active
                        })
                    })
                    setUsers(users)
                }
            )
        }
        retrieveAllUsersData();
    }, [])

    return (
        <View style={{ flex:1, height: Height}}>
            <FlashList 
                data={users}
                numColumns={1}
                estimatedItemSize={Width}
                renderItem={({item}) => (
                    <Pressable style={styles.container} >
                        <View style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>{item.Name}</Text>
                            <Text style={styles.itemHeading}>{item.Age}</Text>
                            <Text style={styles.itemHeading}>{item.Username}</Text>
                            <Text style={styles.itemHeading}>{item.Password}</Text>
                            <Text style={styles.itemHeading}>{item.NumberOfClasses}</Text>
                            <Text style={styles.itemHeading}>{String(item.Active)}</Text>

                        </View>
                    </Pressable>
                )}
            />
        </View>
    )
}

export default Fetch


const styles = StyleSheet.create({
    container:  {
        backgroundColor: '#e5e5e5',
        padding:15,
        borderRadius:15, 
        margin:5,
        marginHorizontal:10, 
    },

    intterContainer: {
        alignItems:'center',
        flexDirection:'column',
    },

    itemHeading: {
        fontWeight:'bold',
    },

    itemText: {
        fontWeight:'300',
    },
})