import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RootStackParamList } from '../types/route';

const CheckoutScreen = () =>
{
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const handleCheckout = () =>
    {
        console.log('Checkout button pressed');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Checkout</Text>
            <Button title="Proceed to Payment" onPress={handleCheckout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default CheckoutScreen;