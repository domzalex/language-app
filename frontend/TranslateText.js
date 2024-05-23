import React, { useState } from 'react'
import { View, TextInput, Button, Alert, Text, ActivityIndicator } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import TouchToTranslate from './TouchToTranslate'

const TranslateText = ({ translatedText, loading, text, isTranslated, setIsTranslated, setShowTranslation, setTranslatedText}) => {

    const [textToTranslate, setTextToTranslate] = useState('')
    const [targetLanguage, setTargetLanguage] = useState('')
    const [displayMode, setDisplayMode] = useState('alternate')

    const translateText = async (textToTranslate, targetLanguage) => {
        try {

            // setLoading(true)

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
            // setLoading(false)
        }
    }

    const HandleTextClicked = (e) => {
        setIsTranslated(true)
        setShowTranslation(true)
        if (!isTranslated) {
            setTextToTranslate(text)
            translateText(text, 'ja')
        } else console.log("Already translated!")
    }

    return (
        <Svg onPress={HandleTextClicked} width="16" height="16" viewBox="0 0 24 24">
            <Path
                d="M20 15H19M14 15H19M17 13.5V15M4.85714 8H9.14286M4 11L5.53848 5.61531C5.97492 4.08777 6.19315 3.324 6.53044 3.13222C6.82159 2.96667 7.17841 2.96667 7.46956 3.13222C7.80685 3.324 8.02508 4.08777 8.46152 5.61531L10 11M14 20.9776C16.8033 20.725 19 18.369 19 15.5V15M20 20.9776C18.0763 20.8043 16.4382 19.6404 15.5996 18M14 7C14.9319 7 15.3978 7 15.7654 7.15225C16.2554 7.35523 16.6448 7.74458 16.8478 8.23464C17 8.60218 17 9.06812 17 10M7 15C7 15.9319 7 16.3978 7.15224 16.7654C7.35523 17.2554 7.74458 17.6448 8.23463 17.8478C8.60218 18 9.06812 18 10 18"
                fill="white"
                stroke="#00000075"
                strokeWidth="2"
            />
        </Svg>
    )

}

export default TranslateText