/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
  PermissionsAndroid,
  ToastAndroid as Toast
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { BleManager } from 'react-native-ble-plx';
import Routes from './src/routes'
import RNBluetoothClassic, {
  BluetoothDevice
} from 'react-native-bluetooth-classic';
import NotifService from './src/notifService';

import Register from './src/screens/Register'
function onRegister(token) {
  // this.setState({registerToken: token.token, fcmRegistered: true});
  console.log(token)
}

function onNotif(notif) {
  // Alert.alert(notif.title, notif.message);
  console.log(notif)
}
const App = () => {
  var notif
  useEffect(() => {
    notif = new NotifService(onRegister, onNotif);
  })

  const isDarkMode = useColorScheme() === 'dark';
  const [state,setState] = useState('')
  const [discovering,setDiscovering] = useState(false);
  // useEffect(async() =>{
    
  
  // })
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
 
  async function requestAccessFineLocationPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Access fine location required for discovery',
        message:
          'In order to perform discovery, you must enable/allow ' +
          'fine location access.',
        buttonNeutral: 'Ask Me Later"',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK'
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

 async function startDiscovery(){
    try {
      let granted = await requestAccessFineLocationPermission();
  
      if (!granted) {
      throw new Error(`Access fine location was not granted`);
      }
  
      // this.setState({ discovering: true });
      setDiscovering(true)

      try {
      RNBluetoothClassic.startDiscovery().then((res)=>{
        console.log(res)
      });
              
      // Toast.show({
      //     text: `Found ${unpaired.length} unpaired devices.`,
      //     duration: 2000
      // });

      } finally {
      // this.setState({ devices, discovering: false });
      // console.log(devices)
      setDiscovering(false)
      }      
    } catch (err) {
      Toast.show({
      text: err.message,
      duration: 2000
      });
      console.log(err.message)
    }
  }
  // function connect() {
  //   try {
  //     let connection = await this.props.device.isConnected();
  //     if (!connection) {
  //       connection = await this.props.device.connect(this.state.connectionOptions);
  //     }
  
  //     this.setState({connection});
  //     this.initializeRead();
  //   } catch (error) {
  //     // Handle error accordingly
  //   }
  // }
  function checkB(){
    console.log('hello')
    // RNBluetoothClassic.requestBluetoothEnabled()
    startDiscovery()
      //   try {
      //     // RNBluetoothClassic.isBluetoothEnabled().then((res)=>{
      //     //     console.log(res)
      //     // });
      //     RNBluetoothClassic.openBluetoothSettings();
      // } catch (err) {
      //     console.log(error)
      // }
  }

  // var firebaseConfig = {
  //   apiKey: "AIzaSyAgejVhRN8n9kckpdZH8RB0RS-SxdYqXuQ",
  //   authDomain: "contact-tracing-app-a95c2.firebaseapp.com",
  //   projectId: "contact-tracing-app-a95c2",
  //   storageBucket: "contact-tracing-app-a95c2.appspot.com",
  //   messagingSenderId: "929361253391",
  //   appId: "1:929361253391:web:532a1ce8ec71615f8aff7a",
  //   measurementId: "G-SJZ4P82H6R"
  // };
  // // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //   {/* <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}> */}
    //       <Text>
    //         Contact Tracing 
    //       </Text>

    //       <Button
    //       onPress={()=>{checkB()}}
    //       title="Bluetooth Check"
    //       />
    //   {/* </ScrollView> */}
    // </SafeAreaView>

    <>
    {/* <Register/> */}
    <Routes/>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
