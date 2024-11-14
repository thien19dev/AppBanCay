import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";

import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }
    
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            <Tab.Screen name="Search" component={SearchScreen} options={{headerShown:false}}/>
            <Tab.Screen name="Notification" component={NotificationScreen} options={{headerShown:false}}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
        </ Tab.Navigator >
    );
}