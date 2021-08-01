import React, { useEffect } from 'react'
import PushNotification from 'react-native-push-notification'
const PushController = () => {
  useEffect(() => {
      console.log("hello")
    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
          console.log('TOKEN:', token)
        },
        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
          console.log('REMOTE NOTIFICATION ==>', notification)
        // process the notification here
        },
        // Android only: GCM or FCM Sensder ID
        senderID: '929361253391',
        popInitialNotification: true,
        requestPermissions: Platform.OS === 'ios',
      })
  }, [])
return null
}
export default PushController