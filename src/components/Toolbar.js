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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { material } from 'react-native-typography'


const Toolbar = () => {
  
  return (
    <View
    style={styles.container}
    >
        <Text
        style={{...material.subheading}}
        >
            Contact Tracing App
        </Text>

        <Icon.Button
              name={"user-circle-o"}
              size={30}
              color={'grey'}
            //   iconStyle={styles.iconStyle}
              onPress={()=>{
                  console.log("hello")
              }}
              backgroundColor={'transparent'}
              underlayColor="transparent" 
              />
    </View>
  );
};

const styles = StyleSheet.create({
container:{
    // flex:1,
    height:hp('8%'),
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal:wp('1'),
    backgroundColor:'#D2D2D2',
}
});

export default Toolbar;
