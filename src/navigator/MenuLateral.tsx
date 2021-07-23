import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Navigator } from './Navigator';

const Drawer = createDrawerNavigator();

export const MenuLateral = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Navigator} />
    </Drawer.Navigator>
  );
}