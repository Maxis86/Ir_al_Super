import 'react-native-gesture-handler';

import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { MenuLateral } from './src/navigator/MenuLateral';


const App = () => {
  return (
    <NavigationContainer>
        {/* <Navigator/> */}
        <MenuLateral/>
    </NavigationContainer>
  )
}

export default App;
