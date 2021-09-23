import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './screens/home';
import NewContact from './screens/newcontact';
import ContactDetail from './screens/detailcontact';

const defaultScreenOptions = {
  headerShown: false,
};

const Stack = createNativeStackNavigator();

const App: () => Node = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewContact" component={NewContact} />
      <Stack.Screen name="ContactDetail" component={ContactDetail} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
