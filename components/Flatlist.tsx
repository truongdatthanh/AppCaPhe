import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";


const style = StyleSheet.create({
    reviewItem: {
        padding: 15,
        backgroundColor: "#ccc",
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
})

interface IReview {
    id: number;
    title: string;
    content: string;
}

const FlatListProduct = () => {

    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const [review, setReview] = useState<IReview[]>([
        { id: 1, title: "Dat1", content: "Truong1" },
        { id: 2, title: "Dat2", content: "Truong2" },
        { id: 3, title: "Dat3", content: "Truong3" },
        { id: 4, title: "Dat4", content: "Truong4" },
        { id: 5, title: "Dat5", content: "Truong5" },
        { id: 6, title: "Dat6", content: "Truong6" },
        { id: 7, title: "Dat7", content: "Truong7" },
    ]);

    return (
        <>
            <View style={{ height: 500 }}>
                <FlatList
                    data={review}
                    nestedScrollEnabled={true}
                    keyExtractor={(item) => item.id + ""}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={style.reviewItem}
                                // onPress={() => navigation.navigate("detail", item)}
                            >
                                <Text>{item.title}</Text>
                                <Image style={{ height: 50, width: 50 }} source={require("../assets/img/gaixinh.jpg")} />
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </>
    );
}

export default FlatListProduct;