import React, { useState, useEffect } from "react"
import { Button, StyleSheet, Text, View } from 'react-native'

const TouchToTranslate = ({ textToTranslate, translateText, translatedText }) => {

    const HandleTranslate = (e) => {
        translateText(textToTranslate, 'ja')
    }

    return (
        <View style={ styles.container }>
            <Text>{textToTranslate}</Text>
            <Text>{translatedText}</Text>
            <Button title="Translate?" onPress={HandleTranslate} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#aaa',
    },
})

export default TouchToTranslate