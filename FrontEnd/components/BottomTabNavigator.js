import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Image } from "react-native";




const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;
          let iconName;
          if (route.name === 'Home') {
            iconSource = focused ? require('../asset/images/2x/home2x.png') : require('../asset/images/2x/home2x.png');
          } else if (route.name === 'Search') {
            iconSource = focused ? require('../asset/images/2x/search2x.png') : require('../asset/images/2x/search2x.png');
          } else if (route.name === 'Notification') {
            iconSource = focused ? require('../asset/images/2x/notification2x.png') : require('../asset/images/2x/notification2x.png');
          }
          else if (route.name === 'Profile') {
            iconSource = focused
              ? require('../asset/images/2x/profile2x.png')
              : require('../asset/images/2x/profile2x.png');
          }

          return <Image source={iconSource} style={{ width: 20, height: 20 }} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </ Tab.Navigator >
  );
}