import React, { useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import AuthScreen from './AuthScreen'
import AppScreen from './AppScreen'

import { AuthContext } from './context/AuthContext'

const AppNavigator = () => {

    const {isLoading, userToken, userInfo} = useContext(AuthContext)

    return (
        <>
            {isLoading == true ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={'large'} />
                </View>
            ) : (
                <NavigationContainer>
                    {userToken !== null ? <AppScreen userInfo={userInfo}/> : <AuthScreen />}
                </NavigationContainer>
            )}
        </>
    )
}

export default AppNavigator