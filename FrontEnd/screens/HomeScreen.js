import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductContainerHomePage from '../components/ProductContainerHomePage'

const screenWidth = Dimensions.get('window').width;
const spacing = 10;
const columnGap = 16;
const itemWidth = (screenWidth - 2 * spacing - columnGap) / 2;
const LINK_API ="http://192.168.100.2:3001/api/";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${LINK_API}product/`);
      const data = await response.json();
      // Sắp xếp ngẫu nhiên toàn bộ sản phẩm mà không giới hạn
      const randomProducts = data.sort(() => 0.5 - Math.random());
      setProducts(randomProducts);
      console.log("Products:", randomProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${LINK_API}category/`); // Cập nhật link API danh mục
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Hàm render từng sản phẩm
  const renderProductItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.product_image }} style={styles.image} />
      <Text style={styles.name}> {item.product_name}</Text>
      <Text style={styles.category}>Đặc tính: {item.product_attribute}</Text>
      <Text style={styles.price}>Price: {item.product_price} VND</Text>
    </View>
  );

  // Hàm render từng danh mục cùng với sản phẩm thuộc danh mục đó
  const renderCategory = ({ item: category }) => {
    // Lọc sản phẩm theo category_id
    const filteredProducts = products.filter(product => product.category_category === category.category_id).slice(0, 4);

    return (
      <View>
        <Text style={styles.h2}>{category.category_name}</Text>
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    );
  };

  // Header
  const renderHeader = () => (
    <View>
      <Image source={require('../asset/images/4x/banner.png')} style={styles.image} />
      <Text style={styles.mainHeading}>Planta - tỏa sáng không gian nhà bạn</Text>
      <TouchableOpacity style={styles.newProductBtn}>
        <Text style={styles.buttonText}>Xem hàng mới về</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.category_id.toString()}
      />
    </View>
  );
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemContainer: {
    width: itemWidth,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  mainHeading: {
    position: 'absolute',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  newProductBtn: {
    position: 'absolute',
    top: 50,
    marginTop: 20,
    backgroundColor: '#4CAF5000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    opacity: 0.7,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
})