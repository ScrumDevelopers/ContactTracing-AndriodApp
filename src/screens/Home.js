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
// import PushController from '../PushController';
import PushNotification, {Importance} from 'react-native-push-notification';
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

    // useEffect(() => {

    //   console.log("hello")

    //   PushNotification.configure({
    //     // (optional) Called when Token is generated (iOS and Android)
    //     onRegister: function(token) {
    //       console.log('TOKEN:', token)
    //     },
    //     // (required) Called when a remote or local notification is opened or received
    //     onNotification: function(notification) {
    //       console.log('REMOTE NOTIFICATION ==>', notification)
    //     // process the notification here
    //     },
    //     // Android only: GCM or FCM Sensder ID
    //     senderID: '929361253391',
    //     popInitialNotification: true,
    //     requestPermissions: Platform.OS === 'ios',
    //   })
    // })



  return (
    <SafeAreaView>
          <Text>
            Home
          </Text>
            <Button
                onPress={()=>{
                  
                  console.log("notfiy press")
                  // notif.localNotif()
                }}
                title="Notification Check"
                style={styles.button}
                color="grey"
                />
       {/* <PushController/> */}

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
});

export default Home;
