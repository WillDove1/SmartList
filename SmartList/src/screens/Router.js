import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AgregarAlumnoForm from './AgregarAlumnoForm';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="OtraPantalla" component={AgregarAlumnoForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
