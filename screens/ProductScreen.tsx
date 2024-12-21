import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { caphe } from '../services/caphe.service';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/route';
import AntDesign from '@expo/vector-icons/AntDesign';

interface IProduct
{
    _id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    categoryId: string;
}

const ProductScreen = () =>
{
    const [ product, setProduct ] = useState<IProduct[]>( [] );
    const [ categories, setCategories ] = useState( [] );
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    useEffect( () =>
    {
        caphe.getProducts().then( ( res: any ) =>
        {
            setProduct( res.data );
            console.log( res.data );
        } )
    }, [] )

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

    return (
        <View>
            <View style={ style.headerSearch }>
                <TouchableOpacity style={ { flexDirection: 'row', alignItems: 'center', flex: 1, paddingHorizontal: 8, margin: 10, justifyContent: 'space-between' } }
                    onPress={ () => navigation.navigate( 'search' ) }>
                    <Text>Tìm kiếm tên món ăn hay nước uống</Text>
                    <AntDesign name="search1" size={ 24 } color={ 'gray' } />
                </TouchableOpacity>
            </View>

            {/* Danh muc */ }
            <View style={ style.categories }>
                { category.map( ( category: any ) => (
                    <TouchableOpacity key={ category._id } style={ [ style.categoryButton, selectedCategory === category._id && style.selectedCategory ] }
                        onPress={ () => setSelectedCategory( category._id ) }>
                        <Text style={ style.categoryText }>{ category.name }</Text>
                    </TouchableOpacity>
                ) ) }
            </View>
            <Text>Danh sách sản phẩm</Text>
            <ScrollView
                contentContainerStyle={ style.scrollContainer }
                showsVerticalScrollIndicator={ false }>
                { filteredProducts.map( ( product ) => (
                    <TouchableOpacity key={ product._id } style={ style.productContainer } onPress={ () => navigation.navigate( "detail", { _id: product._id } ) }>
                        <View style={ { flexDirection: "row" } }>
                            <Image source={ { uri: product.image } } style={ style.productImage } />
                            <View style={ style.titleItem }>
                                <View style={ style.titleName }>
                                    <Text style={ style.productName }>{ product.name }</Text>
                                    {/* <Text>Mô tả: { product.description }</Text> */}
                                </View>
                            </View>
                        </View>
                        <Text style={ style.productPrice }>{ product.price }.000D</Text>
                    </TouchableOpacity>
                ) ) }
            </ScrollView>
        </View>
    );
};

const style = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    productText: {
        fontSize: 24,
        fontWeight: 'bold',
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
    scrollContainer: {
        paddingBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: "blue",
    },  
    productContainer: {

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
    headerSearch: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 40,
        borderColor: 'gray',
        // flex: 1,
        paddingHorizontal: 8,
    },

} );

export default ProductScreen;