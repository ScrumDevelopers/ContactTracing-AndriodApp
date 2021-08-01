import React,{useContext, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'
import Register from './screens/Register'
const Routes = ()=> {
    const Homenavigator = createStackNavigator();
    var user = false
    // const HNavigator = ()=>(
    //     // <CartProvider>
    
    //         <Homenavigator.Navigator
    //             screenOptions={{
    //                 headerShown: false,
    //                 // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    //                 }}
    //             >
    //                 <Homenavigator.Screen
    //                 name="Home"
    //                 component={Home}
    //                 />
                    
    //         </Homenavigator.Navigator>    
    // )
    const authNavigator = createStackNavigator();
    const AuthStack = () =>{
    return(
        <authNavigator.Navigator initialRouteName='Register' 
        screenOptions={{
        headerShown: false
         }}
        >
        <authNavigator.Screen
        name="Register"
        component={Register}
        />

        <Homenavigator.Screen
                    name="Home"
                    component={Home}
                    />
    </authNavigator.Navigator>
            )
    }
    return (
  
      <NavigationContainer>
          {
              
              <AuthStack/>

          }

      </NavigationContainer>
  
      
    );
  };
  
  
  export default Routes;