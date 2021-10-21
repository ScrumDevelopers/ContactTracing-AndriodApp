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
import AppColor from '../Assets/AppColor';

const Toolbar = () => {
  
  return (
    <View
    style={[styles.container,{backgroundColor:AppColor.cardBlue}]}
    >
        {/* <Text
        style={{...material.subheading}}
        >
            BlockTrace
        </Text> */}
        <View
        style={styles.headingView}
        >
        <Text
                style={{...material.headline,fontWeight:'bold',color:AppColor.nameViolet}}
                >
                    
                    Block 
                </Text>

                <Text
                style={{...material.headline,color:AppColor.namePink}}
                >
                    
                Tracer
                </Text>

        </View>
              
        {/* <Icon.Button
              name={"user-circle-o"}
              size={30}
              color={'grey'}
            //   iconStyle={styles.iconStyle}
              onPress={()=>{
                  console.log("hello")
              }}
              backgroundColor={'transparent'}
              underlayColor="transparent" 
              /> */}
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
},
headingView:{
  flexDirection:'row',
  marginHorizontal:wp(3)
}
});

export default Toolbar;
