import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { LINK_API } from '../components/LinkApi';


const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    fetchProducts();

  }, []);

  const resetSearch = () => {
    setProducts(originalProducts);
    setSearchText('');
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${LINK_API}/api/product/`);
      const data = await response.json();
      const randomProducts = data.sort(() => 0.5 - Math.random());
      setProducts(randomProducts);
      setOriginalProducts(randomProducts);
      console.log("Products:", randomProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = () => {
    const filteredProducts = products.filter((item) =>
      item.product_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setProducts(filteredProducts);
  };


  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.product_image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.product_name}</Text>
        <Text style={styles.productPrice}>{item.product_price.toLocaleString()}đ</Text>
        <Text style={styles.productStock}>Còn {item.stock} sp</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>TÌM KIẾM</Text>
        <TouchableOpacity>
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      {/* Body */}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Spider Plant"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
        {searchText !== '' && (
          <TouchableOpacity onPress={resetSearch} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>❌</Text>
          </TouchableOpacity>
        )}
      </View>


      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.resultsContainer}
      />

    </View >
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  backButtonText: {
    fontSize: 14,
  },
  backButton: {
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartIcon: {
    fontSize: 18,
  },


  backButton: {
    fontSize: 18,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#1e90ff',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  searchButton: {
    padding: 8,
  },
  searchButtonText: {
    fontSize: 18,
  },
  resultsContainer: {
    paddingBottom: 16,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
  },
  productStock: {
    fontSize: 12,
    color: '#1e90ff',
  },
})