import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const EditProfile = ({ navigation }) => {
    const [name, setName] = useState('Nguyen Van A');
    const [email, setEmail] = useState('nguyena@gmail.com');
    const [address, setAddress] = useState('123 ABC Street');
    const [phone, setPhone] = useState('0123456789');
    const [profileImage, setProfileImage] = useState('https://res.cloudinary.com/dtgx1dpzb/image/upload/v1731568589/samples/smile.jpg');
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}> Go back </Text>
                </TouchableOpacity>
                <Text style={styles.title}>CHỈNH SỬA THÔNG TIN</Text>
            </View>

            <TouchableOpacity style={styles.imageContainer} onPress={() => console.log('Chỉnh sửa ảnh')}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
            </TouchableOpacity>

            <Text style={styles.infoText}>
                Thông tin sẽ được lưu cho lần mua kế tiếp. Bấm vào thông tin chi tiết để chỉnh sửa.
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Họ tên"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Địa chỉ"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <Button title="Lưu thông tin" onPress={() => console.log('Thông tin đã được lưu')} />
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
    },
    backButton: {
        fontSize: 16,
        marginRight: 10,
    },

    backButtonContainer: {
        zIndex: 5,
        position: 'absolute',
        fontSize: 16,
        marginRight: 10,
    },
    title: {
        width: '100%',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 8,
    },
    editImageText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    infoText: {
        textAlign: 'center',
        fontSize: 14,
        color: 'gray',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginVertical: 8,
        borderRadius: 5,
    },
})