import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text onPress={() => navigation.navigate('Loading')}>Go to Profile</Text>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View style={styles.center}>
      <Text>Profile Screen</Text>
    </View>
  );
};

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Profile'); // Chuyển đến màn hình Profile sau 2 giây
    }, 2000);

    return () => clearTimeout(timeout); // Xóa timeout khi component unmount
  }, [navigation]);

  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
};

export default function AppTest() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});