import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { caphe } from '../services/caphe.service';
import { RootStackParamList } from '../types/route';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ( ) =>
{

  const [ userId, setUserId ] = useState( "" );
  useEffect( () =>
  {
      AsyncStorage.getItem( 'UserId' ).then( ( value ) => setUserId( value ?? "" ) );
  }, [] );

  interface CartItem {
    productId: string;
    quantity: number;
  }

  interface Cart {
    items: CartItem[];
  }

  const [ cart, setCart ] = useState<Cart | null>( null );

  useEffect( () =>
  {
    fetchCart();
  }, [] );

  const fetchCart = async () =>
  {
    const listCart = await caphe.getCart( userId );
    setCart( listCart.data );
  };

  const handleRemove = async ( productId: string ) =>
  {
    await caphe.removeFromCart( userId, productId );
    fetchCart();
  };

  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, "cart"> = useRoute();
  const product = route.params ?? { _id: "", name: "", categoryId: "", image: "", description: "", price: 0 };

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Your Cart</Text>
      { cart && cart.items.length > 0 ? (
        <FlatList
          data={ cart.items }
          keyExtractor={ ( item ) => item.productId }
          renderItem={ ( { item } ) => (
            <View style={ styles.item }>
              <Text>Product ID: { item.productId }</Text>
              <Text>Quantity: { item.quantity }</Text>
              <Button title="Remove" onPress={ () => handleRemove( item.productId ) } />
            </View>
          ) }
        />
      ) : (
        <Text>Your cart is empty!</Text>
      ) }
    </View>
  );
};


const styles = StyleSheet.create( {
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
} );
export default CartScreen;