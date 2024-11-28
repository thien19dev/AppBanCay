import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LINK_API } from '../components/LinkApi';



const DetailProductScreen = ({ navigation, route }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProductDetail();
    }, []);

    const fetchProductDetail = async () => {
        try {
            const response = await fetch(`${LINK_API}/api/product/${productId}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    if (!product) {
        return <Text>Loading...</Text>;
    }

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const addToCart = async () => {
        try {
            const response = await fetch(`${LINK_API}cart/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: '12345', // Thay bằng userId thực tế (nếu có logic đăng nhập)
                    productId: productId,
                    quantity: quantity,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                Alert.alert('Thành công', 'Sản phẩm đã được thêm vào giỏ hàng!');
            } else {
                Alert.alert('Thất bại', data.message || 'Không thể thêm vào giỏ hàng.');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi thêm vào giỏ hàng.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Go back</Text>


                </TouchableOpacity>
                <Text style={styles.title}>{product.product_name}</Text>
                <TouchableOpacity>
                    <Text style={styles.cartIcon}>🛒</Text>
                </TouchableOpacity>
            </View>

            <Image source={{ uri: product.product_image }} style={styles.productImage} />


            <View style={styles.productInfo}>
                <View style={styles.tagContainer}>
                    <Text style={styles.tag}>Cây trồng</Text>
                    <Text style={styles.tag}>Ưa bóng</Text>
                </View>

                <Text style={styles.price}>Giá: {product.product_price} VND</Text>

                <View style={styles.detailContainer}>
                    <Text style={styles.sectionTitle}>Chi tiết sản phẩm</Text>
                    <View style={styles.detailRow}>
                        <Text>Kích cỡ</Text>
                        <Text>{product.product_size}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text>Xuất xứ</Text>
                        <Text>{product.product_origin}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text>Tình trạng</Text>
                        <Text style={styles.stockText}>Còn {product.product_available} sp</Text>
                    </View>
                </View>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, }}>
                <View>
                    <Text>Đã chọn {quantity} sản phẩm</Text>
                    <View style={styles.quantitySelector}>
                        <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.quantityContainer}>
                    <Text>Tạm Tính: </Text>
                    <Text style={styles.totalText}>{(product.product_price * quantity).toLocaleString()}đ</Text>
                </View>



            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
                    <Text style={styles.addToCartButtonText}>THÊM VÀO GIỎ HÀNG</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.purchaseButton}>
                    <Text style={styles.purchaseButtonText}>CHỌN MUA</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    )
}

export default DetailProductScreen

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
    productImage: {
        width: '100%',
        height: 350,
        borderRadius: 8,
    },
    productInfo: {
        paddingHorizontal: 10,
    },
    tagContainer: {
        flexDirection: 'row',
        justifyContent: 'start',
        marginVertical: 8,
        gap: 8,
    },
    tag: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        textAlign: 'start',
        marginVertical: 8,
    },
    detailContainer: {
        marginVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 8,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    stockText: {
        color: '#4CAF50',
    },
    quantityContainer: {
        flexDirection: 'column',
        gap: 8,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantitySelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
    },
    quantityButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
    quantityButtonText: {
        fontSize: 18,
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 16,
    },
    purchaseButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    purchaseButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginTop: 16,
        gap: 8, // Khoảng cách giữa các nút
    },
    addToCartButton: {
        flex: 2, // Chiếm 2 phần
        backgroundColor: '#FFA500', // Màu cam
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    addToCartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    purchaseButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    purchaseButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

})