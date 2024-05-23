import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const NavigationBar = () => {

    // Allows for navigation between pages without having them
    // conditionally rendered from the main App.js file
    const navigation = useNavigation()

    // Main navigation goTo functions hard-coded
    // since only 4 are needed right now
    const goToProfile = () => {
        navigation.navigate('Profile')
    }
    const goToMessages = () => {
        navigation.navigate('Messages')
    }
    const goToPosts = () => {
        navigation.navigate('Posts')
    }
    const goToConnect = () => {
        navigation.navigate('Connect')
    }

    return (
        // Nested View components in place of SVG icons down the line
        // Will need to install 'react-native-svg' (?)
        <View>
            <Pressable onPress={goToMessages}>
                <View></View> 
                <Text>Messages</Text>
            </Pressable>
            <Pressable onPress={goToPosts}>
                <View></View>
                <Text>Posts</Text>
            </Pressable>
            <Pressable onPress={goToConnect}>
                <View></View>
                <Text>Connect</Text>
            </Pressable>
            <Pressable onPress={goToProfile}>
                <View></View>
                <Text>Profile</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 32,
        height: 100,
        backgroundColor: '#f0f0f0',
        borderTopWidth: 1,
        borderTopColor: '#ddd',

    },
    button: {
        width: '25%',
        display: 'flex',
        gap: 6,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    buttonText: {
        fontSize: 12,
        color: '#007AFF',
    },
    icon: {
        width: 32,
        height: 32,
        borderRadius: 32,
        backgroundColor: '#27272727'
    }
})

export default NavigationBar