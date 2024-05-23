import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const UserProfile = () => {
    return (
        <View style={styles.container}>
            <Text>This is the user profile page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default UserProfile