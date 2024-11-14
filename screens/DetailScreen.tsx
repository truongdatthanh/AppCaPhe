import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";




const DetailScreen = () => {

    const handleAddToCart = ( item : {id: number, name: string, category: string}) => {
        navigation.navigate('cart', {...product});
        alert("Id " + item.id);
}


const navigation: NavigationProp<RootStackParamList> = useNavigation();
const route: RouteProp<RootStackParamList, "detail"> = useRoute();
const  product  = route.params ?? {};

return (
    <View>
        <Text>Details Screen</Text>
        <Text>{product?.id}</Text>
        <Text>{product?.name}</Text>
        <Text>{product?.category}</Text>
        <Button title="Thêm vào giỏ hàng" onPress={() => handleAddToCart(product)} />
        <Button title="Go to home" onPress={() => navigation.goBack()} />
    </View>
)
};

const style = StyleSheet.create({
    container: {

    }
});


export default DetailScreen;