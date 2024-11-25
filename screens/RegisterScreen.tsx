import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { caphe } from '../services/caphe.service';

const RegisterScreen = () => {
    const [username, setUserName] = useState('dattruong');
    const [name, setName] = useState('Trương Thành Đạt');
    const [email, setEmail] = useState('truongdatzzz612@gmail.com');
    const [password, setPassword] = useState('12345678');
    const [confirmPassword, setConfirmPassword] = useState('12345678');
    const [phoneNumber, setPhoneNumber] = useState('0943369278');
    const [showPassword, setShowPassword] = useState(true);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState( true );
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const [NameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const isPhoneNumberValid = (phone: string) => /^[0-9]+$/.test(phone);
    const isEmailValid = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const handleRegister = async () => {
        // Đặt lại thông báo lỗi
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setPhoneNumberError('');

        // Kiểm tra từng trường hợp và hiển thị lỗi nếu có
        if (!name) {
            setNameError('Tên không được để trống');
            return;
        }
        if (!email) {
            setEmailError('Email không được để trống');
            return;
        }
        else if (!isEmailValid(email)) {
            setEmailError('Email không hợp lệ');
            return;
        }
        if (!password) {
            setPasswordError('Vui lòng nhập mật khẩu');
            return;
        }
        else if (password.length < 8) {
            setPasswordError('Mật khẩu phải có ít nhất 8 ký tự');
            return;
        }
        else if (confirmPassword.length < 8) {
            setConfirmPasswordError('Mật khẩu phải có ít nhất 8 ký tự');
            return;
        }
        if (!confirmPassword) {
            setConfirmPasswordError('Vui lòng nhập lại mật khẩu');
            return;
        }
        else if (password !== confirmPassword && password.length >= 8 && confirmPassword.length >= 8) {
            setConfirmPasswordError('Mật khẩu không trùng khớp');
            return;
        }
        if (!phoneNumber) {
            setPhoneNumberError('Vui lòng nhập số điện thoại');
            return;
        }
        else if (!isPhoneNumberValid(phoneNumber)) {
            setPhoneNumberError('Số điện thoại không hợp lệ');
            return;
        }

        if (name && username && email && password && confirmPassword && phoneNumber) {
            Alert.alert(
                "Đăng ký thành công",
                `Chào mừng, ${username}`,
                [{
                    text: "OK",
                    onPress: () => setTimeout(() => navigation.navigate('login'), 100)
                }]
            );
        }
        else {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
        }

        const response = await caphe.postRegister( { name, username, email, password, phoneNumber, avatar: '', address: ''} );
        console.log( response.data );

    };

    const handleLogin = () => {
        navigation.navigate('login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tạo Tài Khoản</Text>

            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Họ Tên"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor={'gray'}
                />
            </View>

            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChangeText={ setUserName }
                    placeholderTextColor={'gray'}
                />
            </View>

            <View>
                <Text style={styles.errorText}>{emailError}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>



            <Text style={styles.errorText}>{passwordError}</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry={showPassword}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Entypo
                        name={!showPassword ? "eye-with-line" : "eye"} // Hiển thị biểu tượng "eye-with-line" nếu showPassword = true, "eye" nếu false : }  // Hiển thị biểu tượng "eye" nếu showPassword = true, "eye-with-line" nếu false
                        size={20}
                        color="black"
                    />
                </TouchableOpacity>
            </View>


            <Text style={styles.errorText}>{confirmPasswordError}</Text>
            <View style={styles.confirmPasswordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry={showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                    <Entypo
                        name={!showConfirmPassword ? "eye-with-line" : "eye"} // Hiển thị biểu tượng "eye-with-line" nếu showPassword = true, "eye" nếu false : }  // Hiển thị biểu tượng "eye" nếu showPassword = true, "eye-with-line" nếu false
                        size={20}
                        color="black"
                    />
                </TouchableOpacity>
            </View>


            <View>
                <Text style={styles.errorText}>{phoneNumberError}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType='numeric'
                />
            </View>


            <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Tạo Tài Khoản</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <View style={styles.login} >
                    <Text style={styles.loginTitle}>Đã Có Tài Khoản?</Text>
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.loginTitle2}>
                            Đăng Nhập Ngay Đi!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    errorText: {
        color: 'red',
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
        marginVertical: 10,
    },
    registerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    passwordContainer: {
        position: 'relative',
    },
    confirmPasswordContainer: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    login: {
        top: 130,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    loginTitle: {
        fontSize: 17,
        color: "#88776e",
        fontWeight: "400",
    },
    loginTitle2: {
        fontSize: 17,
        color: "#b03b47",
        fontWeight: "bold",
        marginLeft: 10,
    },
});

export default RegisterScreen;