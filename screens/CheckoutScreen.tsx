import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, FlatList, ScrollView } from 'react-native';
import { RootStackParamList } from '../types/route';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { caphe } from '../services/caphe.service';
import { Modal, TouchableOpacity } from 'react-native';
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

interface Item
{
    productId: string;
    quantity: number;
}


const CheckoutScreen = () =>
{
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const [ userId, setUserId ] = useState( "" );
    const [ cartItems, setCartItems ] = useState<Item[]>( [] );
    const [ product, setProduct ] = useState<IProduct[]>( [] );
    const [ modalVisible, setModalVisible ] = useState( false );
    const [ paymentOption, setPaymentOption ] = useState( "" );

    useEffect( () =>
    {
        caphe.getProducts().then( ( res: any ) =>
        {
            setProduct( res.data );
        } )
    }, [] );

    useEffect( () =>
    {
        AsyncStorage.getItem( 'UserId' ).then( ( value ) => setUserId( value ?? "" ) );
    }, [] );

    useFocusEffect(
        useCallback( () =>
        {
            if ( userId )
            {
                console.log( "12312312: " );
                caphe.getCart( userId )
                    .then( ( response ) =>
                    {
                        setCartItems( response.data.items );
                        console.log( "active: ", response.data.items );
                    } )
                    .catch( ( error ) =>
                    {
                        console.error( error.response?.data || error.message );
                    } );
            }
        }, [ userId ]
        ) );


    const handleChoosePayment = () =>
    {
        setModalVisible( true );
    };

    const handlePaymentOption = ( option: string ) =>
    {
        console.log( `Selected payment option: ${ option }` );
        setPaymentOption( option );
        setModalVisible( false );
    };

    const handleSubmitPayment = () =>
    {
        if ( paymentOption === "" )
        {
            alert( "Vui lòng chọn phương thức thanh toán" );
            return;
        }

        if ( paymentOption === "COD" )
        {
            navigation.navigate( 'completed' );
        }
    }


    return (
        <ScrollView style={ styles.container }>
            <View style={ styles.header }>
                <TouchableOpacity style={ { position: "absolute", right: 12, top: 8 } } onPress={ () => navigation.goBack()}>
                    <AntDesign name="close" size={ 24 } color="black" />
                </TouchableOpacity>
                <Text style={ styles.title }>Xác nhận đơn hàng</Text>
            </View>

            <View style={ styles.body }>
                <View style={ styles.adress }>
                    <Text style={ styles.bodyTitle }>Địa chỉ giao hàng</Text>
                    <TextInput placeholder='Địa chỉ' />
                </View>


                <View style={ styles.productItem }>
                    <View style={ styles.bodyHeader }>
                        <Text style={ styles.bodyTitle }>Sản phẩm đã chọn</Text>
                        <TouchableOpacity style={ styles.btnAddItem } onPress={ () => navigation.navigate( 'product' ) }>
                            <Text style={ { color: "#fff" } }>+ Thêm</Text>
                        </TouchableOpacity>
                    </View>
                    { cartItems.map( ( item ) => (
                        <View key={ item.productId } style={ styles.itemContainer }>
                            <View style={ styles.itemDetails }>
                                <Text>(x{ item.quantity })</Text>
                                <Text style={ styles.itemName }>{ product.find( ( x ) => x._id === item.productId )?.name }</Text>
                                <Text style={ styles.itemPrice }>{ product.find( ( x ) => x._id === item.productId )?.price } VND</Text>
                            </View>
                        </View>
                    ) ) }
                </View>

                <View style={ styles.total }>
                    <View>
                        <Text style={ styles.bodyTitle }>Tổng cộng</Text>
                        <View style={ { flexDirection: "row", justifyContent: "space-between", paddingVertical: 15, borderBottomWidth: 1, borderColor: '#dcdcdc' } }>
                            <Text>Thành tiền</Text>
                            <Text>{ cartItems.reduce( ( total, item ) => total + ( product.find( ( x ) => x._id === item.productId )?.price || 0 ) * item.quantity, 0 ) } VND</Text>
                        </View>
                        <View style={ { flexDirection: "row", justifyContent: "space-between", paddingVertical: 15, borderBottomWidth: 1, borderColor: '#dcdcdc' } }>
                            <Text>Mã giảm giá</Text>
                            <Text>abc   </Text>
                        </View>
                        <View style={ { flexDirection: "row", justifyContent: "space-between", paddingVertical: 15 } }>
                            <Text>Số tiền thanh toán</Text>
                            <Text>{ cartItems.reduce( ( total, item ) => total + ( product.find( ( x ) => x._id === item.productId )?.price || 0 ) * item.quantity, 0 ) } VND</Text>
                        </View>
                    </View>
                </View>

                <View style={ styles.payment }>
                    <Text style={ styles.bodyTitle }>Phương thức thanh toán</Text>
                    <TouchableOpacity style={ { flexDirection: "row", justifyContent: "space-between" } } onPress={ handleChoosePayment }>
                        <Text style={ { color: "blue" } }>{ paymentOption === "" ? `Chon phuong thuc thanh toan` : paymentOption }</Text>
                        <AntDesign name="right" size={ 20 } color="blue" />
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={ true }
                        visible={ modalVisible }
                        onRequestClose={ () => setModalVisible( false ) }
                    >
                        <View style={ styles.modalContainer }>
                            <View style={ styles.modalContent }>
                                <View>
                                    <Text style={ styles.modalTitle }>Phương thức thanh toán</Text>
                                    <TouchableOpacity style={ { position: "absolute", right: 12, top: 8 } } onPress={ () => setModalVisible( false ) }>
                                        <AntDesign name="close" size={ 24 } color="black" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={ styles.modalTitle }>Cách thanh toán</Text>
                                <TouchableOpacity style={ styles.modalItem } onPress={ () => handlePaymentOption( 'COD' ) }>
                                    <Text>Tiền mặt</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={ styles.modalItem } onPress={ () => handlePaymentOption( 'MoMo' ) }>
                                    <Text>MoMo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={ styles.modalItem } onPress={ () => handlePaymentOption( 'VNPay' ) }>
                                    <Text>VNPay</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
                </View>
            </View>

            <Button title="Proceed to Payment" onPress={() => handleSubmitPayment()} />
        </ScrollView >
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        height: "100%",
    },
    header: {
        alignItems: 'center',
        // padding: 10,
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
    },
    body: {
        marginVertical: 16,
        // flex: 1,
    },
    bodyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    adress: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc', // Màu xám nhạt hơn
        padding: 10,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    itemDetails: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 16,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3e2723', // Màu nâu sẫm giống cà phê
    },
    itemPrice: {
        fontSize: 14,
        color: '#795548', // Tông màu cà phê nhạt
    },
    productItem: {
        backgroundColor: 'white',
        marginTop: 16,
    },
    total: {
        marginTop: 16,
        backgroundColor: 'white',
        padding: 10,
    },
    payment: {
        marginTop: 16,
        backgroundColor: 'white',
        padding: 10,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 1,
        borderColor: 'red',
    },
    modalContent: {
        padding: 12,
        height: 500,
        backgroundColor: 'white',
        borderRadius: 10,
        // alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
    },
    bodyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
    },
    btnAddItem: {
        backgroundColor: 'orange',
        padding: 5,
        borderRadius: 20,
    },
} );

export default CheckoutScreen;