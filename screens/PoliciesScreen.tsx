import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RootStackParamList } from '../types/route';

const PoliciesScreen = () =>
{
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    useFocusEffect(
        useCallback( () =>
        {
            navigation.getParent()?.setOptions( { tabBarStyle: { display: 'none' } } ); // Ẩn TabBar

            return () =>
            {
                navigation.getParent()?.setOptions( { tabBarStyle: { display: 'flex' } } ); // Hiển thị lại TabBar khi rời khỏi màn hình
            };
        }, [ navigation ] )
    );

    return (
        <ScrollView contentContainerStyle={ styles.container }>
            <Text style={ styles.header }>Chính sách</Text>
            <Text style={ styles.content }>
                Chào mừng đến với Chính sách của chúng tôi. Tại đây bạn sẽ tìm thấy tất cả thông tin liên quan đến chính sách của chúng tôi.
            </Text>
            <Text style={ styles.subHeader }>Chính sách bảo mật</Text>
            <Text style={ styles.content }>
                Quyền riêng tư của bạn rất quan trọng đối với chúng tôi. Chúng tôi cam kết bảo vệ thông tin cá nhân và quyền riêng tư của bạn.
            </Text>
            <Text style={ styles.subHeader }>Điều khoản dịch vụ</Text>
            <Text style={ styles.content }>
                Bằng cách sử dụng dịch vụ của chúng tôi, bạn đồng ý với các điều khoản và điều kiện của chúng tôi. Vui lòng đọc kỹ các điều khoản và điều kiện này.
            </Text>
            <Text style={ styles.subHeader }>Chính sách hoàn trả</Text>
            <Text style={ styles.content }>
                Nếu bạn không hài lòng với sản phẩm đã mua, bạn có thể yêu cầu hoàn lại tiền trong vòng 07 ngày kể từ ngày mua.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create( {
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
    },
} );

export default PoliciesScreen;