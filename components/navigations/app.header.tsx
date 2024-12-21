import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Image } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { caphe } from "../../services/caphe.service";
import { RootStackParamList } from "../../types/route";


const AppHeader = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
  
    return (
        <View>
            <View style={style.container}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("profile")}>
                        <Image source={require("../../assets/img/caphe1.jpg")} style={{ width: 60, height: 60, borderRadius: 30}} />
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={style.searchBar}>
                        <TouchableOpacity onPress={() => navigation.navigate("search")}>
                            <Ionicons name="search" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>

    )
};

const style = StyleSheet.create({
    container: {
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "black",
    }, 
    headerBar: {
        borderWidth: 1,
        borderColor: "red",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        padding: 10,
    },
    headerContent: {
        flex: 0.9,
        borderWidth: 1,
        borderColor: "red",
    },
    headerText: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 20,
    },
    searchBar: {
        display: "flex",
        flexDirection: "row",
    },
});

export default AppHeader;

