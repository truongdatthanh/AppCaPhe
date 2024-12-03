import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Image } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { caphe } from "../../services/caphe.service";


const AppHeader = () => {
    const navigation: any = useNavigation();
    const [search, setSearch] = useState("");
    const handleSearch = (search: string) =>
    {
        const data = caphe.getProductByNames( search );
        console.log(data);
        navigation.navigate("detail", { name: search });  
        console.log('Bạn đã tìm kiếm:', search);
    };
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
                        <TouchableOpacity onPress={() => handleSearch(search)}>
                            <Ionicons name="search" size={24} color="gray" />
                        </TouchableOpacity>
                        <TextInput placeholder="Tim kiem tai day" value={search} onChangeText={(data) => setSearch(data)} />
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
        borderBottomColor: "red",
        borderBottomWidth: 2,
        display: "flex",
        flexDirection: "row",
    },
});

export default AppHeader;

