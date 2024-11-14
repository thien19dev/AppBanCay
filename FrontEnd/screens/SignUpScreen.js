import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';

const SignUpScreen = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://192.168.100.11:3000/api/users/register', {
                name,
                email,
                phone_number: phoneNumber,
                password,
            });

            if (response.data.token) {
                alert('Đăng ký thành công!');
                navigation.navigate('Login');  
            }
        } catch (err) {
            setError(err.response ? err.response.data.msg : 'Đã xảy ra lỗi' + err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.header}>Đăng Ký</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Họ và tên"
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
                placeholder="Số điện thoại"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button
                title={loading ? 'Đang đăng ký...' : 'Đăng ký'}
                onPress={handleSignUp}
                disabled={loading}
            />

            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                Đã có tài khoản? Đăng nhập ngay.
            </Text>
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    link: {
        textAlign: 'center',
        color: 'blue',
        marginTop: 10,
    },
})