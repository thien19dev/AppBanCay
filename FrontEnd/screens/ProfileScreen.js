import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../src/Redux/reducers/userSlice';
import store from '../src/Redux/store';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    console.log('User in ProfileScreen:', user);
  }, [user]);


  const handleLogout = () => {
    dispatch(logout()); // Xóa thông tin người dùng khỏi Redux
    navigation.navigate('SignIn'); // Điều hướng về màn hình đăng nhập
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>PROFILE</Text>

      {/* Nếu người dùng đã đăng nhập */}
      {user ? (
        <>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: user.avatar || "https://res.cloudinary.com/dtgx1dpzb/image/upload/v1731568589/samples/smile.jpg" }}
              style={styles.avatar}
            />
            <View>
              <Text>Full Name: {user.name || 'Nguyen Van A'}</Text>
              <Text>Email: {user.email || 'nguyena@gmail.com'}</Text>
            </View>
          </View>

          <View style={styles.optionContainer}>
            <Text style={styles.h3}>Chung</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <Text style={styles.h4}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>
            <Text style={styles.h4}>Cẩm nang trồng cây</Text>
            <Text style={styles.h4}>Lịch sử giao dịch</Text>
            <Text style={styles.h4}>Q & A</Text>

            <Text style={styles.h3}>Bảo mật và Điều khoản</Text>
            <Text style={styles.h4}>Điều khoản và điều kiện</Text>
            <Text style={styles.h4}>Chính sách quyền riêng tư</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={[styles.logout]}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // Nếu người dùng chưa đăng nhập
        <View style={styles.optionContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={[styles.signin]}>Đăng nhập/ Đăng Ký</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  optionContainer: {
    flexDirection: 'column',
    width: '100%',
    padding: 20,
    gap: 20,
  },
  h3: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#747474',
    borderBottomColor: '#747474',
    borderBottomWidth: 1,
    width: '100%',
  },
  h4: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#333',
    width: '100%',
  },
  signin: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#f00',
    width: '100%',
    textAlign: 'center',
  },
  logout: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#f00',
    width: '100%',
    textAlign: 'center',
  },
});
