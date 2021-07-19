import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { NuevoProductoScreen } from '../screens/NuevoProductoScreen';

const Stack = createStackNavigator();



export const Navigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false // le quito todos los header a la plantalla
        }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="NuevoProductoScreen" component={NuevoProductoScreen} />
        </Stack.Navigator>
    )
}
