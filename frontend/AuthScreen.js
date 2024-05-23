import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './Login'
import Register from './Register'

const AuthScreen = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{headerShown:false}}
                name="Login"
                component={Login}
            />
            <Stack.Screen
                options={{headerShown:false}}
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    )
}

export default AuthScreen