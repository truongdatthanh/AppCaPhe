import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { caphe } from "../services/caphe.service";
import { RootStackParamList } from "../types/route";
import AsyncStorage from "@react-native-async-storage/async-storage";




const DetailScreen = () =>
{

    const [ userId, setUserId ] = useState( "" );
    useEffect( () =>
    {
        AsyncStorage.getItem( 'UserId' ).then( ( value ) => setUserId( value ?? "" ) );
    }, [] );
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const route: RouteProp<RootStackParamList, "detail"> = useRoute();
    // const product = route.params ?? { _id: "", name: "", categoryId: "", image: "", description: "", price: 0 };

    const { _id: productId, name: productName, price, } = route.params; // Lấy dữ liệu từ navigation
    const [ isLoading, setIsLoading ] = useState( false );

    const handleAddToCart = async () =>
    {
        setIsLoading( true ); // Hiển thị trạng thái loading
        try
        {
            await caphe.addToCart( userId, productId, 1 ); // Thêm sản phẩm vào giỏ hàng với số lượng là 1
            Alert.alert( 'Thành công', 'Sản phẩm đã được thêm vào giỏ hàng!' );
        } catch ( error )
        {
            console.error( error );
            Alert.alert( 'Lỗi', 'Không thể thêm sản phẩm vào giỏ hàng.' );
        } finally
        {
            setIsLoading( false ); // Tắt trạng thái loading
        }
    };

    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>{ productName }</Text>
            <Text style={ styles.price }>Giá: { price } VND</Text>
            <Button
                title={ isLoading ? 'Đang xử lý...' : 'Thêm vào giỏ hàng' }
                onPress={ handleAddToCart }
                disabled={ isLoading } // Khóa nút khi đang xử lý
            />
        </View>
    );
};

const styles = StyleSheet.create( {
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    price: { fontSize: 20, marginBottom: 20 },
} );

export default DetailScreen;