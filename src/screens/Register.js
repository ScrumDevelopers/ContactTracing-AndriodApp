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
  Image
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { material } from 'react-native-typography'
const axios = require('axios');
import {Picker} from '@react-native-picker/picker';


const Register = ({navigation}) => {
    const [b_id,setbid]=useState("84:10:0D:FA:87:33")
    const [cstatus,setcstatus]=useState(false)
    // const [selectedLanguage, setSelectedLanguage] = useState();
    function onClickSubmit (){
        // console.log(b_id,cstatus)
        // {
        //     "b_id":"12345678",
        //     "cstatus":"true"
        // }
        // axios.post('http://192.168.43.57:5000/Register', {
        //     b_id,
        //     cstatus
        //   })
        //   .then(function (response) {
        //     console.log("success")

        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
          
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
navigation.navigate('Home')
    }

  return (
    <ScrollView
    //  style={{flex: 1}}
     contentContainerStyle={{ flexGrow: 1 }}
     >
    <SafeAreaView
    style={styles.container}
    >

    <View
    style={styles.registerView}
    >
        <View style={styles.logoView}>
            <Image
                style={styles.logo}
                source={require('../Assets/appLogo.png')}
                />
            <Text
            style={{fontSize:20}}
            >
                
                Contact Tracing DApp
            </Text>
            </View>

            <View style={styles.inputView}>

                <Text>
                Your device’s bluetooth ID is your username
                </Text>
                <TextInput
                style={styles.textInput}
                onChangeText={setbid}
                value={b_id}
                /> 

                <Text>
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
                

                <Button
                onPress={()=>{onClickSubmit()}}
                title="Submit"
                style={styles.button}
                color="grey"
                /> 
                
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  container:{
        flex:1
    },
  registerView:{
    flex:1,
    //   backgroundColor:'red',
      justifyContent: 'center'  
    },
  textInput:{
      width:'100%',
      borderWidth:0.2,
      marginBottom:10,
      paddingHorizontal:10
  },
  inputView:{
      paddingHorizontal:'3%',
    //   backgroundColor:'red'
  },
  logo:{
      width:150,
      height:150,
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
      width: 40,
      marginBottom:40
  },
  pickerView:{
    width:'100%',
    borderWidth:0.2,
    marginBottom:10,
  }

});

export default Register;
