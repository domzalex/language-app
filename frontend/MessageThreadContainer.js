import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native' 

const MessageThreadContainer = () => {
    return (
        // Come back once I am getting information from a DB
        <View style={styles.messageContainer}>
            <Image source={require('./assets/img/profilePicture.jpg')} style={{ width: 65, height: 65, borderRadius: 65 }} />
            <View style={{display: 'flex', gap: 12, flex: 1}}>
                <View style={styles.nameDate}>
                    <Text style={styles.name}>Yamato</Text>
                    <Text style={styles.date}>04/02</Text>
                </View>
                <Text style={styles.messagePreview} numberOfLines={1}>Hey! I am going to be in Tokyo next month and I would love to get together!</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#00000008'
    },
    nameDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#353535'
    },
    date: {
        color: '#00000050',
    },
    messagePreview: {
        color: '#00000085'
    }
})

export default MessageThreadContainer