import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState('1');
    const [password, setPassword] = useState('1');
    const [showPassword, setShowPassword] = useState(true);
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const handleLogin = () => {
        if (email && password) {
            // Ở đây bạn có thể thêm logic xử lý đăng nhập, chẳng hạn gọi API
            navigation.navigate('home');
        } else {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
        }
    };

    const handleRegister = () => {
        navigation.navigate('register');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng Nhập</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={"#FFD15C"}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry={showPassword}
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor={"#FFD15C"}
                />

                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Entypo
                        name={!showPassword ? "eye"  : "eye-with-line"}  // Hiển thị biểu tượng "eye" nếu showPassword = true, "eye-with-line" nếu false
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>


            <View style={styles.externalIcon}>
                <View style={styles.icon}>
                    <AntDesign name="google" size={30} color="white" />
                </View>
                <View style={styles.icon}>
                    <AntDesign name="facebook-square" size={30} color="blue" />
                </View>
            </View>
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.register} onPress={handleRegister}>
                    <Text style={styles.registerTitle}>Bạn chưa có tài khoản? Đăng ký ngay!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.forgotPassword} onPress={() => alert("Quen mat khau")}>
                    <Text style={styles.forgotPasswordTitle}>Quên mật khẩu</Text>
                </TouchableOpacity>
            </View>

            <Button title="Đăng Nhập" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#662C1B',
        height: "100%",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
        color: "#FFD15C",
    },
    input: {
        height: 40,
        borderColor: '#FFD15C',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
        color: "#FFD15C",
    },
    passwordContainer: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    icon: {
        margin: 10
    },
    externalIcon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    register: {
        marginVertical: 5,
    },
    registerTitle: {
        fontSize: 15,
        color: "blue",
        textDecorationLine: "underline",
        fontWeight: "400",
    },
    forgotPassword: {
        marginVertical: 5,
    },
    forgotPasswordTitle: {
        fontSize: 15,
        color: "blue",
        textDecorationLine: "underline",
        fontWeight: "400",
    },
});

export default LoginScreen;
