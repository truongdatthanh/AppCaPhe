import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/route';

const OrderCompletedScreen = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();


    const handleContinueShopping = () => {
        navigation.navigate('home2');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thanh toán thành công!</Text>
            <Text style={ styles.message }>Cảm ơn bạn đã mua hàng của chúng tôi.</Text>
            <Text style={styles.message}>Đơn hàng của bạn đang được xử lý!</Text>
            <Button title="Tiếp tục mua sắm" onPress={handleContinueShopping} />
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