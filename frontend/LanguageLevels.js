import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { AuthContext } from './context/AuthContext'

const LanguageLevels = ({ learningLanguage, nativeLanguage, langProf }) => {

    let llwidth = `${langProf * 20}%`

    return (

        <View style={styles.container}>
            <View style={styles.languageContainer}>
                <Text style={styles.languageText}>{nativeLanguage}</Text>
                <View style={styles.languageProficiencyNative}></View>
            </View>
            <Svg style={styles.arrowIcon} width="12" height="12" viewBox="0 0 24 24">
                <Path
                    d="M7 4V20M7 20L3 16M7 20L11 16M17 4V20M17 4L21 8M17 4L13 8"
                    fill="none"
                    stroke="#00000035"
                    strokeWidth="2"
                />
            </Svg>
            <View style={styles.languageContainer}>
                <Text style={styles.languageText}>{learningLanguage}</Text>
                <View style={styles.languageProficiency}>
                    <View style={[styles.languageProficiencyAmount, { width: llwidth }]}></View>
                    <View style={styles.languageProficiencyBacking}></View>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    languageContainer: {
        flexDirection: 'column',
        height: '100%'
    },
    languageText: {
        color: '#000000',
        fontSize: 10,
        paddingVertical: 2,
        paddingHorizontal: 3
    },
    languageProficiencyNative: {
        backgroundColor: '#7bad83',
        height: 3,
        borderRadius: 5,
    },
    arrowIcon: {
        transform: [{ rotate: '90deg' }],
    },
    languageText: {
        color: '#000000',
        fontSize: 10,
        padding: 2,
        paddingHorizontal: 3,
        textTransform: 'uppercase'
    },
    languageProficiency: {
        position: 'relative'
    },
    languageProficiencyAmount: {
        backgroundColor: '#0080FF',
        height: 3,
        borderRadius: 5,
        zIndex: 100
    },
    languageProficiencyBacking: {
        backgroundColor: '#ddd',
        height: 3,
        borderRadius: 5,
        marginTop: -3,
        width: '100%'
    },
})

export default LanguageLevels