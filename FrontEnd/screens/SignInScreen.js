// const handleSignin = async () => {
//     try {
//         const response = await fetch(${LINK_API}/users/signin, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//         });

//         const data = await response.json();

//         if (response.status === 200) {
//             // Đăng nhập thành công, lưu token
//             console.log('Login successful:', data);
//             // Ví dụ: Lưu token vào AsyncStorage hoặc State
//             AsyncStorage.setItem('token', data.token);
//             navigation.navigate('MainTabs'); // Điều hướng đến màn hình chính
//         } else {
//             // Hiển thị lỗi nếu có
//             setErrorMessage(data.message || 'Error during signin');
//         }
//     } catch (error) {
//         console.error('Error during signin:', error);
//         setErrorMessage('Server error');
//     }
// };




import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../src/Redux/reducers/userSlice'; // Assuming login action is already defined
import { LINK_API } from '../components/LinkApi';

const screenWidth = Dimensions.get('window').height;
const bannerHeight = screenWidth / 2.5;

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();  // Access Redux dispatch

    const handleSignin = async () => {
        try {
            const response = await fetch(`${LINK_API}/users/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                // Đăng nhập thành công
                console.log('Login successful:', data);

                // Dispatch action to store user data and token in Redux store
                dispatch(login({ user: data.user, token: data.token }));

                // Điều hướng đến màn hình chính
                navigation.navigate('MainTabs');
            } else {
                // Hiển thị lỗi nếu có
                setError(data.message || 'Error during signin');
            }
        } catch (error) {
            console.error('Error during signin:', error);
            setError('Server error');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: "https://res.cloudinary.com/dtgx1dpzb/image/upload/v1731642068/Ellipse_1_i1wg7t.png" }}
                style={styles.backgroundImage} />
            <Text style={styles.welcomeText}>Chào mừng bạn</Text>
            <Text style={styles.loginText}>Đăng nhập tài khoản</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        value={password}
                        secureTextEntry={!showPassword}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Text>{showPassword ? "Ẩn" : "Hiện"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.checkboxContainer}>
                <View style={styles.rememberContainer}>
                    <Text style={styles.rememberText}>Nhớ tài khoản</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleSignin}>
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Hoặc</Text>

            <View style={styles.socialLoginContainer}>
                <TouchableOpacity>
                    <Image source={require('../asset/images/2x/gg.png')} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../asset/images/2x/fb.png')} style={styles.socialIcon} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.registerText}>Bạn không có tài khoản? Tạo tài khoản</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    backgroundImage: {
        width: '100%',
        height: bannerHeight,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
    },
    loginText: {
        fontSize: 16,
        color: '#777',
    },
    inputContainer: {
        width: '80%',
        marginTop: 20,
    },
    input: {
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    passwordContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingRight: 10,
        marginBottom: 10,
    },
    errorText: {
        color: '#e74c3c',
        marginTop: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
    },
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberText: {
        marginLeft: 5,
        color: '#333',
    },
    forgotPasswordText: {
        color: '#3498db',
    },
    loginButton: {
        backgroundColor: '#27ae60',
        width: '80%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    orText: {
        marginTop: 20,
        color: '#777',
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
        marginTop: 10,
    },
    socialIcon: {
        width: 40,
        height: 40,
        marginHorizontal: 10,
    },
    registerText: {
        marginTop: 20,
        color: '#3498db',
        fontSize: 14,
    },
});
