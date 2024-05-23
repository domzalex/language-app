import React, { useState, useContext } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Dropdown } from 'react-native-element-dropdown' 
import { Languages } from './Languages'

import { AuthContext } from './context/AuthContext'

const Register = ({ navigation }) => {

    const {isLoading, userToken, login} = useContext(AuthContext)

    const [date, setDate] = useState('')
    const [error, setError] = useState('')
    const [datePlaceholder, setDatePlaceholder] = useState('Birthdate...')

    const changePlaceholder = () => {
        setDatePlaceholder('YYYY-MM-DD')
    }

    const handleDateChange = (text) => {
        // Remove any non-numeric characters from the input
        const cleanedText = text.replace(/[^0-9]/g, '')

        // Format the date with '/' characters
        let formattedDate = ''
        for (let i = 0; i < cleanedText.length; i++) {
            if (i === 4 || i === 6) {
                formattedDate += '-'
            }
            formattedDate += cleanedText[i]

        }

        // Validate the date
        const currentDate = new Date()
        const [year, month, day] = formattedDate.split('-').map(Number)

        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            setError('Invalid date format')
        } else if (year > currentDate.getFullYear() || (year === currentDate.getFullYear() && month > (currentDate.getMonth() + 1))) {
            setError('Year cannot be in the future')
        } else if (month < 1 || month > 12) {
            setError('Month must be between 1 and 12')
        } else if (day < 1 || day > new Date(year, month, 0).getDate()) {
            setError('Day must be valid for the selected month')
        } else {
            setError('')
        }

        // Update the state with the formatted date
        setDate(formattedDate)
        setValue('birthdate', formattedDate)
    }

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        defaultValues: {
            id: "",
            email: "",
            username: "",
            password: "",
            birthdate: "",
            nativeLanguage: ""
        }
    })

    const onSubmit = async (values) => {

        const user = values.username
        const pass = values.password

        try {
            const res = await fetch('http://10.0.0.124:3000/create_user_profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })

            const resJSON = await res.json()

            if (!res.ok) {
                throw new Error('Failed to submit user data.')
            } else {
                login(resJSON.token, resJSON.userInfo)
            }

            // return resJSON
        } catch (error) {
            console.error('Error submitting data: ', error.message)
            return { error: error.message }
        }
    }

    const [value, setLabelValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Native Language
                </Text>
            )
        }
        return null
    }

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.heading}>Create your account</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field : { onChange, onBlur, value } }) => (
                        <TextInput
                            autoCorrect={false}
                            autoCapitalize='none'
                            style={styles.input}
                            placeholder="Email..."
                            onBlur={onBlur}
                            onChangeText={onChange}
                            {...register('email', {
                                required: 'Required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            })}
                        />
                    )}
                    name="email"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field : { onChange, onBlur, value } }) => (
                        <TextInput
                            autoCorrect={false}
                            autoCapitalize='none'
                            style={styles.input}
                            placeholder="Username..."
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="username"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field : { onChange, onBlur, value } }) => (
                        <TextInput
                            autoCorrect={false}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            style={styles.input}
                            placeholder="Password..."
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="password"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field : { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder={datePlaceholder}
                            value={value}
                            onBlur={() => {setDatePlaceholder("Birthdate...")}}
                            onFocus={() => {changePlaceholder()}}
                            onChangeText={handleDateChange}
                            maxLength={10} // Maximum length for YYYY/MM/DD format
                        />
                    )}
                    name="birthdate"
                />
                {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
                <View style={styles.dropdownContainer}>
                    {renderLabel()}
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
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Native language...' : '...'}
                                searchPlaceholder="Search..."
                                value={value.value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={(lang) => onChange(lang.value)}
                            />
                        )}
                        name="nativeLanguage"
                    />
                    
                </View>

                <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.subHeading}>Or if you have an account:</Text>
                <Button title="Login" onPress={() => navigation.navigate('Login')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 15,
        gap: 15
    },
    subContainer: {
        width: "70%",
        gap: 15
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center'
    },
    subHeading: {
        fontSize: 12,
        textAlign: 'center'
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        padding: 5,
        height: 32,
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
})



export default Register