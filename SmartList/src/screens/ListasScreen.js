import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Modal, TextInput } from 'react-native';

const Lista = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fechas = [
    { id: 1, fecha: '02/06/2023' },
    { id: 2, fecha: '04/06/2023' },
    { id: 3, fecha: '06/06/2023' },
    { id: 4, fecha: '09/06/2023' },
    { id: 5, fecha: '10/06/2023' },
  ];

  const alumnos = [
    { id: 1, nombre: 'Javier', asistencia: true },
    { id: 2, nombre: 'Diego', asistencia: false },
    { id: 4, nombre: 'Jorge', asistencia: true },
    { id: 5, nombre: 'Karla', asistencia: true },
    { id: 6, nombre: 'Jazmin', asistencia: true },
    { id: 7, nombre: 'Manuel', asistencia: true },
    // Agrega más alumnos aquí
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.itemText}>{item.fecha}</Text>
    </TouchableOpacity>
  );

  const renderListItem = ({ item }) => (
    <View style={styles.listItemContainer}>
      <Text style={styles.listItemText}>{item.nombre} </Text>
      <Text style={styles.listItemText}>{item.asistencia ? 'Presente' : 'Ausente'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Fecha seleccionada: {selectedItem ? selectedItem.fecha : ''}</Text>
          <FlatList
            data={alumnos}
            renderItem={renderListItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <FlatList
        data={fechas}
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
    paddingTop: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  listItemText: {
    fontSize: 16,
  },
});

export default Lista;
