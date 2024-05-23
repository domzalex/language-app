import React, { useContext, useState } from 'react'
import { TouchableOpacity, ImageBackground, View, ScrollView, Text, Button, StyleSheet, Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker'

import { AuthContext } from './context/AuthContext'

const DirectMessage = ({ route }) => {

    const { userMessages } = useContext(AuthContext)
    let currentMessages = []

    // if (userMessages) {

    // }

    const navigation = useNavigation()

    const { userInfo, user } = route.params

    const [message, setMessage] = useState('')
    const [attachment, setAttachment] = useState(null)

    const sendMessage = async () => {
        if (/\S/.test(message) || attachment !== null) {

            let formData = new FormData()
            // if (!attachment) return

            if (attachment) {
                let filename = attachment.split('/').pop()
                let match = /\.(\w+)$/.exec(filename)
                let type = match ? `image/${match[1]}` : `image`

                formData.append('attachment', { uri: attachment, name: filename, type })
            }

            const messageData = {
                text: message,
                attachment: attachment,
                senderID: userInfo.id,
                recipientID: user.id
            }

            formData.append('messageData', JSON.stringify(messageData))

            try {
                const response = await fetch('http://localhost:3000/sendMessage', {
                    method: 'POST',
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                    body: formData
                })
            } catch (error) {
                console.error("Error sending message FRONT: ", error.message)
            }
        } else {
            console.log("Invalid message")
        }
        
    }

    return (
        <View style={{height: '100%'}}>

            <View style={{height: 100, paddingHorizontal: 16, backgroundColor: '#fff', justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'row'}}>
                <TouchableOpacity style={{paddingBottom: 10}} onPress={() => navigation.goBack()}>
                    <Text style={{fontSize: 16, color: '#0080FF'}}>Back</Text>
                </TouchableOpacity>
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16, paddingBottom: 10}}>{user.name}</Text>
                <TouchableOpacity style={{paddingBottom: 10}}>
                    <Text style={{fontSize: 16, color: '#0080FF'}}>Back</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>

            </ScrollView>

            <View style={{height: 100, width: '100%', padding: 10, backgroundColor: '#fff'}}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    onSubmitEditing={sendMessage}
                    placeholder="Type a message..."
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    subContainer: {
        padding: 16,
        paddingVertical: 36,
        gap: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#00000008'
    },
    tags: {
        gap: 16,
        flexDirection: 'row',
        flexWrap: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 16,
        marginTop: 50,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#00000008'
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center'
    },
    tagContainer: {
        backgroundColor: '#f6f6f6',
        borderRadius: 50,
        height: 30,
        paddingHorizontal: 20,
        flex: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    showHideTranslation: {
        paddingTop: 12,
        color: '#00000050'
    }
})

export default DirectMessage