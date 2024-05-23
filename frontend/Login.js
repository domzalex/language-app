import React, { useState, useContext } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { AuthContext } from './context/AuthContext'

const Login = ({ navigation }) => {

    const {isLoading, userToken, login} = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: "",
            email: "",
            username: "",
            password: "",
            nativeLanguage: ""
        }
    })

    const checkLogin = async () => {

        const values = {
            user: username,
            pass: password
        }

        const res = await fetch('http://10.0.0.124:3000/login', {
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
            if (resJSON.token) {
                // console.log("from login: ", resJSON)
                login(resJSON.token, resJSON.user, resJSON.userMessages)
            } else {
                console.log(resJSON.message)
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.heading}>Login</Text>
                <TextInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    style={styles.input}
                    placeholder="Username..."
                    onChangeText={setUsername}
                />
                <TextInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Password..."
                    onChangeText={setPassword}
                />

                <Button title="Submit" onPress={() => {checkLogin()}}/>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.subHeading}>Don't have an account?</Text>
                <Button title="Register" onPress={() => navigation.navigate('Register')} />
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

export default Login