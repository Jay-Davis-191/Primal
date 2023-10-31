import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput, Image, ImageBackground, TouchableHighlight, Dimensions, ScrollView } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import Video from 'react-native-video';
import { Col, Row, Grid } from "react-native-easy-grid";
import { ReactNativeFirebase } from '@react-native-firebase/app';

import { initializeApp } from 'firebase/app';
import { collection, getDocs } from 'firebase/firestore'

import Fetch from './src/Fetch';
import { firebase } from './config';
import FetchImage from './src/FetchImage';
import FetchVideo from './src/FetchVideo';
import FetchMoves from './src/FetchMoves';
import BeltColourPicker from './src/BeltColourPicker'
import { selectedBeltColour } from './src/BeltColourPicker';
import { FindBeltLevel } from './src/FindBeltLevel'
import { FindAgeGroup } from './src/FindAgeGroup'

import AddUser from './src/AddUser';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const Stack = createNativeStackNavigator();
var Width = Dimensions.get('window').width //full width of the device
var Height = Dimensions.get('window').height //full height of the device


//-----------------------------------------------------------
//All pages are created here. 
const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen 
            name="Login"
            component={LoginScreen}
            options={{title: 'Login'}}
          />
          <Stack.Screen 
            name="SignUp"
            component={SignUpScreen}
            options={{title: 'Sign Up'}}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{title: 'Dashboard'}}  
          />
          <Stack.Screen 
            name="Fitness" 
            component={FitnessScreen}
            options={{title: 'Fitness'}}  
          />
          <Stack.Screen 
            name="Striking" 
            component={StrikingScreen}
            options={{title: 'Striking'}}  
          />
          <Stack.Screen 
            name="GroundSkills" 
            component={GroundSkillsScreen}
            options={{title: 'Ground Skills'}}  
          />
          <Stack.Screen 
            name="SelectedMove" 
            component={SelectedMoveScreen}
            options={{title: ''}}  
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
};


//-----------------------------------------------------------
//LoginScreen is where the user logs in using their email address and password. 
//Once the account is found in the database and verified, the user will be moved to the home page.
const LoginScreen = () => {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    const data = await getDocs(firebase.firestore().collection('Users'));
    const users = data.docs.map(doc => doc.data());
    const emailLowered = email.toLowerCase(); 
    const matchedUser = users.find(
        user => String(user.Email).toLowerCase() === emailLowered); // Both emails (firebase and textinput) are changed to lowercase to prevent case-sensitive issues. 
    if (matchedUser) {  // Check if firebase contains the provided email address. 
      if (matchedUser.Password === password) {  // Checks if the provided password is correct. 
        if (matchedUser.Active == true) {  // Checks the active status of the user's account. If suspended, the user won't be granted entry.
          navigation.navigate('Home', {
            userEmail: matchedUser.Email,
            userName: matchedUser.Name,
            userNumberOfClasses: matchedUser.NumberOfClasses,
            userDOB: matchedUser.DOB,
          });
        } else {
          setErrorMessage('Your account is inactive or suspended');
        }
      }
      else {
        setErrorMessage('Invalid password');
      }
    }
    else {
      setErrorMessage('No account was found with that email address');
    }

  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/LoginPageLogo.png')} style={styles.CoverImage}>
        <View style={styles.LoginInputs}>
          <TextInput style={styles.inputText}
            value={email}
            onChangeText={onChangeEmail}
            placeholder="Email Address"
            keyboardType="email-address"
            defaultValue='jayddavis191@gmail.com'
            color='white'
            placeholderTextColor='white'
          />

          <TextInput style={styles.inputText}
            value={password}
            onChangeText={onChangePassword}
            placeholder="Password"
            keyboardType="visible-password"
            defaultValue='test123'
            color='white'
            placeholderTextColor='white'
          />
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <StatusBar style="auto" />
          <Text style={styles.TextGap}></Text>
          

          <Grid style={styles.LoginPageButtons}>
            <Col>
              <TouchableHighlight style={styles.LoginButton}
                title="Sign Up"
                color= 'green'
                alignSelf= 'center'
                onPress={() => navigation.navigate('SignUp')} >
                <Text style={styles.LoginText}>SIGN UP</Text>
              </TouchableHighlight>
            </Col>
            <Col>
              <TouchableHighlight style={styles.LoginButton}
                  title="Login"
                  color= 'green'
                  alignSelf= 'center'
                  onPress={handleLogin} >
                  <Text style={styles.LoginText}>LOGIN</Text>
              </TouchableHighlight>
            </Col>
          </Grid>
        </View>
        </ImageBackground>
      </View>
  )
}


