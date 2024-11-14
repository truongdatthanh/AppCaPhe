import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const RegisterScreen = () => {
    const [name, setName] = useState('1');
    const [email, setEmail] = useState('1');
    const [password, setPassword] = useState('1');
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const handleRegister = () => {
        if (name && email && password) {
            // Thêm logic xử lý đăng ký tại đây, ví dụ như gọi API
            Alert.alert(
                "Đăng nhập thành công",
                `Chào mừng, ${email}`,
                [
                    {
                        text: "OK",
                        onPress: () => setTimeout(() => {
                            navigation.navigate('login');
                        }, 100) // Chuyển hướng khi nhấn OK sau 0.1s
                    }
                ]
            );

        } else {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng Ký</Text>

            <TextInput
                style={styles.input}
                placeholder="Tên"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Đăng Ký</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
    },
    registerButton: {
        backgroundColor: '#28A745',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default RegisterScreen;