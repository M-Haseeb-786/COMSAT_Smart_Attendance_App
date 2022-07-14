import * as React from 'react';
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Details from './components/Details';
import Onboard from './components/Onboard';
import Login from './components/Login';
import RegisterationCard from './components/RegisterationCard';
import EditProfile from './components/EditProfile';
import Marks from './components/Marks';
import Attendance from './components/Attendance';

import { useState } from 'react';


//We can import the component above and add it in stack or we can call the screen in a function below and use it in stack screen
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App()
{
  //const [showOnboard, setShowOnboard] = useState(true);

  /* const handleOnboardFinish = () =>{
    setShowOnboard(false);  
  } */

  return(
    

    <NavigationContainer>
      {/*<View><Text>Hello</Text></View>*/}
    <Stack.Navigator>
    {<Stack.Screen 
        name="Onboard" 
        component={Onboard} 
        options= {{
        headerShown: false
        }}/> 
        }

     
        <Stack.Screen 
        name="Login" 
        component={Login} 
        options= {{
        headerShown: false
        }}/>
        <Stack.Screen 
        name="Home" 
        component={Home} 
        options= {{
        headerShown: false
        }}/>
        <Stack.Screen name="Details" component={Details} options= {{
        headerShown: false
        }}/>
        
        <Stack.Screen name="Attendance" component={Attendance} options= {{
        headerShown: false
        }}/>
        <Stack.Screen name="Marks" component={Marks} options= {{
        headerShown: false
        }}/>
        <Stack.Screen name="RegisterationCard" component={RegisterationCard} options= {{
        headerShown: false
        }}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options= {{
        headerShown: false
        }}/>
        
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
     /* How to set the onboard screen???
    <>
    {showOnboard && <Onboard handleDone = {handleOnboardFinish} />}
    {!showOnboard &&  <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
        name="Onboard" 
        component={Onboard} 
        options= {{
        headerShown: false
        }}/> 

        <Stack.Screen 
        name="Home" 
        component={Home} 
        options= {{
        headerShown: false
        }}/>
        <Stack.Screen name="Details" component={Details} options= {{
        headerShown: false
        }}/>     
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>}
    </>
    */ 
   
  );
}