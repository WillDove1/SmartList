import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';


// Datos de ejemplo
const data = [
  { numero: 1, nombre: 'Javier', asistencia: true },
  { numero: 2, nombre: 'Diego', asistencia: false },
  { numero: 3, nombre: 'Jorge', asistencia: true },
  { numero: 4, nombre: 'Karla', asistencia: true },
  { numero: 5, nombre: 'Jazmin', asistencia: true },
  { numero: 6, nombre: 'Manuel', asistencia: true },
];

const Checkbox = ({ value, onChange }) => {
  const handlePress = () => {
    onChange(!value);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.checkbox}>
      <View style={[styles.checkboxContainer, value && styles.checked]}>
        {value && <View style={styles.checkboxInner} />}
      </View>
    </TouchableOpacity>
  );
};

const Table = () => {
  const [attendance, setAttendance] = useState(data.map(item => item.asistencia));

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
    setShowPicker(false);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const handleAttendanceChange = (index, value) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index] = value;
    setAttendance(updatedAttendance);
  };

  const renderFloatingButton = () => (
    <View>
    <TouchableOpacity style={styles.floatingButton} onPress={() => console.log(selectedDate)}>
      <Text style={styles.floatingButtonText}>G</Text>
    </TouchableOpacity>
    </View>
  );

  return (
    <><View style={styles.container}>
      {/* Encabezados de la tabla */}
      <Button title="Selecciona fecha" onPress={showDatePicker} />
      <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
      <View style={styles.row}>
        <Text style={[styles.cell, styles.header]}>No. Control</Text>
        <Text style={[styles.cell, styles.header]}>Nombre</Text>
        <Text style={[styles.cell, styles.header]}>Asistencia</Text>
      </View>

      {/* Filas de la tabla */}
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.cell}>{item.numero}</Text>
          <Text style={styles.cell}>{item.nombre}</Text>
          <Checkbox
            value={attendance[index]}
            onChange={value => handleAttendanceChange(index, value)} />
        </View>
      ))}

    </View>
    <View>
    {renderFloatingButton()}
    </View></>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
  },
  text: {
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  cell: {
    flex: 1,
    padding: 10,
    color: 'black', // Color del texto
  },
  header: {
    fontWeight: 'bold',
  },
  checkbox: {
    padding: 5,
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: 'blue',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default Table;
