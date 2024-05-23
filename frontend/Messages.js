import React, {useState, useEffect, useContext } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Svg, { Path } from 'react-native-svg' 
import TranslateText from './TranslateText'
import MessageThreadContainer from './MessageThreadContainer'
import { AuthContext } from './context/AuthContext'

const Messages = () => {

    const [translatedText, setTranslatedText] = useState('')
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState(null)

    const { userMessages, userInfo } = useContext(AuthContext)

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/getUsers')
                const resJSON = await response.json()
    
                setUsers(resJSON.users)
            } catch (error) {
                console.error("Cannot get users: ", error.message)
            }
        }
        getAllUsers()
    }, [])

    const messageThreads = {}

    if (userMessages) {
        userMessages.forEach(message => {
            const senderID = message.sender_id
            if (senderID !== userInfo.id) {
                if (!messageThreads[senderID]) {
                    messageThreads[senderID] = []
                }
                messageThreads[senderID].push(message)
            }
        })
        // console.log(Object.entries(messageThreads)[0][1])
        Object.entries(messageThreads)[0][1].forEach(m => {
            console.log(m.message_text)
        })
    }



    const translateText = async (textToTranslate, targetLanguage) => {
        try {

            setLoading(true)

            const res = await fetch('http://10.0.0.124:3000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ textToTranslate, targetLanguage })
            })
            const translated = await res.json()
            setTranslatedText(translated)
        } catch (error) {
            console.error('Error: ', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View>

            <ScrollView style={styles.header}>
                {/* <Svg style={styles.add} width="24" height="24" viewBox="0 0 24 24">
                    <Path
                        d="M8 12H16M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        fill="none"
                        stroke="#000"
                        strokeWidth="2"
                    />
                </Svg> */}
                <Text style={styles.title}>Messages</Text>
            </ScrollView>
            
            <ScrollView style={styles.container}>
                {(userMessages !== undefined && userMessages !== null) ? (
                    <View>
                        {Object.entries(messageThreads)[0][1].map(m => (
                            <Text style={{height: 100, backgroundColor: 'red'}}>{m.message_text}</Text>
                        ))}
                    </View>
                ) : (
                    <View style={{padding: 32}}>
                        <Text style={{textAlign: 'center', opacity: 0.25}}>Nothing to see here...</Text>
                    </View>
                )}
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

export default Messages