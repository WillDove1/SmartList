import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import AgregarAlumnoScreen from '../screens/AgregarAlumnoScreen';
import ListasScreen from '../screens/ListasScreen';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {

    return(
        <Tab.Navigator>
            <Tab.Screen name= 'Lista de asistencia' component = { HomeScreen }/>
            <Tab.Screen name = 'Agregar' component = { AgregarAlumnoScreen }/> 
            <Tab.Screen name= 'Listas' component={ListasScreen}/>
        </Tab.Navigator>
    );
}