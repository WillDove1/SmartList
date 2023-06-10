import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Modal, TextInput } from 'react-native';


const Lista = () => {
  const data = [
    { id: 1, nombre: '02/06/2023' },
    { id: 2, nombre: '04/06/2023' },
    { id: 3, nombre: '06/06/2023' },
    { id: 4, nombre: '09/06/2023' },
    { id: 5, nombre: '10/06/2023' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  listContainer: {
    paddingVertical: 16,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Lista;
