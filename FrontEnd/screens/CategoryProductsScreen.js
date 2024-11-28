import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LINK_API } from '../components/LinkApi';

const screenWidth = Dimensions.get('window').width;
const spacing = 0;
const columnGap = 0;
const itemWidth = (screenWidth - 2 * spacing - columnGap) / 2;


const CategoryProductsScreen = ({ route, navigation }) => {
    const { categoryId, categoryName } = route.params;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchCategoryProducts();
    }, []);

    const fetchCategoryProducts = async () => {
        console.log("categoryId:", categoryId);
        console.log("categoryName:", categoryName);
        try {
            const response = await fetch(`${LINK_API}/api/product?category_id=${categoryId}`);
            const data = await response.json();

            const filteredProducts = data.filter(
                (product) => product.product_category.category_name === categoryName
            );
            setProducts(filteredProducts);
            console.log("Products:", data);
            console.log("Category products:", filteredProducts);
        } catch (error) {
            console.error("Error fetching category products:", error);
        }
    };

    const renderProductItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.product_image }} style={styles.image} />
            <Text style={styles.name}> {item.product_name}</Text>
            <Text style={styles.category}>Đặc tính: {item.product_attributes}</Text>
            <Text style={styles.price}>Price: {item.product_price} VND</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{categoryName}</Text>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                numColumns={2}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.list}
                columnWrapperStyle={styles.columnWrapper}
            />


            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Quay lại</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CategoryProductsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
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
    image: {
        width: '100%',
        height: '180',
        resizeMode: 'cover',
        borderRadius: 5,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        marginTop: 5,
    },
    price: {
        fontSize: 16,
        color: '#888',
    },
    backButton: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        margin: 20,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});