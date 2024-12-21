import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../types/route';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
const SettingScreen = () =>
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
        <View style={ styles.container }>
            <View>
                <View style={ styles.header }>
                    <TouchableOpacity onPress={ () => navigation.goBack() }>
                        <Ionicons name="chevron-back" size={ 24 } color="black" />
                    </TouchableOpacity>
                    <Text style={ styles.headerTitle }>Cài Đặt</Text>
                </View>
            </View>

            <View>
                <Text style={ { color: "#73554e", fontSize: 20 } }>Cài Đặt Tài Khoản</Text>
                <View>
                    <TouchableOpacity style={ styles.option } onPress={ () => console.log( 'Cài Đặt Tài Khoản' ) }>
                        <FontAwesome name="user-times" size={ 24 } color="#b43d48" />
                        <Text style={ { color: "#b43d48", fontWeight: "500" } }>Xóa Tài Khoản</Text>
                        <AntDesign name="right" size={ 15 } color="#b43d48" />
                    </TouchableOpacity>
                </View>

                <Text style={ { color: "#73554e", fontSize: 20 , marginTop: 10 } }>Bảo Mật</Text>
                <View>
                    <TouchableOpacity style={ styles.option } onPress={ () => navigation.navigate( 'changePassword' ) }>
                        <FontAwesome name="lock" size={ 24 } color="#70564b" />
                        <Text style={ { color: "#70564b" } }>Thay Đổi Mật Khẩu</Text>
                        <AntDesign name="right" size={ 15 } color="#70564b" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f1f1f1',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    settingText: {
        fontSize: 18,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        marginVertical: 5,
    },
} );

export default SettingScreen;