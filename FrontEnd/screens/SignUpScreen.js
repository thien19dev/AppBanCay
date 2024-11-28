import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { registerUser } from '../src/Redux/actions/userActions';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').height;
const bannerHeight = screenWidth / 2.5;

const SignUpScreen = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { loading, error, userInfo } = useSelector((state) => state.user);

  const handleRegister = () => {
    const userData = { username, email, password, phoneNumber };
    dispatch(registerUser(userData));
  };

  if (userInfo) {
    navigation.navigate('MainTabs');
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://res.cloudinary.com/dtgx1dpzb/image/upload/v1731642068/Ellipse_1_i1wg7t.png' }}
        style={styles.backgroundImage}
      />
      <Text style={styles.welcomeText}>Chào mừng bạn</Text>
      <Text style={styles.loginText}>Đăng ký tài khoản</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên"
          value={username}
          onChangeText={setName}
        />
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
            <Text>{showPassword ? 'Ẩn' : 'Hiện'}</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>Đăng ký</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.registerText}>Bạn có tài khoản? Đăng Nhập Ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

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
  registerText: {
    marginTop: 20,
    color: '#3498db',
    fontSize: 14,
  },
});