//-----------------------------------------------------------
//SignUpScreen is where the user creates their account and provides all of their information. 
//Once the account is found in the database and verified, the user will be moved to the home page.
const SignUpScreen = () => {
  const [name, setUserName] = React.useState('');
  const [email, setUserEmail] = React.useState('');
  const [password, setUserPassword] = React.useState('');
  const [financialDetails, setUserFinancialDetails] = React.useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [DOB, setUserDOB] = React.useState('DOB');
  const navigation = useNavigation();
  var formattedDate; 

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => { 
    const year = date.getFullYear(); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    formattedDate = String(`${day}/${month}/${year}`); 
    setUserDOB(formattedDate); 
    hideDatePicker(); 
  };

  const addUserAndChangePage = () => {
    var state = AddUser(name, email, password, financialDetails, DOB);
    if (state == true) {
      var greeting = String(`Account Created. Welcome ${name}!`); 
      console.warn(greeting);
      navigation.navigate('Login'); 
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TextInput style={styles.inputText}
        value={name}
        onChangeText={setUserName}
        placeholder="Full Name"
        keyboardType='default'
        color='white'
        placeholderTextColor='white'
      />

      <TextInput style={styles.inputText}
        value={email}
        onChangeText={setUserEmail}
        placeholder="Email Address"
        keyboardType="email-address"
        color='white'
        placeholderTextColor='white'
      />

      <TextInput style={styles.inputText}
        value={password}
        onChangeText={setUserPassword}
        placeholder="Password"
        keyboardType="visible-password"
        color='white'
        placeholderTextColor='white'
      />

      <TextInput style={styles.inputText}
        value={financialDetails}
        onChangeText={setUserFinancialDetails}
        placeholder="Financial Details"
        keyboardType='number-pad'
        color='white'
        placeholderTextColor='white'
      />

      <Button title={DOB} onPress={showDatePicker} />
      <DateTimePickerModal 
        style={{width: 300}}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date('01/01/1900')}
        maximumDate={new Date()}
        display='spinner'
        value={new Date()}
      />

      <Text style={styles.TextGap}></Text>


      <TouchableHighlight style={styles.CreateAccountButton}
        title="Create Account"
        color= 'green'
        alignSelf= 'center'
        onPress={() => addUserAndChangePage()} >
        <Text style={styles.LoginText}>Create Account</Text>
      </TouchableHighlight>
    </View>
  )
}


//-----------------------------------------------------------
//HomeScreen opens the home page of the app including progress status, gallery and buttons to other screens. 
//@params route, includes the email of the user which will be used in the WHERE clause for the SQL query to find the user's information. 
const HomeScreen = ({navigation, route}) => {
  const ageGroup = FindAgeGroup(route.params.userDOB);

  return (
    <SafeAreaView style={styles.container}>
      <View>
      <Text style={styles.TextGap}></Text>
        <BeltColourPicker
          navigation={navigation}
          numberOfClasses={route.params.userNumberOfClasses}
          name={route.params.Name}
        />
  
        <View style={styles.HomePageContent}> 
        <View style={styles.stripes}>
          <View style={styles.colouredStripe} backgroundColor='red'>
            <Text style={styles.stripeText}>Fitness</Text>
          </View>
          <View style={styles.colouredStripe} backgroundColor='blue'>
            <Text style={styles.stripeText}>Teamwork</Text>
          </View>
          <View style={styles.colouredStripe} backgroundColor='green'>
            <Text style={styles.stripeText}>Honesty</Text>
          </View>
          <View style={styles.colouredStripe} backgroundColor='yellow'>
            <Text style={styles.stripeText}>Confidence</Text>
          </View>
        </View>


        <View style={styles.progressBarView}>        
          <Text style={styles.progressText}>Progress</Text>
          <Text style={styles.progressText}>4 weeks to go</Text> 
          <View style={styles.progressBar}>
            <View style={styles.progressBarHalf} />
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: 30}}>
          <Text style={{marginBottom: 30, fontSize:20, fontWeight:'bold', color:'white'}}>The ------ Family</Text>
            <Image
                style={{marginTop: -20, height: 350, width: 300, borderRadius: 20}} // Rounds the corners of the images of all moves. 
                source={require('./assets/LoginPageLogo.png')} // This is going to be replaced with a slideshow taken from the client. These pictures will include photos of special events and gatherings.  
            />
        </View>
        <Text style={styles.TextGap}></Text>

        </View>

        <StatusBar style="auto" />
      </View>
      <Grid style={styles.footerButtonsView}>
        <Col>
          <Button 
            title="Fitness"
            color='green'
            style={{ width: Width }}
            onPress={() => navigation.navigate('Fitness', { 
              beltColour: selectedBeltColour,
              age: ageGroup})}
          />
        </Col>
        <Col>
          <Button 
            title="Striking"
            color='green'
            onPress={() => navigation.navigate('Striking', { 
              beltColour: selectedBeltColour,
              age: ageGroup})}          />
        </Col>
        <Col>
          <Button 
            title="Ground Skills"
            color='green'
            onPress={() => navigation.navigate('GroundSkills', { 
              beltColour: selectedBeltColour,
              age: ageGroup})}          />
        </Col>
      </Grid>
    </SafeAreaView>
  )
}


