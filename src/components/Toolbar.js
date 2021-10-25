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
import Icon from 'react-native-vector-icons/Entypo';
import { material } from 'react-native-typography'
import AppColor from '../Assets/AppColor';
import Modal from "react-native-modal";

const Toolbar = () => {
  
  const [isModalVisible2, setModalVisible2] = useState(false);
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  return (
    <View
    style={[styles.container,{backgroundColor:AppColor.cardBlue}]}
    >
      <View style={{ position: 'absolute'}}>
        <Modal
          isVisible={isModalVisible2}
          onBackButtonPress={() => {
            toggleModal2()

          }}
        >
          <View style={{ height: hp(65), backgroundColor: AppColor.cardBlue, padding: wp(5), borderRadius: 15 }}>
            <View style={{ position: 'absolute', right: 0, top: 0 }}>
              <Icon.Button name='cross'
                iconStyle={{ marginRight: 0 }}
                backgroundColor='transparent'
                underlayColor='transparent'
                size={40}
                color={'#25B7D3'}
                onPress={() => {
                  toggleModal2()
                }}
              // style={styles.button}                
              >
              </Icon.Button>
            </View>
            <Text
              style={{ ...material.headline, marginTop: hp(3) }}
            >
              About
            </Text>

            <Text
              style={{ ...material.subheading, marginTop: hp(2), textAlign: "justify" }}
            >
              BlockTrace is a contact tracing application which uses Blockchain Technology.
              It is a Decentralized Application or D-App implemented using Ethereum Smart Contracts.{'\n'}{'\n'}
              Users can register on this app, then it starts identifying contacts using device's bluetooth. If any other user comes in range of bluetooth, then it stores his ID in contacts list. Contacts list will contain last 14 days of contacts of a user.
              When any user updates his/her covid status to positive, then the app will notify all users in his/her contacts list.{'\n'}{'\n'}
            </Text>

          </View>
        </Modal>
      </View>
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
        <View style={{ position: 'absolute', right: 0, top: 7 }}>
            <Icon.Button name='info-with-circle'
              backgroundColor='transparent'
              underlayColor='transparent'
              size={40}
              color={'#25B7D3'}
              onPress={() => {
                toggleModal2()
              }}
            // style={styles.button}                
            >
            </Icon.Button>
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
