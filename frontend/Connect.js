import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, StyleSheet, Image, Pressable, ScrollView } from 'react-native'
import LanguageLevels from './LanguageLevels'
import PersonalProfile from './PersonalProfile'
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from './context/AuthContext'

const Connect = () => {

    const navigation = useNavigation()

    const [users, setUsers] = useState({})

    const { userInfo } = useContext(AuthContext)

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


    const startMessage = (user) => {
        navigation.navigate("DirectMessage", {
            userInfo: userInfo,
            user: user
        })
    }


    return (
        <ScrollView style={styles.container}>
            {Object.values(users).map((user, index) => (
                <View key={index} style={styles.postContainerHeader}>
                    <Image source={{ uri: `http://localhost:3000/profilePictures/${user.profilePicture}` }} style={{ width: 75, height: 75, borderRadius: 40 }} />
                    <View style={{display: 'flex', flex: 1}}>
                        <View style={styles.nameFollow}>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>{user.name}</Text>
                            <Pressable onPress={() => startMessage(user)}>
                                <Text style={{color: 'blue', fontSize: 12}}>Message</Text>
                            </Pressable>
                        </View>
                        <LanguageLevels nativeLanguage={user.nativeLanguage} learningLanguage={user.learningLanguage} langProf={user.langProf} />
                        <Text style={{opacity: 0.4, marginTop: 6}} numberOfLines={2}>{user.bio}</Text>
                    </View>
                </View>
            ))}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 100,
    },
    postContainerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '92%',
        marginLeft: '4%',
        marginVertical: 5,
        gap: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#00000010',
        borderRadius: 10
    },
    nameFollow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textLowOpacity: {
        color: '#00000075'
    },
    text: {
        paddingTop: 12,
        marginTop: 12,
        borderColor: '#00000008',
        borderTopWidth: 1,
    },
})

export default Connect