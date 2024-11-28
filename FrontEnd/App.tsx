import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'; // Import Provider từ react-redux
import store from './src/Redux/store'; // Đường dẫn đến store của bạn

import BottomTabNavigator from './components/BottomTabNavigator';
import CartScreen from './screens/CartScreen';
import CategoryProductsScreen from './screens/CategoryProductsScreen';
import DetailProductScreen from './screens/DetailProductScreen';
import EditProfile from './screens/EditProfile';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}> {/* Bao bọc ứng dụng trong Provider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="CategoryProductsScreen" component={CategoryProductsScreen} />
          <Stack.Screen name="DetailProduct" component={DetailProductScreen} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="CartScreen" component={CartScreen} options={{ title: 'Giỏ hàng' }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
