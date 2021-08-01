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
import SpecialBle, {requestLocationPermission, checktLocationPermission} from 'rn-contact-tracing';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state,setState] = useState([])
  const [discovering,setDiscovering] = useState(false);
  const bleManager = new BleManager()
  const [config, setConfig] = useState({
    serviceUUID: '00000000-0000-1000-8000-00805F9B34FB',
    scanDuration: 10000,
    scanInterval: 3000,
    advertiseInterval: 0,
    advertiseDuration: 0,
    advertiseMode: 0,
    token: 'default_token',
    scanMatchMode:1,
    advertiseTXPowerLevel:0
});
  function checkB(){
    console.log("inScanfunction")
    SpecialBle.setConfig(config)
    SpecialBle.startBLEScan();
  }

  return (
    <SafeAreaView >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}> */}
          <Text>
            Contact Tracing  App2
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
            SpecialBle.stopBLEScan();
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
            SpecialBle.getAllDevices((devices) => {
              console.log(devices)
            })
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
