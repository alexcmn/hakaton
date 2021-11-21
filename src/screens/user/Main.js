import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from '../../components/TabBar/index';

import HomeScreen from './Home/index'
import InfoScreen from './Info/index2';
import ContactScreen from './Contact/index';

const TabStack = createBottomTabNavigator();

export default function UserMain({ navigation }) {
    return (
        <TabStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBar={props => <TabBar {...props} navigateTo={navigation} />}
        >
            <TabStack.Screen
                name="home"
                component={HomeScreen}
            />
            <TabStack.Screen
                name="info"
                component={InfoScreen}
            />
            <TabStack.Screen
                name="contact"
                component={ContactScreen}
            />
        </TabStack.Navigator>
    )
}
