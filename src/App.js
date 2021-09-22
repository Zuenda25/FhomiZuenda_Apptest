import React from 'react';
import type { Node } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home';

const Stack = createNativeStackNavigator();

const App: () => Node = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  </NavigationContainer>

);

export default App;
