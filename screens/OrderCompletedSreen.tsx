import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/route';

const OrderCompletedScreen = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const handleContinueShopping = () => {
        navigation.navigate('home2');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Completed!</Text>
            <Text style={styles.message}>Thank you for your purchase.</Text>
            <Button title="Continue Shopping" onPress={handleContinueShopping} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    message: {
        fontSize: 16,
        marginBottom: 40,
    },
});

export default OrderCompletedScreen;