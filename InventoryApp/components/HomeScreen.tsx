import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {
  const [inventory, setInventory] = useState([
    { id: '1', name: 'Item 1', category: 'Category A', quantity: 15 },
    { id: '2', name: 'Item 2', category: 'Category B', quantity: 8 },
  ]);
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [categories, setCategories] = useState<string[]>([]);

  // Update categories 
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(inventory.map(item => item.category)) // Get unique categories
    );
    setCategories(uniqueCategories);
  }, [inventory]);

  const handleDelete = (id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredInventory = filterCategory
    ? inventory.filter((item) => item.category === filterCategory)
    : inventory;

  const sortedInventory = filteredInventory.sort((a, b) =>
    sortOrder === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={[styles.item, item.quantity < 10 && styles.lowStock]}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemCategory}>Category: {item.category}</Text>
      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddEditItem', { item, setInventory })}
      >
        <MaterialIcons name="edit" size={20} color="white" />
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={() => handleDelete(item.id)}
      >
        <MaterialIcons name="delete" size={20} color="white" />
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inventory Management</Text>
      <Picker selectedValue={filterCategory} onValueChange={(value) => setFilterCategory(value)} style={styles.picker}>
        <Picker.Item label="All Categories" value="" />
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.sortButton} onPress={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}>
        <Text style={styles.sortButtonText}>Sort by Quantity ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})</Text>
      </TouchableOpacity>
      <FlatList
        data={sortedInventory}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEditItem', { setInventory })}
      >
        <Text style={styles.addButtonText}>Add New Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#343a40' },
  picker: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  sortButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  sortButtonText: { color: '#fff', fontSize: 16 },
  list: { marginBottom: 50 },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#007bff' },
  itemCategory: { fontSize: 16, color: '#6c757d' },
  itemQuantity: { fontSize: 16, color: '#28a745' },
  lowStock: { backgroundColor: '#f8d7da' },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    marginTop: 5,
  },
  buttonText: { color: '#fff', marginLeft: 5 },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 18 },
});
