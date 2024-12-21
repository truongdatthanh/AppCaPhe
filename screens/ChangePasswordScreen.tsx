import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../types/route';
import { caphe } from '../services/caphe.service';


const ChangePasswordScreen = () =>
{
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const [ currentPassword, setCurrentPassword ] = useState( '' );
    const [ newPassword, setNewPassword ] = useState( '' );
    const [ confirmPassword, setConfirmPassword ] = useState( '' );
    const [ userId, setUserId ] = useState( "" );
   

    useEffect( () =>
    {
        AsyncStorage.getItem( 'UserId' ).then( ( value ) => setUserId( value ?? "" ) );
    }, [] );

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


    const handleChangePassword = () =>
    {
        if ( newPassword !== confirmPassword )
        {
            alert( 'Mật khẩu mới không trùng khớp' );
            return;
        }

        caphe.patchChangePassword( userId, currentPassword, newPassword ).then( ( res: any ) =>
        {
            console.log( res.data );
            alert( 'Thay đổi mật khẩu thành công' );
            navigation.reset( {
                index: 0,
                routes: [ { name: 'login' } ],
            } );
        } ).catch( ( err: any ) =>
        {
            console.log( err );
            alert( 'Mật khẩu cũng không chính xác' );
        } );
    };

    return (
        <View style={ styles.container }>
            <Text style={ { fontSize: 20, marginBottom: 10 } }>Thay Đổi Mật Khẩu</Text>
            <TextInput
                placeholder='Nhập Mật Khẩu Cũ'
                style={ styles.input }
                secureTextEntry
                value={ currentPassword }
                onChangeText={ setCurrentPassword }
            />

            <TextInput
                placeholder='Nhập Mật Khẩu Mới'
                style={ styles.input }
                secureTextEntry
                value={ newPassword }
                onChangeText={ setNewPassword }
            />

            <TextInput
                placeholder='Xác Nhận Mật Khẩu'
                style={ styles.input }
                secureTextEntry
                value={ confirmPassword }
                onChangeText={ setConfirmPassword }
            />
            <TouchableOpacity style={ styles.btnSubmit } onPress={ handleChangePassword }>
                <Text style={ { color: "#fff", fontWeight: "500" } }>THAY ĐỔI MẬT KHẨU</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    btnSubmit: {
        backgroundColor: "#b43d48",
        padding: 10,
        borderRadius: 40,
        alignItems: "center",
        marginTop: 20,
        position: "absolute",
        bottom: 15,
        left: 15,
        right: 15,
    },
} );

export default ChangePasswordScreen;