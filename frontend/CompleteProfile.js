import 'react-native-gesture-handler'
import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, Image, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import * as ImagePicker from 'expo-image-picker'
import Svg, { Path } from 'react-native-svg' 
import { Dropdown } from 'react-native-element-dropdown' 
import { Languages } from './Languages'

import { AuthContext } from './context/AuthContext'
import { Countries } from './Countries'

const CompleteProfile = ({ userInfo, updateUserInfo }) => {

    const defaultImage = require('./assets/img/defaultProfilePicture.jpg')

    const { clearCache } = useContext(AuthContext)

    const [focusedElement, setFocusedElement] = useState(null)
    const [hobbies, setHobbies] = useState([])
    const [hobby, setHobby] = useState(null)
    const [places, setPlaces] = useState([])
    const [place, setPlace] = useState(null)
    const [langProf, setLangProf] = useState([0])
    const [name, setName] = useState(userInfo.name)
    const [country, setCountry] = useState(userInfo.country)
    const [bio, setBio] = useState(userInfo.bio)
    const [lang, setLang] = useState(null)
    const [userID, setUserID] = useState(userInfo.id)
    const [image, setImage] = useState(null)
    const [value, setLabelValue] = useState(null)
    const [isFocus, setIsFocus] = useState(false)

    const [scrollEnabled, setScrollEnabled] = useState(true)

    enableScroll = () => setScrollEnabled(true)
    disableScroll = () => setScrollEnabled(false)

    useEffect(() => {
        const setExistingValues = async () => {
            try {
                //Set profile picture
                if (userInfo.profilePicture !== null) {
                    const response = await fetch(`http://localhost:3000/profilePictures/${userInfo.profilePicture}`)
                    const imgBlob = await response.blob()
                    const profilePicUrl = URL.createObjectURL(imgBlob)
                    setImage(profilePicUrl)
                }

                //Set rest of values
                setValue('name', name)
                setValue('country', userInfo.country)
                setValue('bio', bio)
                setValue('learningLanguage', userInfo.learningLanguage)
                setValue('langProf', userInfo.langProf)
                if (userInfo.hobbies !== null) {
                    setHobbies(JSON.parse(userInfo.hobbies))
                    setValue('hobbies', hobbies)
                }
                if (userInfo.places !== null) {
                    setPlaces(JSON.parse(userInfo.places))
                    setValue('places', places)
                }
            } catch (error) {
                console.error("Error fetching profile picture: ", error)
            }
        }
        setExistingValues()
    }, [userInfo.profilePicture])

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm({
        defaultValues: {
            id: "",
            name: "",
            country: "",
            bio: "",
            learningLanguage: "",
            langProf: "",
            hobbies: [],
            places: []
        }
    })

    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
                alert('Please grant camera roll permissions in the settings.')
                return
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        } else { console.log(image) }
    }

    const renderLabel = (text) => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    {text}
                </Text>
            )
        }
        return null
    }

    const handleFocus = (id) => {
        setFocusedElement(id)
    }

    const handleBlur = () => {
        setFocusedElement(null)
    }

    const handleAddItem = () => {
        if (focusedElement == 0) {
            if (hobby !== '' && hobby !== ' ' && hobby !== null) {
                setHobbies([...hobbies, hobby])
                setHobby('')
            }
        } else if (focusedElement == 1) {
            if (place !== '' && place !== ' ' && place !== null) {
                setPlaces([...places, place])
                setPlace('')
            }
        }
    }

    const removeHobby = (id) => {
        const hobbiesClone = [...hobbies]
        hobbiesClone.splice(id, 1)
        setHobbies(hobbiesClone)
    }

    const removePlace = (id) => {
        const placesClone = [...places]
        placesClone.splice(id, 1)
        setPlaces(placesClone)
    }

    const onSubmit = async (values) => {

        //setting the FormData to send everything to the DB
        let formData = new FormData()

        //For prepping the image data
        if (!image) return

        let filename = image.split('/').pop()
        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`


        //For setting the rest of the userData
        setValue('hobbies', hobbies)
        setValue('places', places)
        setValue('id', userID)

        // setValue('learningLanguage', 'C#')
        
        const updatedValues = getValues()

        formData.append('profilePicture', { uri: image, name: filename, type })
        formData.append('userData', JSON.stringify(updatedValues))

        try {
            let res = await fetch('http://10.0.0.124:3000/edit_profile', {
                method: 'PUT',
                body: formData,
                header: {
                    'content-type': 'multipart/form-data'
                }
            })

            let response = await res.json()
            if (response) {
                userInfo = response.user
                updateUserInfo(userInfo)
            }
        } catch (error) {
            console.error(error)
        }

    }

    const sliderValueChange = (values) => {
        setLangProf(values)
        setValue('langProf', (values[0] + 1))
    }

    const logValues = () => {
        const p = getValues()
        console.log(p)
    }




    return ( 
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                <Text style={styles.heading}>Complete Your Profile</Text>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{position: 'relative'}}>
                            <TouchableOpacity style={styles.add} onPress={pickImage}>
                                <Svg width="30" height="30" viewBox="0 0 24 24">
                                    <Path
                                        d="M8 12H16M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                        fill="#fff"
                                        stroke="#0080FF"
                                        strokeWidth="2"
                                    />
                                </Svg>
                            </TouchableOpacity>
                            {image
                                ? <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 100 }} />
                                : <Image source={defaultImage} style={{ width: 100, height: 100, borderRadius: 100 }} />
                            }
                        </View>
                    </View>
                    {/* <Button title="Log values" onPress={logValues} /> */}
                    <View style={{gap: 5}}>
                        <View>
                            <Text style={styles.subHeading}>Name</Text>
                            <Text style={{position: 'absolute', top: 0, left: 45, color: 'red'}}>*</Text>
                        </View>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field : { onChange, onBlur, value } }) => (
                                <TextInput
                                    autoCorrect={false}
                                    style={styles.input}
                                    placeholder="What's your name?"
                                    onChangeText={(value) => {
                                        onChange(value);
                                        setName(value)
                                    }}
                                    value={name}
                                />
                            )}
                            name="name"
                        />
                    </View>
                    <View style={styles.dropdownContainer}>
                        {renderLabel('Country')}
                        <Text style={{position: 'absolute', top: -12, left: 0, color: 'red'}}>*</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field : { onChange, onBlur, value } }) => (
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={Countries}
                                    search
                                    maxHeight={300}
                                    labelField="name"
                                    valueField="code"
                                    placeholder={!isFocus ? 'Country of residence...' : '...'}
                                    searchPlaceholder="Search..."
                                    value={country}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={(country) => {onChange(country.name); setValue('country', country.name)}}
                                />
                            )}
                            name="country"
                        />
                    </View>
                    <View style={{gap: 5}}>
                        <View>
                            <Text style={styles.subHeading}>Bio</Text>
                            <Text style={{position: 'absolute', top: 0, left: 25, color: 'red'}}>*</Text>
                        </View>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field : { onChange, onBlur, value } }) => (
                                <TextInput
                                    multiline={true}
                                    autoCorrect={false}
                                    style={styles.inputBio}
                                    placeholder="Tell us about yourself!"
                                    onChangeText={(value) => {
                                        onChange(value);
                                        setBio(value)
                                    }}
                                    value={bio}
                                />
                            )}
                            name="bio"
                        />
                    </View>
                    <View style={styles.dropdownContainer}>
                        {renderLabel('Learning language')}
                        <Text style={{position: 'absolute', top: -12, left: 0, color: 'red'}}>*</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field : { onChange, onBlur, value } }) => (
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={Languages}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? 'Learning language...' : '...'}
                                    searchPlaceholder="Search..."
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={(lang) => {onChange(lang.value); setValue('learningLanguage', lang.value)}}
                                />
                            )}
                            name="learningLanguage"
                        />
                    </View>
                    <View style={styles.sliderContainer}>
                        <Text style={{fontWeight: 'bold'}}>How proficient are you in your learning language currently?</Text>
                        <Text style={{position: 'absolute', top: 17, left: 139, color: 'red'}}>*</Text>
                        <View>
                            <Text style={{opacity: 0.3, fontSize: 12}}>1 if you're just starting out</Text>
                            <Text style={{opacity: 0.3, fontSize: 12}}>5 if you're almost fluent</Text>
                        </View>
                        <View style={styles.sliderSubContainer}>
                            <View style={styles.sliderLabel}>
                                <Text>1</Text>
                                <Text>2</Text>
                                <Text>3</Text>
                                <Text>4</Text>
                                <Text>5</Text>
                            </View>
                            <View>
                            <Controller
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field : { onChange, onBlur, value } }) => (
                                    <MultiSlider
                                        values={langProf}
                                        min={0}
                                        max={4}
                                        step={1}
                                        sliderLength={200}
                                        allowOverlap={true}
                                        snapped
                                        onValuesChange={sliderValueChange}
                                        onValuesChangeStart={this.disableScroll}
                                        onValuesChangeFinish={this.enableScroll}
                                    />
                                )}
                                name="langProf"
                            />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.subHeading}>What are your interests?</Text>
                    <Text style={{position: 'absolute', top: 0, left: 190, color: 'red'}}>*</Text>
                    <TextInput
                        autoCorrect={false}
                        style={styles.input}
                        value={hobby}
                        onChangeText={setHobby}
                        onFocus={() => handleFocus(0)}
                        onBlur={handleBlur}
                        onSubmitEditing={handleAddItem}
                        placeholder="Press enter to add an interest..."
                    />
                    <View style={styles.tags}>
                        {hobbies !== null ? (hobbies.map((h, index) => (
                            <TouchableOpacity key={index} style={styles.tagContainer} onPress={() => removeHobby(index)}>
                                <Text>{h}</Text>
                            </TouchableOpacity>
                        ))) : (
                            <View></View>
                        )}
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.subHeading}>Where would you like to visit?</Text>
                    <Text style={{position: 'absolute', top: 0, left: 229, color: 'red'}}>*</Text>
                    <TextInput
                        autoCorrect={false}
                        style={styles.input}
                        returnKeyType="done"
                        value={place}
                        onChangeText={setPlace}
                        onFocus={() => handleFocus(1)}
                        onBlur={handleBlur}
                        onSubmitEditing={handleAddItem}
                        placeholder="Press enter to add a destination..."
                    />
                    <View style={styles.tags}>
                        {places !== null ? (places.map((p, index) => (
                            <TouchableOpacity key={index} style={styles.tagContainer} onPress={() => removePlace(index)}>
                                <Text>{p}</Text>
                            </TouchableOpacity>
                        ))) : (
                            <View></View>
                        )}
                    </View>
                </View>
                <Button title="Submit" onPress={handleSubmit(onSubmit)}/>
                {clearCache ? <Button title="Clear Cache" onPress={clearCache}/> : <View></View>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 100,
        gap: 35
    },
    subContainer: {
        width: "85%",
        gap: 25,
    },
    sliderContainer: {
        gap: 15
    },
    sliderSubContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    sliderLabel: {
        flexDirection: 'row',
        width: 200,
        justifyContent: 'space-between',
        opacity: 0.3
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center'
    },
    subHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        padding: 5,
        height: 32,
    },
    inputBio: {
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        padding: 5,
        height: 96,
    },
    dropdownContainer: {
        position: 'relative',
        marginBottom: 10,
    },
    dropdown: {
        height: 36,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 10,
        top: -10,
        zIndex: 999,
        paddingHorizontal: 5,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#aaa'
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 16,
        height: 16,
    },
    inputSearchStyle: {
        fontSize: 16,
        borderRadius: 5
    },
    tags: {
        gap: 16,
        flexDirection: 'row',
        flexWrap: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
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
    add: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 16,
        position: 'absolute',
        top: 72,
        left: 72,
        zIndex: 1
    }
})

export default CompleteProfile