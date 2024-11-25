import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";




const DetailScreen = () => {

    const handleAddToCart = (item: { id: number, name: string, category: string }) => {
        navigation.navigate('cart', { ...product });
    }

    const [cartItems, setCartItems] = useState([]);


    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const route: RouteProp<RootStackParamList, "detail"> = useRoute();
    const product = route.params ?? {_id: "", name: "", categoryId: "", image: "", description: "", price: 0};

    return (
        <View>
            <Text>Details Screen</Text>
            <Text>{product?._id}</Text>
            <Text>Tên sản phẩm: {product?.name}</Text>
            {/* <Text>Loại sản phẩm: {product?.categoryId }</Text> */}
            <Text>Hình ảnh: {product?.image }</Text>
            <Text>Mô tả: {product?.description }</Text>
            <Text>Giá bán: {product?.price }</Text>
            <Button title="Thêm vào giỏ hàng" onPress={() => handleAddToCart({ id: parseInt(product._id), name: product.name, category: product.categoryId })} />
            <Button title="Go to home" onPress={() => navigation.goBack()} />
        </View>
    )
};

const style = StyleSheet.create({
    container: {

    }
});


export default DetailScreen;