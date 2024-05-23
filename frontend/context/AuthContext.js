import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [userMessages, setUserMessages] = useState(null)

    const clearCache = async () => {
        try {
            await SecureStore.deleteItemAsync('userToken')
            await SecureStore.deleteItemAsync('userData')
            setUserToken(null)
            setUserInfo(null)
        } catch {}
    }

    const login = async (token, userInfo, userMessages) => {
        try {
            setIsLoading(true)
            setUserToken(token)
            await SecureStore.setItemAsync('userToken', token)
            await SecureStore.setItemAsync('userData', JSON.stringify(userInfo))
            setIsLoading(false)
            setUserMessages(userMessages)
            setUserInfo(userInfo)
        } catch (e) {
            console.log('Error logging in: ', e)
        }
    }

    const logout = async () => {
        try {
            setIsLoading(true)
            setUserToken(null)
            setUserInfo(null)
            await SecureStore.deleteItemAsync('userToken')
            await SecureStore.deleteItemAsync('userData')
            setIsLoading(false)
        } catch (e) {
            console.log('Error logging out: ', e)
        }
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            const tok = await SecureStore.getItemAsync('userToken')
            const userDataString = await SecureStore.getItemAsync('userData')
            const userData = JSON.parse(userDataString)
            setUserToken(tok)
            setUserInfo(userData)
            setIsLoading(false)
        } catch (e) {
            console.log('Error checking login: ', e)
        }
    }

    const updateUserInfo = async (userData) => {
        try {
            setIsLoading(true)
            setUserInfo(userData)
            await SecureStore.setItemAsync('userData', JSON.stringify(userData))
            setIsLoading(false)
        } catch (e) {
            console.log('Error updating userData in auth: ', e)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo, userMessages, clearCache, updateUserInfo}}>
            {children}
        </AuthContext.Provider>
    )
}