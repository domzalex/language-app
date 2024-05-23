import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Svg, { Path } from 'react-native-svg'
import { NavigationContainer } from '@react-navigation/native'

import Messages from './Messages'
import PersonalProfile from './PersonalProfile'
import Posts from './Posts'
import Connect from './Connect'
import Leaderboard from './Leaderboard'
import CreateAccount from './CreateAccount'

const AppCoreNav = () => {

    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 4
                }
            }}
        >
            <Tab.Screen
                name="Messages"
                component={Messages}
                options={{
                    tabBarIcon: () => (
                        <Svg width="24" height="24" Box="0 0 24 24">
                            <Path
                                d="M8 10.5H16M8 14.5H11M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z"
                                fill="none"
                                stroke="#696969"
                                strokeWidth="1"
                            />
                        </Svg>
                    ),
                    headerShown: false,
                    transitionSpec: {
                        open: { animation: 'none' },
                        close: { animation: 'none' }
                    }
                }}
            />
            <Tab.Screen
                name="Posts"
                component={Posts}
                options={{
                    tabBarIcon: () => (
                        <Svg width="24" height="24" viewBox="0 0 24 24">
                            <Path
                                d="M8.4 13.8C8.4 13.8 9.75 15.6 12 15.6C14.25 15.6 15.6 13.8 15.6 13.8M14.7 9.3H14.709M9.3 9.3H9.309M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM15.15 9.3C15.15 9.54853 14.9485 9.75 14.7 9.75C14.4515 9.75 14.25 9.54853 14.25 9.3C14.25 9.05147 14.4515 8.85 14.7 8.85C14.9485 8.85 15.15 9.05147 15.15 9.3ZM9.75 9.3C9.75 9.54853 9.54853 9.75 9.3 9.75C9.05147 9.75 8.85 9.54853 8.85 9.3C8.85 9.05147 9.05147 8.85 9.3 8.85C9.54853 8.85 9.75 9.05147 9.75 9.3Z"
                                fill="none"
                                stroke="#696969"
                                strokeWidth="1"
                            />
                        </Svg>
                    ),
                    headerShown: false,
                    transitionSpec: {
                        open: { animation: 'none' },
                        close: { animation: 'none' }
                    }
                }}
            />
            <Tab.Screen
                name="Connect"
                component={Connect}
                options={{
                    tabBarIcon: () => (
                        <Svg width="24" height="24" viewBox="0 0 24 24">
                            <Path
                                d="M22 7.99995H20M20 7.99995H19C17 6.00173 14 3.99974 12 5.99995M20 7.99995V15.9999M12 5.99995L8.99956 9.00158C8.9202 9.08097 8.88052 9.12066 8.84859 9.1558C8.15499 9.91889 8.15528 11.0842 8.84927 11.847C8.88121 11.8821 8.92098 11.9218 9.00031 12.0011C9.07967 12.0804 9.11936 12.1201 9.15449 12.152C9.91743 12.8453 11.0824 12.8452 11.8451 12.1516C11.8802 12.1197 11.9199 12.08 11.9992 12.0007L12.9996 11.0003M12 5.99995C10 3.99974 7 6.0018 5 8.00001H4M2 8.00001H4M4 8.00001V15.9999M20 15.9999V18.9999H22M20 15.9999H17.1716M15 12.9999L16.5 14.4999C16.5796 14.5796 16.6195 14.6194 16.6515 14.6547C17.3449 15.4175 17.3449 16.5824 16.6515 17.3452C16.6195 17.3805 16.5796 17.4203 16.5 17.4999C16.4204 17.5795 16.3805 17.6194 16.3453 17.6515C15.5824 18.3449 14.4176 18.3449 13.6547 17.6515C13.6195 17.6194 13.5796 17.5795 13.5 17.4999L13 16.9999C12.4548 17.5452 12.1821 17.8178 11.888 17.9636C11.3285 18.2408 10.6715 18.2408 10.112 17.9636C9.81788 17.8178 9.54525 17.5452 9 16.9999C8.31085 17.9188 6.89563 17.7912 6.38197 16.7639L6 15.9999H4M4 15.9999V18.9999H2"
                                fill="none"
                                stroke="#696969"
                                strokeWidth="1"
                            />
                        </Svg>
                    ),
                    headerShown: false,
                    transitionSpec: {
                        open: { animation: 'none' },
                        close: { animation: 'none' }
                    }
                }}
            />
            <Tab.Screen
                name="Leaderboard"
                component={Leaderboard}
                options={{
                    tabBarIcon: () => (
                        <Svg width="24" height="24" viewBox="0 0 24 24">
                            <Path
                                d="M4 8L6 20H18L20 8M4 8L5.71624 9.37299C6.83218 10.2657 7.39014 10.7121 7.95256 10.7814C8.4453 10.8421 8.94299 10.7173 9.34885 10.4314C9.81211 10.1051 10.0936 9.4483 10.6565 8.13476L12 5M4 8C4.55228 8 5 7.55228 5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8ZM20 8L18.2838 9.373C17.1678 10.2657 16.6099 10.7121 16.0474 10.7814C15.5547 10.8421 15.057 10.7173 14.6511 10.4314C14.1879 10.1051 13.9064 9.4483 13.3435 8.13476L12 5M20 8C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6C19.4477 6 19 6.44772 19 7C19 7.55228 19.4477 8 20 8ZM12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4C11 4.55228 11.4477 5 12 5ZM12 4H12.01M20 7H20.01M4 7H4.01"
                                fill="none"
                                stroke="#696969"
                                strokeWidth="1"
                            />
                        </Svg>
                    ),
                    headerShown: false,
                    transitionSpec: {
                        open: { animation: 'none' },
                        close: { animation: 'none' }
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={PersonalProfile}
                options={{
                    tabBarIcon: () => (
                        <Svg width="24" height="24" viewBox="0 0 24 24">
                            <Path
                                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                fill="none"
                                stroke="#696969"
                                strokeWidth="1"
                            />
                            <Path
                                d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                                fill="none"
                                stroke="#696969"
                                strokeWidth="1"
                            />
                        </Svg>
                    ),
                    headerShown: false,
                    transitionSpec: {
                        open: { animation: 'none' },
                        close: { animation: 'none' }
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default AppCoreNav