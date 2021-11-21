import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DoctorMain from './src/screens/doctor/Main';
import UserMain from './src/screens/user/Main';
import Login from './src/screens/Login';
import SingleInfo from './src/screens/user/SingleInfo';
import InfoCategory from './src/screens/user/InfoCategory';

const AppStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <AppStack.Screen name="login" component={Login} />
        <AppStack.Screen name="usMain" component={UserMain} />
        <AppStack.Screen name="docMain" component={DoctorMain} />
        <AppStack.Screen name="singleInfo" component={SingleInfo} />
        <AppStack.Screen name="infoCategory" component={InfoCategory} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default App;
