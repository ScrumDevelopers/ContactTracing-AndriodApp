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
import NotifService from '../notifService';
import PushController from '../PushController';
import PushNotification, {Importance} from 'react-native-push-notification';
import RNBluetoothClassic, {
  BluetoothDevice
} from 'react-native-bluetooth-classic';
const axios = require('axios');
import Toolbar from '../components/Toolbar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { material } from 'react-native-typography'

function onRegister(token) {
  // this.setState({registerToken: token.token, fcmRegistered: true});
  console.log(token)
}

function onNotif(notif) {
  // Alert.alert(notif.title, notif.message);
  console.log(notif)
}

const Home = () => {
  var notif
    useEffect(() =>{
      notif = new NotifService(onRegister,onNotif);
    })

// const isDarkMode = useColorScheme() === 'dark';
  const [state,setState] = useState('')
  const [discovering,setDiscovering] = useState(false);
  const [btdata,setbtdata] = useState([]);
  const [status, setStatus] = useState(false)
  // useEffect(async() =>{
    
  
  // })
  
 
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

function sendBtdata(data){
  axios.post('http://192.168.43.57:5000/saveBTdata',
           {
             userId:"84:10:0D:FA:87:33",
              btdata:data
            }
           )
          .then(function (response) {

            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
}

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
        // console.log(res[0].address)
      var data = []
      if(res.length!=0){
            res.forEach((item)=>{
                    var temp
                    var d = +new Date
                      temp={
                        id:item.address,
                        timestamp:d
                      }
                  data.push(temp)
                  })

                  // sendBtdata(data)
                  console.log(data)
                    setbtdata((prevState)=>{
                     
                      // var temp
                      // temp={
                      //   id:res.address,
                      //   timestamp:'10'
                      // }
                      // console.log(temp)
                      return [...data]
                    })
      }else{
        console.log("no bt found")
      }

      
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
  function checkB(){
    // console.log('hello')
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
  function onClickUpdate (){
    var s = status?" Negative":" Positive"
    var title = "Do you want to change your covid Status to" + s
    Alert.alert(
      "Update Status",
      title,
      [ 
        {
          text: "OK",
          onPress: () => {

            axios.post('http://192.168.43.57:5000/changeCStatus',
           {
              b_id:"78:20:0D:F1:82:20",
              cstatus:status
            }
           )
          .then(function (response) {
            Alert.alert("Your Covid Status has been changed Successfully")
            setStatus(!status);
          })
          .catch(function (error) {
            console.log(error);
          });

          },
          style: "ok",
        },
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        // onDismiss: () =>
        //   Alert.alert(
        //     "This alert was dismissed by tapping outside of the alert dialog."
        //   ),
      }
    );
  }

  return (
    <>
    <ScrollView 
        contentContainerStyle={{    flexGrow: 1         }}
      //  contentContainerStyle={{ flexGrow: 1 }}
        >


    <Toolbar/>
    <SafeAreaView
    style={styles.container}
    >
        <View
                style={styles.statusView}
                >
                  <Text
                  style={{fontSize:20,marginBottom:hp(1)}}
                  >
                    Contact Tracing: Active 
                  </Text>
                  <Text
                  style={{fontSize:14,marginBottom:hp(1)}}
                  >
                  Internet: Connected 
                </Text>
                  <Text
                  style={{fontSize:14,marginBottom:hp(1)}}
                  >
                    Bluetooth: ON
                  </Text>
                </View>


                <View
                style={styles.statusView}
                >
                  <Text
                  style={{fontSize:20,marginBottom:hp(1)}}
                  >
                    Your Status: {status?"Positive":"Negative"}
                  </Text>
                  <Button
                onPress={()=>{
                  onClickUpdate()
                }}
                title="Update Status"
                style={styles.button}
                color="grey"
                />
                </View>

                <View
                style={styles.alertView}
                >
                  <Text
                  style={{fontSize:20,marginBottom:hp(0.5)}}
                  >
                Close Contact Alert !!
                  </Text>
                <Text
                style={{fontSize:12,textAlign: 'center'}}
                >
                A person who was in your contact recently, has updated their covid status as positive. So, If you feel some symptoms take necessary precautions.
                </Text>
                </View>

                <View
                style={styles.guideView}
                >
                  <Text
                  style={{fontSize:20,marginBottom:hp(0.5)}}
                  >
                Guidelines and precautions
                  </Text>
                <Text
                style={{fontSize:12}}
                >
                  1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                      molestiae quas vel sint commodi 
                
                </Text>
                </View>
       {/* <PushController/> */}

    </SafeAreaView>
    </ScrollView>

    </>
  );
};

const styles = StyleSheet.create({
  container:{
    padding:wp(4)

  },
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
  statusView:{
    height:hp("15%"),
    backgroundColor:'#D2D2D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2)
  },
  alertView:{
    height:hp("15%"),
    backgroundColor:'#D2D2D2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:wp(2),
    marginBottom: hp(2)

  },
  guideView:{
    height:hp("40%"),
    backgroundColor:'#D2D2D2',
    // justifyContent: 'center',
    alignItems: 'center',
    padding:wp(2)
  }
  // button:{
  //   marginTop:10
  // }
});

export default Home;
