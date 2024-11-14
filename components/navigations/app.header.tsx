import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";


const AppHeader = () => {
    const navigation: any = useNavigation();
    const [search, setSearch] = useState("");
    const handleSearch = () => {
        // Thực hiện logic tìm kiếm ở đây
        console.log('Bạn đã tìm kiếm:', search);
    };
    return (
        <View>
            <View style={style.container}>
                {/* Header */}
                <View style={style.headerBar}>
                    <View style={style.headerDrawer}>
                        <Feather name="menu" size={30} color="black" onPress={() => { navigation.openDrawer() }} />
                    </View>
                    <View style={style.headerContent}>
                        <Text style={style.headerText}> HELLO </Text>
                    </View>
                </View>

                {/* Search bar */}
                <View>
                    <View style={style.searchBar}>
                        <TouchableOpacity onPress={handleSearch}>
                            <Ionicons name="search" size={24} color="gray" />
                        </TouchableOpacity>
                        <TextInput placeholder="Tim kiem tai day..." value={search} onChangeText={(data) => setSearch(data)} />
                    </View>
                </View>

            </View>
        </View>

    )
};

const style = StyleSheet.create({
    container: {
        backgroundColor: '#ccc',
        paddingHorizontal: 5,
        paddingVertical: 10,
        paddingTop: 45,
    },
    headerBar: {
        borderWidth: 1,
        borderColor: "red",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        padding: 10,
    },
    headerDrawer: {
        borderWidth: 1,
        borderColor: "red",
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
        borderBottomColor: "red",
        borderBottomWidth: 2,
        display: "flex",
        flexDirection: "row",
    },
});

export default AppHeader;

