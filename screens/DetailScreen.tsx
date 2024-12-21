import { NavigationProp, RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { caphe } from "../services/caphe.service";
import { RootStackParamList } from "../types/route";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';



interface IProduct
{
    _id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    categoryId: string;
}

const DetailScreen = () =>
{
    const [ userId, setUserId ] = useState( "" );
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const route: RouteProp<RootStackParamList, "detail"> = useRoute();
    const { _id: productId } = route.params; // Lấy dữ liệu từ navigation
    const [ isLoading, setIsLoading ] = useState( false );
    const [ product, setProduct ] = useState<IProduct>( { _id: "", name: "", image: "", description: "", price: 0, categoryId: "" } );
    const [ isFavorite, setIsFavorite ] = useState( false );

    useEffect( () =>
    {
        AsyncStorage.getItem( 'UserId' ).then( ( value ) => setUserId( value ?? "" ) );
    }, [] );

    useEffect( () =>
    {
        caphe.getProductById( productId ).then( ( res: any ) =>
        {
            setProduct( res.data );
            console.log( res.data );
        } )
    }, [] )


    const handleAddToCart = async () =>
    {
        setIsLoading( true ); // Hiển thị trạng thái loading
        try
        {
            await caphe.addToCart( userId, productId, 1 ); // Thêm sản phẩm vào giỏ hàng với số lượng là 1
            navigation.navigate( 'cart', { userId, productId } ); // Chuyển hướng đến trang giỏ hàng
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

    const handleToggleFavorite = async () =>
    {
        setIsFavorite( !isFavorite ); // Toggle trạng thái
    };

    return (
        <View style={ { flex: 1 } }>
            <ScrollView
                contentContainerStyle={ styles.container }
                showsHorizontalScrollIndicator={ false }
            >
                <View>
                    <Image source={ { uri: "https://product.hstatic.net/1000075078/product/1639377797_ca-phe-den-da_6f4766ec0f8b4e929a8d916ae3c13254.jpg" } } style={ styles.headerImage } />
                    <TouchableOpacity onPress={ () => navigation.goBack() } style={ { position: 'absolute', right: 10, top: 10 } }>
                        <AntDesign name="closecircle" size={ 35 } color="black" />
                    </TouchableOpacity>
                </View>
                <View style={ styles.header }>
                    <View style={ { flexDirection: "row", alignItems: "center", justifyContent: "space-between" } }>
                        <Text style={ styles.title } numberOfLines={ 2 } ellipsizeMode="tail">{ product.name }</Text>
                        <TouchableOpacity onPress={ handleToggleFavorite }>
                            { isFavorite ? (
                                <AntDesign name="heart" size={ 24 } color="red" /> // Trái tim màu đỏ
                            ) : (
                                <AntDesign name="hearto" size={ 24 } color="black" /> // Trái tim rỗng
                            ) }
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={ styles.price }>{ product.price }đ</Text>
                    </View>
                    <View>
                        <Text style={ { fontSize: 13, fontWeight: 300, marginBottom: 20 } }>{ product.description } </Text>
                    </View>

                    <View style={ { flexDirection: "row" } }>
                        <TouchableOpacity style={ styles.buttonSize }>
                            <Text>S</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ styles.buttonSize }>
                            <Text>M</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ styles.buttonSize }>
                            <Text>L</Text>
                        </TouchableOpacity>
                    </View>
                </View>



                <View style={ styles.note }>
                    <Text style={ styles.title }>Yêu cầu khác </Text>
                    <View style={ { marginBottom: 10, flexDirection: "row", alignItems: "center" } }>
                        <Text style={{fontSize: 15}}>Những tùy chọn khác</Text>
                        <Text style={{marginLeft: 10, color: "gray", fontSize: 12}}>Không bắt buộc</Text>
                    </View>
                    <TextInput style={ styles.textInput } placeholder="Thêm ghi chú" />
                </View>


            </ScrollView>

            <TouchableOpacity
                onPress={ handleAddToCart }
                style={ styles.button }
            >
                <Text style={ { color: "white", paddingRight: 10, fontWeight: "900" } }>THÊM VÀO GIỎ HÀNG</Text>
                <Feather name="shopping-cart" size={ 24 } color="white" />
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create( {
    container: {
        height: "auto",
        // height: "100%",
        backgroundColor: "#ccc",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontSize: 15,
        marginBottom: 20,
    },
    header: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 10,
        elevation: 10,
    },
    headerImage: {
        width: "auto",
        height: 400,

    },
    note: {
        marginBottom: 70,
        backgroundColor: '#fff',
        flex: 1,
        padding: 10,
    },
    button: {
        backgroundColor: "#ec1c24",
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: "row",
    },
    buttonSize: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        width: 60,
        alignItems: "center",
    },
    textInput: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        borderRadius: 2,
        width: "100%",
        marginBottom: 10,
    },
} );

export default DetailScreen;