import React, { useState, useEffect, useReducer, useContext } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker'

const CreateAccount = () => {

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
            // name: "",
            // age: "",
            // country: "",
            // profilePicture: "",
            // bio: "",
            // nativeLanguage: "",
            // learningLanguages: [],
            // hobbies: [],
            // placesWantToVisit: []
        }
    })



    const onSubmit = async (values) => {
        const res = await fetch('http://10.0.0.124:3000/create_user_profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
        const resJSON = await res.json()
    }



    return (
        <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <Controller
                control={control}
                rules={{
                    required: true
                }}
                render={({ field : { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Email"
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
                        placeholder="Username"
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
                        placeholder="Password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="password"
            />
            {/* <Controller
                control={control}
                rules={{
                    required: true
                }}
                render={({ field : { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="name"
            /> */}
            {/* <Controller
                control={control}
                rules={{
                    required: true
                }}
                render={({ field : { onChange, onBlur, value } }) => (
                    <Picker style={{backgroundColor: 'red'}}
                        {...register("age", { required: true, min: 18 })}
                        placeholder="Age"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    >
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="18" value="18" />
                    </Picker>
                )}
                name="age"
            /> */}
            {/* <Controller
                control={control}
                rules={{
                    required: true
                }}
                render={({ field : { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Country"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="country"
            /> */}
            {/* <Controller
                control={control}
                rules={{
                    required: false
                }}
                render={({ field : { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Profile Picture"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="profilePicture"
            /> */}
            {/* <Controller
                control={control}
                rules={{
                    required: false
                }}
                render={({ field : { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Bio"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="bio"
            /> */}
            <Controller
                control={control}
                rules={{
                    required: true
                }}
                render={({ field : { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Native Language"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="nativeLanguage"
            />
            {/* <Controller
                control={control}
                rules={{
                    required: true
                }}
                render={({ field : { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Learning Languages"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="learningLanguages"
            />
            <Controller
                control={control}
                rules={{
                    required: false
                }}
                render={({ field : { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Hobbies"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="hobbies"
            />
            <Controller
                control={control}
                rules={{
                    required: false
                }}
                render={({ field : { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Places you want to visit"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="placesWantToVisit"
            /> */}

            



            <Button title="Submit" onPress={() => handleSubmit(onSubmit)()} />
        </View>
    )
}

export default CreateAccount