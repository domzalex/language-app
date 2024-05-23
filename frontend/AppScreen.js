import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import CompleteProfile from './CompleteProfile'
import DirectMessage from './DirectMessage'

import AppCoreNav from './AppCoreNav'

import { AuthContext } from './context/AuthContext'

const AppScreen = () => {

    const Tab = createBottomTabNavigator()
    const Stack = createStackNavigator()

    const { userInfo, updateUserInfo, logout } = useContext(AuthContext)

    // logout()

    // console.log("App screen: ", userInfo)

    if (!userInfo) {
        return (
            <View><Text>WAITING</Text></View>
        )
    } else {
        return (
            <>
            {userInfo.isCompleted !== 1 ? (
                <CompleteProfile userInfo={userInfo} updateUserInfo={updateUserInfo}/>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="AppCore" component={AppCoreNav} options={{ headerShown: false }} />
                    <Stack.Screen name="DirectMessage" component={DirectMessage} options={{ headerShown: false }} />
                </Stack.Navigator>
            )}
        </>
        )
    }
}

export default AppScreen