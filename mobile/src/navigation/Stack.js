import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Authentication from '../views/Authentication'
import Register from '../views/Register'
import Home from '../views/Home'
import GoalsList from '../views/GoalsList'
import NetworkError from '../views/NetworkError'
import GoalCreate from '../views/GoalCreate'
import Money from '../views/Money'

const Stack = createStackNavigator()

export default props => (
    <Stack.Navigator
        initialRouteName="GoalsList"
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

        <Stack.Screen
            name="GoalsList"
            component={GoalsList}
        />

        <Stack.Screen
            name="GoalCreate"
            component={GoalCreate}
        />

        <Stack.Screen
            name="Money"
            component={Money}
        />

        <Stack.Screen
            name="NetworkError"
            component={NetworkError}
        />
    </Stack.Navigator>
)