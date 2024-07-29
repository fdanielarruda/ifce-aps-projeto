import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Authentication from '../views/Authentication'
import Register from '../views/Register'
import Home from '../views/Home'

const Stack = createStackNavigator()

export default props => (
    <Stack.Navigator
        initialRouteName="Authentication"
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen
            name="Authentication"
            component={Authentication}
        />

        <Stack.Screen
            name="Register"
            component={Register}
        />

        <Stack.Screen
            name="Home"
            component={Home}
        />
    </Stack.Navigator>
)