//-----------------------------------------------------------
//FitnessScreen includes all appropriate fitness options for the user. 
 const FitnessScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.heading}></Text>
        <FetchMoves 
          navigation={navigation}
          chosenPage="Fitness"
          beltLevel={selectedBeltColour}
          ageGroup={route.params.age}
          />
      </View>
    </SafeAreaView>
  )
}


//-----------------------------------------------------------
//StrikingScreen includes all appropriate striking options for the user. 
 const StrikingScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.heading}></Text>
        <FetchMoves 
          navigation={navigation}
          chosenPage="Striking"
          beltLevel={selectedBeltColour}
          ageGroup={route.params.age}
          />
      </View>
    </SafeAreaView>
  )
}


//-----------------------------------------------------------
//GroundSkillsScreen includes all appropriate ground skills for the user. 
 const GroundSkillsScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.heading}></Text>
        <FetchMoves 
          navigation={navigation}
          chosenPage="Ground Skills"
          beltLevel={selectedBeltColour}
          ageGroup={route.params.age}
          />
      </View>
    </SafeAreaView>
  )
}


//-----------------------------------------------------------
//SelectedMoveScreen shows the move the user selects including the move's video, steps, and notes. 
//@params route, includes the name of the move. When the SQL query is executed, the WHERE clause
 //will check for the name and the class the user belongs to. 
 //When user closes this page, the notes will be updated in the SQL database. 
const SelectedMoveScreen = ({navigation, route}) => {
  React.useEffect(() => 
    navigation.setOptions({ title : route.params.move }) // Changes title of the ppage to the selected move
  ), [route.params, navigation]

  var steps = route.params.steps.replace(/-/g, '\n-'); 
  //steps = steps.replace('\n-', '-'); 
  steps = steps + '\n'
  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <FetchVideo 
            chosenMove={route.params.move}
            //style={{ width: Width - 20, height: Height / 3, }}
          />
          <Text style={styles.selectedMoveText}>{steps}</Text>
        </View>
    </SafeAreaView>
  )
}

        
//-----------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#292929',
    alignItems: 'center',
    justifyContent: 'center',
  },

  LoginPageButtons: {
    width: Width * 0.9,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  }, 

  TextGap: {
    paddingVertical: 17
  },

  CoverImage: {
    flex: 1, 
    justifyContent: 'center',
    width: Width,
  }, 

  HomePageContent: {
    marginTop: -80,
  }, 

  stripes: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  stripeText: {
    fontSize: 20, 
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  colouredStripe: {
    height: 30, 
    width: Width * 0.9,
    borderRadius: 10, 
    marginTop: 10, 
  }, 

  SignUpButton: {
    position: 'absolute',
    right: -10, 
    top: 0, 
    backgroundColor: 'green',
    padding: 10,
    paddingRight: 5, 
    marginTop: 5, 
    marginRight: 15, 
    borderRadius: 10,
  },

  progressBarView: {
    alignContent:'center',
    width: Width, 
    marginTop: 0,
    marginBottom: 50
  }, 
  
  progressBar: {
    height: 20, 
    width: Width * 0.6, 
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
  },

  progressBarHalf: {
    height: 20, 
    width: Width * 0.5, 
    alignSelf: 'flex-start',
    backgroundColor: 'black',
    borderRadius: 10,
  },

  progressText: {
    textAlign: 'center',
    fontSize: 20, 
    color: 'white'
  },

  SignUpText: {
    color: 'white',
    fontWeight: 'bold', 
  },

  LoginInputs: {
    marginTop: 100, 
  }, 

  LoginButton: {
    alignSelf: 'center',
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 15,
    position: 'absolute',
  },

  LoginText: {
    color: 'white',
    fontWeight: 'bold', 
  },

  saveText: {
    alignSelf: 'flex-end',
    marginTop: -5,
    position: 'absolute', // add if dont work with above
  }, 

  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 16, 
    borderColor: 'black', 
    textAlign: 'center',
    padding: 8
  },

  inputText: {
    fontSize: 20,
    margin: 16, 
    borderWidth: 2, 
    width: Width * 0.8, 
    alignSelf: 'center', 
    borderColor: 'white', 
    borderRadius: 7, 
    padding: 8, 
  }, 

  CreateAccountButton: {
    alignSelf: 'center',
    backgroundColor: 'green',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 15,
    marginTop: -20, 
  },

  errorText: {
    fontSize: 15, 
    alignSelf: 'center',
    color: 'red', 
  }, 

  footerButtonsView: {
    width: Width,
    flexDirection: 'row',
    position: 'absolute', 
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    bottom: 0,
    borderTopWidth: 1, 
  },

  videoStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0  
  },

  selectedMoveText: {
    minHeight: Height / 5,
    width: Width - 20, 
    fontSize: 20,
    margin: 6, 
    alignContent: 'center',
    borderWidth: 2, 
    borderColor: '#e5e5e5', 
    color: 'white',
    padding: 8,
    textAlign: 'left',
    textAlignVertical: 'top',
  }, 

});


//-----------------------------------------------------------
//Runs app
export default MyStack; 
