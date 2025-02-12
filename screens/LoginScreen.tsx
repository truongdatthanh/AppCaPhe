import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, StatusBar, Image } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { caphe } from '../services/caphe.service';
import { RootStackParamList } from '../types/route';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () =>
{
    const [ username, setUsername ] = useState( 'dattruong' );
    const [ password, setPassword ] = useState( '12345678' );
    const [ showPassword, setShowPassword ] = useState( true );
    const navigation: NavigationProp<RootStackParamList> = useNavigation();


    const handleLogin = async () =>
    {
        try
        {
            const response = await caphe.postLogin( { username, password } );
            console.log( response.data );

            if ( response.status === 200 )
            {
                const currentUser = response.data.user;
                console.log( "currentUSer ", currentUser );
                Alert.alert( 'Đăng nhập thành công!', `Xin chào ${ username }` );
               

                AsyncStorage.setItem( 'UserId', currentUser._id );
                AsyncStorage.setItem( 'UserName', currentUser.username );
                AsyncStorage.setItem( 'UserRole', currentUser.role );

                //Chuyển hướng về trang chủ
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'home' }],
                } );
                
            } else
            {
                console.log( response.data.message );
                Alert.alert( 'Đăng nhập thất bại!', 'Thông tin không hợp lệ!' );
            }
        } catch ( error )
        {
            // console.error( error );
            Alert.alert( 'Lỗi', 'Tài khoản hoặc mật khẩu không chính xác!' );
        }
    };



    const handleRegister = () =>
    {
        navigation.navigate( 'register' );
    };

    const handleLoginGoogle = () =>
    {
        caphe.loginWithGoogle();
    };
    return (
        <View style={ styles.container }>
            <StatusBar
                animated={ true }
                backgroundColor="#b0272f"
                barStyle="dark-content"     // Options: 'default', 'light-content', 'dark-content'
            />

            <View>
                <Text style={ styles.title }>Chào mừng bạn đến với</Text>
                <Text style={ styles.title1 }>Cà Phê 2003's</Text>
            </View>

            <TextInput
                style={ styles.input }
                placeholder="Username"
                value={ username }
                onChangeText={ setUsername }
                placeholderTextColor={ "gray" }
            />

            <View style={ styles.passwordContainer }>
                <TextInput
                    style={ styles.input }
                    placeholder="Mật khẩu"
                    secureTextEntry={ showPassword }
                    value={ password }
                    onChangeText={ setPassword }
                    placeholderTextColor={ "gray" }
                />

                <TouchableOpacity onPress={ () => setShowPassword( !showPassword ) } style={ styles.eyeIcon }>
                    <Entypo
                        name={ !showPassword ? "eye-with-line" : "eye" } // Hiển thị biểu tượng "eye-with-line" nếu showPassword = true, "eye" nếu false : }  // Hiển thị biểu tượng "eye" nếu showPassword = true, "eye-with-line" nếu false
                        size={ 20 }
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            <View style={ styles.forgotPasswordContainer }>
                <TouchableOpacity style={ styles.forgotPassword } onPress={ () => alert( "Quen mat khau" ) }>
                    <Text style={ styles.forgotPasswordTitle }>Quên Mật Khẩu?</Text>
                </TouchableOpacity>
            </View>


            <View style={ styles.buttonSubmit }>
                <Button title="Đăng Nhập" onPress={ handleLogin } />
            </View>


            {/* <View style={ styles.line }>
                <Text style={ styles.lineText }></Text>
                <Text style={ styles.lineTitle }>hoặc</Text>
                <Text style={ styles.lineText }></Text>
                <TouchableOpacity onPress={() => handleLoginGoogle()}>
                    <Text> google </Text>
                </TouchableOpacity>
            </View> */}


            <View style={ styles.registerContainer }>
                <View style={ styles.register } >
                    <Text style={ styles.registerTitle }>Khách Hàng Mới?</Text>
                    <TouchableOpacity onPress={ handleRegister }>
                        <Text style={ styles.registerTitle2 }>
                            Tạo Một Tài Khoản!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create( {
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
        height: "100%",
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "gray",
    },
    title1: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
        color: "#b03b47",
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
        color: "black",
    },
    passwordContainer: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    buttonSubmit: {
        marginBottom: 10,
    },
    icon: {
        margin: 10,
    },
    iconImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 50,
        marginHorizontal: 20,
    },
    externalIcon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    register: {
        top: 190,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    registerTitle: {
        fontSize: 17,
        color: "#88776e",
        fontWeight: "400",
    },
    registerTitle2: {
        fontSize: 17,
        color: "#b03b47",
        fontWeight: "bold",
        marginLeft: 10,
    },
    forgotPasswordContainer: {
        alignItems: "flex-end",
        marginBottom: 20,
    },
    forgotPassword: {
        marginVertical: 5,
    },
    forgotPasswordTitle: {
        fontSize: 14,
        color: "#b03b47",
        fontWeight: "bold",
    },
    line: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20,
    },
    lineText: {
        flex: 1,
        height: 2,
        backgroundColor: "black",
    },
    lineTitle: {
        paddingHorizontal: 20,
        color: "black",
        fontSize: 15,
        fontWeight: "bold",
    }
} );

export default LoginScreen;
