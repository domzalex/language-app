import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, Image, Pressable, StyleSheet, Touchable } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import TranslateText from './TranslateText'
import LanguageLevels from './LanguageLevels'

//I mean really, what's wrong with using standard variables in React? Why always useState??
let maxLines = 4
let textLineNum
let textRevealed = false
const text = `Etiam placerat sodales bibendum. Sed eleifend lobortis vulputate.\n\nAliquam a fermentum orci. Proin sodales neque nulla, vel porta nibh dignissim a. Proin aliquet, turpis quis.`

const PostContainer = ({ translateText }) => {

    const [showMore, setShowMore] = useState(false)
    const [isTextOverflow, setIsTextOverflow] = useState(undefined)
    const [isTranslated, setIsTranslated] = useState(false)
    const [translatedText, setTranslatedText] = useState('')
    const [showTranslation, setShowTranslation] = useState(false)
    const [numOfLines, setNumLines] = useState(undefined)

    const textLayout = (e) => {
        if (e.nativeEvent.lines.length > maxLines && !textRevealed) {
            textLineNum = e.nativeEvent.lines.length
            setIsTextOverflow(textLineNum > maxLines)
            setShowMore(textLineNum > maxLines)
            setNumLines(maxLines)
        }
    }
    const revealHideText = () => {
        if (showMore) {
            setNumLines(textLineNum)
            setShowMore(false)
            textRevealed = true
        } else {
            setNumLines(maxLines)
            setShowMore(true)
            textRevealed = false
        }
    }

    return (
        // Come back once I am getting information from a DB
        <View style={styles.postContainer}>
            
            {/* Profile pic && Name/Lang/Follow */}
            <View style={styles.postContainerHeader}>
                <Image source={require('./assets/img/profilePicture.jpg')} style={{ width: 40, height: 40, borderRadius: 40 }} />
                <View style={{display: 'flex', flex: 1}}>
                    <View style={styles.nameFollow}>
                        <Text style={{fontWeight: 'bold'}}>Yamato</Text>
                        <Pressable>
                            <Text style={{color: 'blue'}}>Follow</Text>
                        </Pressable>
                    </View>
                    <LanguageLevels />
                </View>
            </View>

            <View>
                <Text style={{color: '#333'}} numberOfLines={numOfLines} onTextLayout={textLayout}>
                    {text}
                </Text>
                {isTextOverflow ? (
                    <Pressable onPress={revealHideText}>
                        {showMore ? (
                            <Text style={{color: 'blue', textAlign: 'right'}}>Show More</Text>
                        ) : (
                            <Text style={{color: 'blue', textAlign: 'right'}}>Show Less</Text>
                        )}
                    </Pressable>
                ) : (
                    <View></View>
                )}
                {(isTranslated && showTranslation) ? (
                    <View style={styles.text}>
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
            </View>

            <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{display: 'flex', flexDirection: 'row', width: '40%'}}>
                    <View style={{display: 'flex', flexDirection: 'row', marginRight:  32}}>
                        <Svg style={{marginRight: 4}} width="16" height="16" viewBox="0 0 24 24">
                            <Path
                                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                fill="none"
                                stroke="#00000075"
                                strokeWidth="2"
                            />
                        </Svg>
                        <Text style={styles.textLowOpacity}>12</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Svg style={{marginRight: 4}} width="16" height="16" viewBox="0 0 24 24">
                            <Path
                                d="M7 9H17M7 13H12M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z"
                                fill="none"
                                stroke="#00000075"
                                strokeWidth="2"
                            />
                        </Svg>
                        <Text style={styles.textLowOpacity}>6</Text>
                    </View>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '60%'}}>
                    <TranslateText text={text} isTranslated={isTranslated} setIsTranslated={setIsTranslated} setShowTranslation={setShowTranslation} setTranslatedText={setTranslatedText}/>
                    <Svg style={{marginRight: 4}} width="16" height="16" viewBox="0 0 24 24">
                        <Path
                            d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z"
                            fill="none"
                            stroke="#00000075"
                            strokeWidth="2"
                        />
                    </Svg>
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    postContainer: {
        padding: 16,
        gap: 12,
        borderBottomColor: '#00000008',
        borderBottomWidth: 1
    },
    postContainerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    nameFollow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lang: {
        display: 'flex',
        gap: 3,
        flexDirection: 'row',
        alignItems: 'center'
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
    showHideTranslation: {
        paddingTop: 12,
        color: '#00000050'
    }
})

export default PostContainer