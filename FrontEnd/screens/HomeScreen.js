import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LINK_API } from '../components/LinkApi';
import { useSelector } from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const spacing = 0;
const columnGap = 0;
const itemWidth = (screenWidth - 2 * spacing - columnGap - 40) / 2;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();

  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${LINK_API}/api/product/`);
      const data = await response.json();
      const randomProducts = data.sort(() => 0.5 - Math.random());
      setProducts(randomProducts);
      console.log("Products:", randomProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${LINK_API}/api/category/`);
      const data = await response.json();
      setCategories(data);
      console.log("Categories:", data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('DetailProduct', { productId: item._id })}
      key={item._id} // Ensure each product has a unique key
    >
      <Image source={{ uri: item.product_image }} style={styles.image} />
      <Text style={styles.name}> {item.product_name}</Text>
      <Text style={styles.category}>Đặc tính: {item.product_attributes}</Text>
      <Text style={styles.price}>Price: {item.product_price} VND</Text>
    </TouchableOpacity>
  );

  const renderCategory = ({ item: category }) => {
    const filteredProducts = products.filter(product => product.product_category !== null && (product.product_category._id === category._id)).slice(0, 4);

    return (
      <View style={{ paddingHorizontal: 20 }} key={category._id}> {/* Ensure each category has a unique key */}
        <Text style={styles.h2}>{category.category_name}</Text>
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item._id} // Unique key for products within categories
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.columnWrapper}
        />

        <TouchableOpacity style={styles.productCategory} onPress={() => navigation.navigate('CategoryProductsScreen', {
          categoryId: category._id,
          categoryName: category.category_name,
        })}>
          <Text style={styles.buttonTextProductCategory}>Xem thêm {category.category_name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Header
  const renderHeader = () => (
    <View style={{ backgroundColor: "#f6f6f6", paddingHorizontal: 10, paddingTop: 30 }}>
      <View>
        <Text style={styles.textBanner}>Planta - tỏa sáng</Text>
        <Text style={styles.textBanner}>Không gian nhà bạn</Text>
        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }}>
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.newProductBtn}>
          <Text style={styles.buttonText}>Xem hàng mới về</Text>
        </TouchableOpacity>
        <Image source={require('../asset/images/4x/banner.png')} style={styles.imageBanner} />
      </View>
    </View>
  );

  // Footer
  const renderFooter = () => (
    <View style={{ backgroundColor: "#fff", paddingHorizontal: screenWidth / 25, width: '100%', paddingBottom: 50 }}>
      <Text style={styles.h1}>Combo Chăm Sóc Mới</Text>
      <View style={{ flexDirection: 'row', backgroundColor: '#f6f6f6', paddingHorizontal: screenWidth / 25, borderRadius: 10 }}>
        <View style={{ flex: '2' }}>

          <Text style={styles.h3}>Lemon Balm Grow Kit </Text>
          <Text style={styles.h5}>Gồm: hạt giống Lemon Balm,</Text>
          <Text style={styles.h5}>gói đất hữu cơ, chậu Planta,</Text>
          <Text style={styles.h5}>marker đánh dấu...</Text>
        </View>
        <Image
          source={{ uri: 'https://res.cloudinary.com/dtgx1dpzb/image/upload/v1731637963/grow-kit-main_540x_1_1_v6cm8f.png' }}
          style={{ flex: '1', height: 200, width: 150, resizeMode: 'cover', borderRadius: 5 }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item._id.toString()} // Corrected unique key for categories
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default HomeScreen;

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
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  imageBanner: {
    zIndex: 1,
    width: '100%',
    height: '180',
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '180',
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  mainHeading: {
    position: 'absolute',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  textBanner: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'start',
    color: '#333',
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'start',
    color: '#333',
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  h3: {
    fontSize: 24,
    fontWeight: 'normal',
    marginTop: 20,
    color: '#333',
  },
  h5: {
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 20,
    color: '#333',
  },
  productCategory: {
    padding: 10,
    backgroundColor: '#4CAF5000',
    borderRadius: 5,
    margin: 20,
    alignItems: 'left',
  },
  newProductBtn: {
    zIndex: 2,
    position: 'absolute',
    top: 10,
    textAlign: 'left',
    backgroundColor: '#4CAF5000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    opacity: 0.7,
  },
  buttonTextProductCategory: {
    color: '#000',
    fontSize: 16,
    textAlign: 'right',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  cartIcon: {
    fontSize: 24,
  }
});
