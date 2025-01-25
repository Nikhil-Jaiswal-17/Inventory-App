import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function AddEditItemScreen({ route, navigation }: any) {
  const { item, setInventory } = route.params || {};
  const [name, setName] = useState(item ? item.name : '');
  const [category, setCategory] = useState(item ? item.category : '');
  const [quantity, setQuantity] = useState(item ? item.quantity.toString() : '');

  const handleSave = () => {
    const newItem = { id: item ? item.id : Date.now().toString(), name, category, quantity: parseInt(quantity, 10) };
    if (item) {
      // Edit existing item
      setInventory((prev: any) => prev.map((i: any) => (i.id === item.id ? newItem : i)));
    } else {
      // Add new item
      setInventory((prev: any) => [...prev, newItem]);
    }
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{item ? 'Edit Item' : 'Add New Item'}</Text>
      
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter item name"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Category:</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter category"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Quantity:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Enter quantity"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f8f9fa' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#343a40', textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5, color: '#495057' },
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#495057',
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
