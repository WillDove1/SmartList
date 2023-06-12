import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Modal, TextInput, Alert } from 'react-native';
import axios from 'axios';

const Lista = ({navigation}) => {
  

  /*const data = [
    { id: 19450673, nombre: 'Gatito', ciudad: 'mi casa' },
    { id: 19450712, nombre: 'Capibara', ciudad: 'Puebla' },
    { id: 19450123, nombre: 'Pepe el toro', ciudad: 'Kamehouse' },
    { id: 19450321, nombre: 'Mario Hugo', ciudad: 'Vera'},
    { id: 19450721, nombre: 'Bodoque', ciudad: 'Tlaxcala' },
    { id: 75483231, nombre: 'Prueba', ciudad: 'zacatecas'}
  ];*/

  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get('http://192.168.97.88:3000/api/alumnos');

      setCharacters(response.data);
      console.info(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedItem, setSelectedItem] = useState({nombre: ''});
  const [inputValueNombre, setInputValueNombre] = useState('');
  const [inputValueNoControl, setInputValueNoControl] = useState('');
  const [inputValueApellido, setInputValueApellido] = useState('');
  const [record, setRecord] = useState({
    nombre: '',
    apellido: '',
    numero_control: '',
  });

  const handleChange = (key, value) => {
    setRecord({ ...record, [key]: value });
  };

  const reloadScreen = () => {
    navigation.replace('AgregarAlumnosScreen');
  };

  const addRecord = () => {
    fetch('http://192.168.97.88:3000/api/alumnos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Registro agregado:', data);
        // Aquí puedes realizar alguna acción adicional después de agregar el registro
      })
      .catch((error) => {
        console.error('Error al agregar el registro:', error);
      });
  };
  

  const openDialog = () => {
    setModalVisible(true);
  };

  const closeDialog = () => {
    setModalVisible(false);
    setInputValueNombre('');
  };

  const handleSubmit = () => {
    // Realizar acciones con el valor del formulario
    console.log('Valor del formulario:', inputValueNombre);
    closeDialog();
  };

  const navigateToOtraPantalla = () => {
    navigation.navigate('AgregarAlumnoForm');
  };


  const handleItemClick = (item) => {
  Alert.alert(
    'Elemento seleccionado',
    `Has seleccionado el elemento ${item.nombre}.`,
    [
      { text: 'Cancelar', onPress: () => console.log('Cancelar presionado'), style: 'cancel' },
      { text: 'Editar', onPress: () => handleItemPress(item) },
      { text: 'Eliminar', onPress: () => {
        axios
          .delete(`http://192.168.97.88:3000/api/alumnos/${item.id}`)
          .then((response) => {
            console.log('registro eliminado', response.data);
            fetchCharacters();
          })
          .catch((error) => {
            console.error('Error',error);
          })
      } }
      
    ]
  );
}

const handleAddAndClose = () => {
  addRecord(); // Lógica para agregar el elemento
  closeDialog(); // Lógica para cerrar el modal
};

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemClick(item)}>
      <Text style={styles.itemText}>{item.nombre} {item.apellido} - {item.numero_control}</Text>
    </TouchableOpacity>
  );

  const handleItemPress = (character) => {
    setSelectedItem(character);
    setModalVisible2(true);
  };

  const handleCloseModal = () => {
    setModalVisible2(false);
  };

  const handleEditAlumno = () => {
    const { id } = selectedItem;
    const updatedAlumno = {
      nombre: inputValueNombre,
      apellido: inputValueApellido,
      numero_control: inputValueNoControl
    };
  
    axios.put(`http://192.168.97.88:3000/api/alumnos/${id}`, updatedAlumno)
      .then(response => {
        // Actualizar el estado de tu componente con los datos actualizados
        // Si estás utilizando un estado global, también podrías actualizarlo aquí
        console.log(response.data);
        // Cerrar el modal
        setModalVisible2(false);
      })
      .catch(error => {
        console.error(error);
        // Manejar el error de acuerdo a tus necesidades
      });
  };
  

  const renderFloatingButton = () => (
    
    <View>
    <TouchableOpacity style={styles.floatingButtonRecargar} onPress={fetchCharacters}>
      <Text style={styles.floatingButtonText}>R</Text>
    </TouchableOpacity>   
    <TouchableOpacity style={styles.floatingButton} onPress={openDialog}>
      <Text style={styles.floatingButtonText}>+</Text>
    </TouchableOpacity>

    <Modal visible={modalVisible} animationType="slide" onRequestClose={closeDialog}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Agregar un alumno</Text>

          <TextInput
            style={styles.input}
            placeholder="Ingresa numero de control"
            placeholderTextColor="gray"
            value={record.numero_control}
            onChangeText={textNoControl => handleChange('numero_control',textNoControl)}
          />
          
        
          <TextInput
            style={styles.input}
            placeholder="Ingresa el nombre"
            placeholderTextColor="gray"
            value={record.nombre}
            onChangeText={textNombre => handleChange('nombre',textNombre)}
          />
          
  
          <TextInput
            style={styles.input}
            placeholder="Ingresa el apellido"
            placeholderTextColor="gray"
            value={record.apellido}
            onChangeText={textApellido => handleChange('apellido',textApellido)}
          />

          <View style={styles.buttonContainer}>
            <Button title="Agregar" onPress={handleAddAndClose} />
            <Button title="Cancelar" onPress={closeDialog} />
          </View>
        </View>
      </Modal>



    </View>
    
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        visible={modalVisible2}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Editar alumno {selectedItem.nombre}</Text>

          <TextInput
            style={styles.input}
            placeholder="Ingresa numero de control"
            placeholderTextColor="gray"
            value={inputValueNoControl}
            onChangeText={textNoControl => setInputValueNoControl(textNoControl)}
          />


          <TextInput
            style={styles.input}
            placeholder="Ingresa el nombre"
            placeholderTextColor="gray"
            value={inputValueNombre}
            onChangeText={textNombre => setInputValueNombre(textNombre)}
          />


          <TextInput
            style={styles.input}
            placeholder="Ingresa el apellido"
            placeholderTextColor="gray"
            value={inputValueApellido}
            onChangeText={textApellido => setInputValueApellido(textApellido)}
          />

          <View style={styles.buttonContainer}>
            <Button title="Editar" onPress={handleEditAlumno}/>
            <Button title="Cancelar" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
      {renderFloatingButton()}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
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
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#4285F4',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  floatingButtonRecargar: {
    position: 'relative',
    bottom: 16,
    left: 16,
    backgroundColor: '#4285F4',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Lista;
