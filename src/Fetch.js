import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config';


const Fetch = () => {
    const [users, setUsers] = useState([]);
    const todoRef = firebase.firestore().collection('Users');

    useEffect(async () => {
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
    }, [])

    return (
        <View style={{ flex:1, marginTop:100}}>
            <FlatList 
                style={{height:'100%'}}
                data={users}
                numColumns={1}
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