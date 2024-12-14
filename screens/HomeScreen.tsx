import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { GestureHandlerRootView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Slide from "../components/Slide";
import { caphe } from "../services/caphe.service";
import { RootStackParamList } from "../types/route";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface IProduct
{
    _id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    categoryId: string;
}


const HomeScreen = () =>
{
    const [ userId, setUserId ] = useState( "" );
    const [ username, setUsername ] = useState( "" );
    const [ userRole, setUserRole ] = useState( "" );

    useEffect( () =>
    {
        AsyncStorage.getItem( 'UserId' ).then( ( value ) => setUserId( value ?? "" ) );
    }, [] );


    const [ product, setProduct ] = useState<IProduct[]>( [] );
    useEffect( () =>
    {
        caphe.getProducts().then( ( res: any ) =>
        {
            setProduct( res.data );
        } )
    }, [] )

    const [ categories, setCategories ] = useState( [] );
    useEffect( () =>
    {
        caphe.getCategories().then( ( res: any ) =>
        {
            setCategories( res.data );
        } )
    }, [] )

    const [ selectedCategory, setSelectedCategory ] = useState( "All" );

    const category = [ { _id: "All", name: "All" }, ...categories ];
    useEffect( () =>
    {
        console.log( selectedCategory )
    }, [ selectedCategory ] );

    const filteredProducts = selectedCategory === "All" ? product : product.filter( product => product.categoryId === selectedCategory );



    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    return (
            <GestureHandlerRootView>
                <ScrollView contentContainerStyle={ style.container } showsVerticalScrollIndicator={false}>
                    {/* Slide anh */ }
                    <View style={ style.slide }>
                        <Slide />
                    </View>
                    {/* Ket thuc slide anh */ }

                    {/* Banner */ }
                    <Text>Các sản phẩm nổi bật</Text>
                    <View style={ style.banner }>
                        <Slide />
                    </View>
                    {/* Ket thuc banner */ }


                    {/* Danh muc */ }
                    <View style={ style.categories }>
                        { category.map( ( category: any ) => (
                            <TouchableOpacity key={ category._id } style={ [ style.categoryButton, selectedCategory === category._id && style.selectedCategory ] }
                                onPress={ () => setSelectedCategory( category._id ) }>
                                <Text style={ style.categoryText }>{ category.name }</Text>
                            </TouchableOpacity>
                        ) ) }
                    </View>

                    <ScrollView horizontal={ false } style={ style.scrollContainer } showsHorizontalScrollIndicator={ false }>
                        { filteredProducts.map( ( product ) => (
                            <TouchableOpacity key={ product._id } style={ style.productContainer } onPress={ () => navigation.navigate( "detail", { _id: product._id } ) }>
                                <View style={ { flexDirection: "row" } }>
                                    <Image source={ { uri: product.image } } style={ style.productImage } />
                                    <View style={ style.titleItem }>
                                        <View style={ style.titleName }>
                                            <Text style={ style.productName }>{ product.name }</Text>
                                            <Text>Mô tả: { product.description }</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={ style.productPrice }>{ product.price }.000D</Text>
                            </TouchableOpacity>
                        ) ) }
                    </ScrollView>
                    {/* Ket thuc danh muc */ }
                </ScrollView>
            </GestureHandlerRootView>
    )
};

const style = StyleSheet.create( {
    container: {
        backgroundColor: "#ccc",
        padding: 10,
    },
    slide: {
        borderWidth: 2,
        borderColor: "black",
        padding: 3,
    },
    img: {
        width: "auto",
        height: 150,
    },
    banner: {
        borderWidth: 2,
        borderColor: "purple",
    },

    scrollContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: "blue",
    },
    productContainer: {
        // width: 100, // Đặt kích thước cho mỗi sản phẩm
        flexDirection: 'row',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "blue",
        justifyContent: 'space-between',
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'orange',
    },
    productName: {
        paddingBottom: 10,
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'green',
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'green',
        fontWeight: 'bold',
    },

    reviewItem: {
        padding: 15,
        backgroundColor: "#ccc",
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    reviewContainer: {
        margin: 10,
        borderWidth: 1,
        borderColor: "brown",
    },
    reivewName: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        paddingHorizontal: 5,
        textAlign: "center",
        fontSize: 25,
    },

    categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    categoryButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    selectedCategory: {
        backgroundColor: '#ff6f61',
    },
    categoryText: {
        fontSize: 16,
        color: '#333',
    },
    item: {
        padding: 15,
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    itemText: {
        fontSize: 18,
        color: '#333',
    },
    titleItem: {
        marginLeft: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'blue',

    },
    titleName: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: 'red',
    },
} );


export default HomeScreen;