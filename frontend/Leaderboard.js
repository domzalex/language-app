import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const Leaderboard = () => {
    return (
        <View style={styles.container}>
            <Text>User high scores will be ranked here and/or this will be the 'challenges' page.</Text>
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

export default Leaderboard