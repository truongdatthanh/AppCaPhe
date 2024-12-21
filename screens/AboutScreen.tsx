import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types/route";

const AboutScreen = () =>
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
            {/* Logo */ }
            {/* <Image
                source={ { uri: "https://your-logo-url.com/logo.png" } } // Thay đường dẫn bằng logo của bạn
                style={ styles.logo }
            /> */}

            {/* App name */ }
            <Text style={ styles.appName }>2003's Coffee</Text>

            {/* Version */ }
            <Text style={ styles.version }>Phiên bản: 1.0.0</Text>

            {/* Other information */ }
            <Text style={ styles.info }>© 2024 2003's Coffee. Tất cả các quyền được bảo lưu.</Text>

        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 16,
    },
    appName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    version: {
        fontSize: 16,
        color: "#666",
        marginBottom: 16,
    },
    info: {
        fontSize: 14,
        color: "#999",
        textAlign: "center",
        marginBottom: 16,
    },
    link: {
        fontSize: 14,
        color: "#007BFF",
        textDecorationLine: "underline",
    },
} );

export default AboutScreen;
