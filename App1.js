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


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state,setState] = useState([])
  const [discovering,setDiscovering] = useState(false);
  const bleManager = new BleManager()
  function checkB(){
    console.log("inScanfunction")
    bleManager.startDeviceScan(null, 
      null, (error, device) => {
        console.log('scan running')
        console.log(device.id,device.name)
      // setState(()=>{
      //   return (state.push({id:device._id,name:device.name}))
      // })
    
    })

  }

  return (
    <SafeAreaView >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}> */}
          <Text>
            Contact Tracing 
          </Text>

          <Button
          onPress={()=>{checkB()}}
          title="clickMe"
          />
          <View
          style={styles.button}

          >
          <Button
          onPress={()=>{
            bleManager.stopDeviceScan()
            console.log("scan stopped")
          }}
          title="Stop"
          />

          </View>

          <View
          style={styles.button}

          >
          <Button
          onPress={()=>{
            console.log(state)
          }}
          title="See Data"
          />

          </View>
          
      {/* </ScrollView> */}
    </SafeAreaView>
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
  button:{
    marginTop: 32
  }
});

export default App;
