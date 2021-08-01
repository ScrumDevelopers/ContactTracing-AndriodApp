/**
 * @format
 */

//  import firebase from '@react-native-firebase/app';
//  var credentials = {
//     apiKey: "AIzaSyAgejVhRN8n9kckpdZH8RB0RS-SxdYqXuQ",
//     authDomain: "contact-tracing-app-a95c2.firebaseapp.com",
//     projectId: "contact-tracing-app-a95c2",
//     storageBucket: "contact-tracing-app-a95c2.appspot.com",
//     messagingSenderId: "929361253391",
//     appId: "1:929361253391:web:532a1ce8ec71615f8aff7a",
//     measurementId: "G-SJZ4P82H6R"
//   };
 
// firebase.initializeApp(credentials);

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
