import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import PostContainer from './PostContainer'

const Posts = () => {

    const [translatedText, setTranslatedText] = useState('')
    const [loading, setLoading] = useState(false)
    const [isTranslated, setIsTranslated] = useState(false)
    const [showTranslation, setShowTranslation] = useState(false)

    // const translateText = async (textToTranslate, targetLanguage) => {
    //     try {

    //         setLoading(true)

    //         const res = await fetch('http://10.0.0.124:3000/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ textToTranslate, targetLanguage })
    //         })
    //         const translated = await res.json()
    //         setTranslatedText(translated)
    //     } catch (error) {
    //         console.error('Error: ', error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    return (
        <View>
            <ScrollView style={styles.header}>
                <Svg style={styles.add} width="24" height="24" viewBox="0 0 24 24">
                    <Path
                        d="M8 12H16M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        fill="none"
                        stroke="#000"
                        strokeWidth="2"
                    />
                </Svg>
                <Text style={styles.title}>Recent Posts</Text>
            </ScrollView>
            <ScrollView style={styles.container}>
                <PostContainer />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        overflow: 'scroll'
    },
    header: {
        display: 'flex',
        backgroundColor: 'black',
        paddingTop: 72,
        paddingBottom: 24,
        backgroundColor: '#fff',
        borderBottomColor: "#00000008",
        borderBottomWidth: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    add: {
        position: 'absolute',
        right: 12
    }
})

export default Posts