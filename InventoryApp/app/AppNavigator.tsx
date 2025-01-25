import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/HomeScreen';
import AddEditItemScreen from '../components/AddEditItemScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inventory' }} />
        <Stack.Screen name="AddEditItem" component={AddEditItemScreen} options={{ title: 'Add/Edit Item' }} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}
