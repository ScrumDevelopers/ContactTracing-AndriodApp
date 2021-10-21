import React, { useState, useEffect } from 'react';
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
  Pressable,
  Image,
  ImageBackground,
  ToastAndroid as Toast
} from 'react-native';
import NotifService from '../notifService';
import PushController from '../PushController';
import PushNotification, { Importance } from 'react-native-push-notification';
import RNBluetoothClassic, {
  BluetoothDevice
} from 'react-native-bluetooth-classic';
const axios = require('axios');
import Toolbar from '../components/Toolbar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { material } from 'react-native-typography';
import AppColor from '../Assets/AppColor';
import Modal from "react-native-modal";
import DocumentPicker from 'react-native-document-picker';



function onRegister(token) {
  // this.setState({registerToken: token.token, fcmRegistered: true});
  console.log(token)
}

function onNotif(notif) {
  // Alert.alert(notif.title, notif.message);
  console.log("Home",notif)
}

const Home = () => {
  // var notif
  // useEffect(() => {
  //   notif = new NotifService(onRegister, onNotif);
  // })

  // const isDarkMode = useColorScheme() === 'dark';
  const [state, setState] = useState('')
  const [discovering, setDiscovering] = useState(false);
  const [btdata, setbtdata] = useState([]);
  const [status, setStatus] = useState(false)
  const [ pushnoti, setPushnoti] = useState(false)
  // const [ notif, setNotif] = useState(new NotifService(onRegister, onNotif))
  const [multipleFile, setMultipleFile] = useState([]);

  // const pushnoti = true;//false;
  const netconn = true;//false;
  const blconn = true;//false;
  // useEffect(async() =>{


  // })
  // useEffect(() => {
  //   notif = new NotifService(onRegister, onNotif);

  // },[notif])

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

  function sendBtdata(data) {
    axios.post('http://192.168.43.57:5000/saveBTdata',
      {
        userId: "84:10:0D:FA:87:33",
        btdata: data
      }
    )
      .then(function (response) {

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function startDiscovery() {
    try {
      let granted = await requestAccessFineLocationPermission();

      if (!granted) {
        throw new Error(`Access fine location was not granted`);
      }

      // this.setState({ discovering: true });
      setDiscovering(true)

      try {
        RNBluetoothClassic.startDiscovery().then((res) => {
          // console.log(res[0].address)
          var data = []
          if (res.length != 0) {
            res.forEach((item) => {
              var temp
              var d = +new Date
              temp = {
                id: item.address,
                timestamp: d
              }
              data.push(temp)
            })

            // sendBtdata(data)
            console.log(data)
            setbtdata((prevState) => {

              // var temp
              // temp={
              //   id:res.address,
              //   timestamp:'10'
              // }
              // console.log(temp)
              return [...data]
            })
          } else {
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
  function checkB() {
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

  const selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      //Setting the state to show multiple file attributes
      setMultipleFile(results);
      onClickUpdate()
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
function uriToBlob (uri){
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      
      xhr.send(null);
    });
  }

  async function upload(){
    const formData = new FormData();
// formData.append('data', JSON.stringify(data));
    var blb = await uriToBlob(multipleFile[0].uri)
    console.log(blb)

    // const storage = getStorage();
    // const storageRef = ref(storage, 'some-child');
    

    const reference = storage().ref(multipleFile[0].name);
    reference.put(blb).then((res)=>{
          console.log(res);
        });
      }

  function onClickUpdate() {
    // notif.localNotif() 
    var s = status ? " Negative" : " Positive"
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
                b_id: "78:20:0D:F1:82:20",
                cstatus: status
              }
            )
              .then(function (response) {
                Alert.alert("Your Covid Status has been changed Successfully")
                toggleModal()
                setPushnoti(true)
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
          // onPress: () => Alert.alert("Cancel Pressed"),
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
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
    <View style={{ flex: 1 }}>
      {/* <Button title="Show modal" onPress={toggleModal} /> */}

      <Modal 
      isVisible={isModalVisible}
      onBackButtonPress={()=>{
      toggleModal()

      }}
      >
        <View style={{ height:hp(50) , backgroundColor:'white',padding:wp(5)}}>
          {/* <Text>Hello!</Text> */}
          <Text
                style={{...material.headline}}
                >
                    Update Your covid Status
          </Text>

          <Text
                style={{...material.subheading,marginTop:hp(2)}}
                >
                    Upload your covid test report
                </Text>
          <Button title="Upload" onPress={()=>{selectMultipleFile()}} />
        </View>
      </Modal>
    </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        //  contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: AppColor.backgroundBlue }}
      >


        <Toolbar />
        <SafeAreaView
          style={styles.container}
        >
           {pushnoti ? 
            <View
              style={[styles.statusView, { backgroundColor: AppColor.BackgroundRed, borderRadius: 10 }]}
            >
              <Text
                style={[material.title, { color: AppColor.textRed, marginBottom: hp(1) }]}
              // {fontSize:20,marginBottom:hp(0.5)}}
              >
                Close Contact Alert !!
              </Text>
              <Text
                style={[material.caption, { textAlign: 'center' }]}
              // { fontSize: 12, textAlign: 'center' }}
              >
                A person who was in your contact recently, has updated their covid status as positive. So, If you feel some symptoms take necessary precautions.
              </Text>
            </View>
             : 
            <View
              style={[styles.statusView, { backgroundColor: AppColor.BackgroundGreen, borderRadius: 10 }]}
            >
              <Text
                style={[material.title, { color: AppColor.textGreen, marginBottom: hp(1) }]}
              // {fontSize:20,marginBottom:hp(0.5)}}
              >
                You Are Safe !
              </Text>
              <Text
                style={[material.body1, { textAlign: 'center' }]}
              // { fontSize: 12, textAlign: 'center' }}
              >
                All persons who were in your contacts recently are covid free.
              </Text>
            </View> 
}
          
          <View
            style={[styles.statusView, { backgroundColor: AppColor.cardBlue, borderRadius: 10 }]}
          >
            <Text
              style={[material.title, { marginBottom: hp(1) }]}
            // {fontSize:20,marginBottom:hp(1)}}
            >
              Contact Tracing: <Text style={material.subheading}>Active</Text>
            </Text>
            <Text
              style={[material.body2, { marginBottom: hp(1) }]
                // {fontSize:14,marginBottom:hp(1)}
              }
            >
              Internet: <Text style={material.body1}>{netconn ? "Connected " : "Not Connected "}</Text>
              <View style={netconn ? styles.circleG : styles.circleR} />
            </Text>
            <Text
              style={material.body2}
            // {fontSize:14,marginBottom:hp(1)}}
            >
              Bluetooth: <Text style={material.body1}>{blconn ? "ON " : "OFF "}</Text>
              <View style={blconn ? styles.circleG : styles.circleR} />
            </Text>
          </View>


          <View
            style={[styles.statusView, { backgroundColor: AppColor.cardBlue, borderRadius: 10 }]}
          >
            <Text
              style={[material.title, { marginBottom: hp(1) }]}
            // {fontSize:20,marginBottom:hp(1)}}
            >
              Your Status: {status ? <Text style={[material.subheading,{color:AppColor.textRed}]}>Positive</Text> : <Text style={material.subheading}>Negative</Text> }
            </Text>
            {/* <View style={{borderRadius:30}}> */}
            {/* <Button
              onPress={() => {
                onClickUpdate()
              }}
              title="Update Status"
              style={styles.button}
              // style= {[{borderRadius:30}]}
              color={AppColor.namePink}
            /> */}
              <Pressable 
                onPress={()=>{
                  
                  // onClickUpdate()
                  toggleModal()
                }}
                style={styles.button}                
                >
                  <Text
                  style={{...material.subheading,fontWeight:'bold',color:"white"}}
                  >Update Status</Text>
                </Pressable>
            {/* </View> */}
          </View>

          {/* <View
            style={styles.guideView}
          > */}
          <View
          style={styles.guideView}
          >
          <ImageBackground
          
            style={styles.bottomImage}
            source={require('../Assets/plus.png')}
            >
           </ImageBackground>

                <View
                // style={{opacity:1}}

                >
                  {/* <Image
            style={styles.bottomImage}
            source={require('../Assets/plus.png')}
            /> */}
                <Text
                    style={[material.title, { textAlign: 'center', marginBottom: hp(0.5) }]}
                  // { fontSize: 20, marginBottom: hp(0.5) }}
                  >
                    Precautions
                  </Text>

                  <Text
                    style={[material.body1, {}]}
                  // { fontSize: 12 }}
                  >
                    {`\u2022  `}
                    Maintain a safe distance from others (at least 1 m), even if they don’t appear to be sick.
                    {`\n\u2022  `}
                    Wear a mask in public, especially indoors or when physical distancing is not possible.
                    {`\n\u2022`}
                    Choose open, well-ventilated spaces over closed ones. Open a window, if indoors.
                    {`\n\u2022  `}
                    Clean your hands often. Use soap and water, or an alcohol-based hand rub.
                    {`\n\u2022  `}
                    Get vaccinated when it’s your turn. Follow local guidance about vaccination.
                    {`\n\u2022  `}
                    Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.
                    {`\n\u2022  `}
                    Stay home if you feel unwell.

                  </Text>
                </View>
       

         
          
        

          </View>
          
         
          {/* </View> */}
          {/* <PushController/> */}
        </SafeAreaView>
      </ScrollView>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(4)

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
  statusView: {
    height: hp("15%"),
    backgroundColor: '#D2D2D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2)
  },
  alertView: {
    height: hp("15%"),
    backgroundColor: '#D2D2D2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    marginBottom: hp(2)

  },
  guideView: {
    // height: hp("40%"),
    // backgroundColor: '#D2D2D2',
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: wp(2)
  },
  circleR: {
    width: 11,
    height: 11,
    borderRadius: 11 / 2,
    backgroundColor: AppColor.textRed,
  },
  circleG: {
    width: 11,
    height: 11,
    borderRadius: 11 / 2,
    backgroundColor: AppColor.textGreen,
  },
  button:{
    backgroundColor:AppColor.ButtonPink,
    alignItems:'center',
    alignSelf:'center',
      width: wp(40),
      padding:wp(2),
      borderRadius:25,
      elevation: 5,

  },
  bottomImage:{
    // width:wp(70),
  //  //  height:hp(20),
  //  position: 'absolute',
  //  top:0,
  // //  bottom: 0,
  //  right: 0,
  //  resizeMode: 'contain',
  //  opacity:0.4,
  //  aspectRatio: 1, // Your aspect ratio
 
   // left: 0,
  },
  bottomImage:{
    width:wp(70),
   //  height:hp(20),
   position: 'absolute',
  //  alignSelf: 'flex-start',
  //  alignSelf: 'flex-end',
   top:hp(5),
  //  bottom: 0,
  // alignSelf:'center',
  left:wp(10),
   right: 0,
  // zIndex:-1,
   resizeMode: 'contain',
   opacity:0.15,
   aspectRatio: 1, // Your aspect ratio
 
   // left: 0,
  },
  // button:{
  //   marginTop:10
  // }
});

export default Home;
