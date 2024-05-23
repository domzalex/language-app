import React from 'react'

import AppNavigator from './AppNavigator'
import { AuthProvider } from './context/AuthContext'

export default function App() {
    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    )
}