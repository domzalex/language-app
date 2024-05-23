import React, { useState, useEffect, useContext } from 'react'
import { TouchableOpacity, ImageBackground, View, ScrollView, Text, Button, StyleSheet, Image, Pressable } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import TranslateText from './TranslateText'
import LanguageLevels from './LanguageLevels'

import { AuthContext } from './context/AuthContext'

const PersonalProfile = () => {

    const defaultImage = require('./assets/img/defaultProfilePicture.jpg')

    const {logout, userInfo, updateUserInfo } = useContext(AuthContext)

    const [profilePicture, setProfilePicture] = useState(null)

    useEffect(() => {
        // console.log(userInfo)
        const getProfilePicture = async () => {
            try {
                const response = await fetch(`http://localhost:3000/profilePictures/${userInfo.profilePicture}`)
                const imgBlob = await response.blob()
                const profilePicUrl = URL.createObjectURL(imgBlob)
                setProfilePicture(profilePicUrl)
            } catch (error) {
                console.error("Error fetching profile picture: ", error)
            }
        }
        getProfilePicture()
    }, [userInfo.profilePicture])


    const enableProfileEdit = async () => {
        console.log(userInfo.id)
        try {
            const res = await fetch('http://10.0.0.124:3000/enable_profile_edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo)
            })

            const resJSON = await res.json()

            if (!res.ok) {
                throw new Error('Failed to submit user data.')
            } else {
                updateUserInfo(resJSON.user)
            }

        } catch (error) {
            console.error('Error submitting data: ', error.message)
            return { error: error.message }
        }
    }


    const [scrollY, setScrollY] = useState(0)

    let opacity = scrollY
    const handleScroll = (e) => {
        if (e.nativeEvent.contentOffset.y < 0) {
            setScrollY(0)
        }
        else if (e.nativeEvent.contentOffset.y > 100) {
            setScrollY(1)
        } else setScrollY(e.nativeEvent.contentOffset.y * 0.02)
    }

    const [translatedText, setTranslatedText] = useState('')
    const [loading, setLoading] = useState(false)
    const [isTranslated, setIsTranslated] = useState(false)
    const [showTranslation, setShowTranslation] = useState(false)

    return (
        <ScrollView style={styles.container} onScroll={handleScroll} scrollEventThrottle={16} stickyHeaderIndices={[0]}>
            <View style={{height: 85, backgroundColor: '#fff', opacity: opacity, justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row'}}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16, paddingBottom: 10}}>{userInfo.name !== null ? userInfo.name : userInfo.username}</Text>
            </View>
            <View style={styles.header}>
                {profilePicture
                    ? <Image source={{ uri: profilePicture }} style={{ width: 100, height: 100, borderRadius: 100 }} />
                    : <Image source={defaultImage} style={{ width: 100, height: 100, borderRadius: 100 }} />
                } 
                <View style={{gap: 6, flex: 1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>{userInfo.name !== null ? userInfo.name : userInfo.username}</Text>
                        <View style={{flexDirection: 'row', backgroundColor: '#0080FF', borderRadius: 7, width: 36, height: 16, justifyContent: 'center', alignItems: 'center'}}>
                            <Svg width="14" height="14" viewBox="0 0 24 24">
                                <Path
                                    d="M12.6066 10.8388C10.654 8.88621 7.48813 8.88621 5.53551 10.8388C3.58289 12.7915 3.58289 15.9573 5.53551 17.9099C7.48813 19.8625 10.654 19.8625 12.6066 17.9099C14.5592 15.9573 14.5592 12.7915 12.6066 10.8388ZM12.6066 10.8388L15.435 8.01041L17.9099 5.53553M17.9099 5.53553V10.4853M17.9099 5.53553H12.9601"
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth="2"
                                />
                            </Svg>
                            <Text style={{color: '#fff', fontSize: 12}}>27</Text>
                        </View>
                        <TouchableOpacity style={{marginLeft: 'auto'}} onPress={enableProfileEdit}>
                            <Text style={{color: 'red'}}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                    <LanguageLevels nativeLanguage={userInfo.nativeLanguage} learningLanguage={userInfo.learningLanguage} langProf={userInfo.langProf} scale={1} />

                    <View>
                        <Text style={{color: '#00000075'}}>@{userInfo.username}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.subContainer}>
                <Text style={{fontWeight: 'bold'}}>Self-introduction</Text>
                <Text>
                    {userInfo.bio !== null ? userInfo.bio : 'You have not entered an introduction yet.'}
                </Text>
                {(isTranslated && showTranslation) ? (
                <View style={{borderTopWidth: 1, borderTopColor: '#00000008', paddingTop: 16}}>
                    <Text>
                        {translatedText}
                    </Text>
                    <Pressable onPress={() => setShowTranslation(!showTranslation)}>
                        <Text style={styles.showHideTranslation}>Hide translation</Text>
                    </Pressable>
                </View>
                ) : (
                    <View>
                        {translatedText !== '' ? (
                            <Pressable onPress={() => setShowTranslation(!showTranslation)}>
                                <Text style={styles.showHideTranslation}>Show translation</Text>
                            </Pressable>
                        ) : (
                            <View></View>
                        )}
                    </View>
                )}
                {/* <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TranslateText text={bio} isTranslated={isTranslated} setIsTranslated={setIsTranslated} setShowTranslation={setShowTranslation} setTranslatedText={setTranslatedText}/>
                </View> */}
            </View>
            <View style={styles.subContainer}>
                <Text style={{fontWeight: 'bold'}}>Country</Text>
                <View style={styles.tags}>
                    <View style={styles.tagContainer}>
                        <Text>{userInfo.country}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.subContainer}>
                <Text style={{fontWeight: 'bold'}}>Interests & Hobbies</Text>
                <View style={styles.tags}>
                    {JSON.parse(userInfo.hobbies).map((p, index) => (
                        <View key={index} style={styles.tagContainer}>
                            <Text>{p}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.subContainer}>
                <Text style={{fontWeight: 'bold'}}>Places I want to go</Text>
                <View style={styles.tags}>
                    {JSON.parse(userInfo.places).map((p, index) => (
                        <View key={index} style={styles.tagContainer}>
                            <Text>{p}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={{backgroundColor: '#fff', paddingVertical: 16}}>
                <Button onPress={() => {logout()}} title="Logout" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        minHeight: '90%',
        backgroundColor: '#0080FF'
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

export default PersonalProfile