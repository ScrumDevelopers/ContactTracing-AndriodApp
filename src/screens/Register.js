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
  TextInput,
  ToastAndroid as Toast,
  Image,
  ActivityIndicator,
  Pressable
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { material } from 'react-native-typography'
const axios = require('axios');
import {Picker} from '@react-native-picker/picker';
import AppColor from '../Assets/AppColor'

const Register = ({navigation}) => {
    const [b_id,setbid]=useState("78:20:0D:F1:82:20")
    const [cstatus,setcstatus]=useState(false)
    const [isLoading,setIsloading]=useState(false)
    // const [selectedLanguage, setSelectedLanguage] = useState();
    function onClickSubmit (){
        console.log(b_id,cstatus)
        setIsloading(true)
        // {
        //     "b_id":"12345678",
        //     "cstatus":"true"
        // }
        axios.post('http://192.168.43.57:5000/Register', {
            b_id,
            cstatus
          })
          .then(function (response) {
            setIsloading(false)
            console.log("success")
            navigation.navigate('Home')

            // console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          
        //   axios.post('https://reqres.in/api/users/',{
        //     "name": "morpheus",
        //     "job": "leader"
        // })
        //   .then(function (response) {
        //     console.log("success")

        //     console.log(response.data);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
// console.log(navigation)
    }
function showActivity(){
    return(
     <View style = {styles.overlayLoadingContainer}>
    
         <ActivityIndicator 
                     size={50} color={'yellow'}/>
     </View>
     
      )
    } 

  return (
<>

    <ScrollView
    //  style={{flex: 1}}
     contentContainerStyle={{ flexGrow: 1 }}
     >
    <SafeAreaView
    style={styles.container}
    >
      <Image
                style={styles.topImage}
                source={require('../Assets/blkchn.png')}
                /> 
    {isLoading ?
          showActivity()
          :null}

     
    <View
    style={styles.registerView}
    >
        <View style={styles.logoView}>
            <Image
                style={styles.logo}
                source={require('../Assets/appLogo.png')}
                />

            <View
            style={{
              flexDirection:'row',
              marginTop:hp(1)
            }}
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
            
            </View>

            <View style={styles.inputView}>

                <View
                // style={{}}
                >
                    <Text
                    style={{...material.subheading}}
                    >
                    Bluetooth ID
                    </Text>

                    <TextInput
                    style={styles.textInput}
                    onChangeText={setbid}
                    value={b_id}
                    /> 

                </View>
                

                <Text
                style={{...material.subheading}}                
                >
                Enter Your Covid Status
                </Text>
                {/* <TextInput
                style={styles.textInput}
                onChangeText={setcstatus}
                /> */}
                <View
                style={styles.pickerView}
                // style={styles.textInput}
                >
                    <Picker
                    selectedValue={cstatus}

                    onValueChange={(itemValue, itemIndex) =>
                        setcstatus(itemValue)
                    }>
                    <Picker.Item label="Positive" value={true} />
                    <Picker.Item label="Negative" value={false} />
                    </Picker>

                </View>
                
                <Pressable 
                onPress={()=>{onClickSubmit()}}
                style={styles.button}                
                >
                  <Text
                  style={{...material.subheading,fontWeight:'bold',color:"white"}}
                  >Submit</Text>
                </Pressable>

                {/* <Button
                onPress={()=>{onClickSubmit()}}
                title="Submit"
                style={styles.button}
                color="grey"
                />  */}
                
                {/* <Button
                onPress={()=>{
                  
                  console.log("notfiy press")
                  notif.localNotif()
                }}
                title="Notification Check"
                style={styles.button}
                color="grey"
                /> */}
            </View>

                
              
           
    </View>
    
  
        
    </SafeAreaView>
    <Image
      style={styles.bottomImage}
      source={require('../Assets/p1.png')}
      />
    </ScrollView>
    
      </>
  );
};

const styles = StyleSheet.create({

  container:{
        flex:1,
        backgroundColor:AppColor.backgroundBlue
    },
  registerView:{
    flex:1,
    //   backgroundColor:'red',
      justifyContent: 'center'  
    },
  textInput:{
    backgroundColor:'white',
      width:'100%',
      height:hp(7),
      // borderWidth:0.2,
      marginBottom:10,
      paddingHorizontal:wp(5),
      borderRadius:30
  },
  inputView:{
    // flex:1,
    // flexWrap: "wrap",   
    width:wp(85),
    alignSelf:'center',
      // paddingHorizontal:'3%',
      // alignContent: 'center',
      // justifyContent: 'center'
    //   backgroundColor:'red'
  },
  logo:{
      width:100,
      height:100,
    //   borderRadius:50,
    //   color:'red'
  },
  logoView:{
    //   justifyContent:'center',
    alignItems:'center',
    marginBottom:15
    //   flexDirection:'column'
  },
  button:{
    backgroundColor:AppColor.ButtonPink,
    alignItems:'center',
    alignSelf:'center',
      width: wp(40),
      padding:wp(2),
      marginBottom:40,
      borderRadius:25,
      elevation: 5,

  },
  pickerView:{
    width:'100%',
          height:hp(7),
    justifyContent: 'center',
    // borderWidth:0.2,
    marginBottom:10,
    backgroundColor:'white',
    borderRadius:25
  },
    overlayLoadingContainer:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent:'center',
    alignItems:'center',
    zIndex: 1,
    opacity: 0.4,
    backgroundColor: 'black'
 },
 bottomImage:{
   width:wp(55),
  //  height:hp(20),
  position: 'absolute',
  // top: 0,
  bottom: wp(-6),
  right: 0,
  resizeMode: 'contain',
  // aspectRatio: 1, // Your aspect ratio

  // left: 0,
 },
 topImage:{
  width:wp(30),
  // height:hp(30),

  aspectRatio: 1, // Your aspect ratio
 position: 'absolute',
 top: 0,
 resizeMode: 'contain',
left:0
//  bottom: 0,
//  right: 0,
//  left:wp(-20),
}

});

export default Register;
