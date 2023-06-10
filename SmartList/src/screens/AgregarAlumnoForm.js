import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AgregarAlumnoForm = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>¡Hola, esta es mi pantalla!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default AgregarAlumnoForm;
