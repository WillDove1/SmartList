import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      setCharacters(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCharacterPress = (character) => {
    setSelectedCharacter(character);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCharacterPress(item)} style={styles.characterContainer}>
      <Text style={styles.characterName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          {selectedCharacter && (
            <View>
              <Text style={styles.modalTitle}>{selectedCharacter.name}</Text>
              <Text>Estado: {selectedCharacter.status}</Text>
              <Text>Especie: {selectedCharacter.species}</Text>
              <Text>Ubicacion: {selectedCharacter.location.name}</Text>
              {/* Agrega aquí más detalles si los necesitas */}
            </View>
          )}
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  characterContainer: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});

export default CharacterList;
