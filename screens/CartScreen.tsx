import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, Alert } from 'react-native';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const route: RouteProp<RootStackParamList, "cart"> = useRoute();
    const product = route.params ?? {};

   

  // Tính tổng giá trị giỏ hàng
//   const getTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

  // Hàm tăng số lượng sản phẩm
//   const increaseQuantity = (id: number) => {
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

  // Hàm giảm số lượng sản phẩm
//   const decreaseQuantity = (id: number) => {
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
//       )
//     );
//   };

  // Hàm xóa sản phẩm khỏi giỏ hàng
//   const removeItem = (id: number) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== id ));
//   };

  // Xử lý khi nhấn thanh toán
//   const handleCheckout = () => {
//     Alert.alert("Thanh toán", `Tổng giá trị giỏ hàng là: $${getTotal()}`);
//   };

return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
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
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  removeButton: {
    fontSize: 16,
    color: 'red',
    marginLeft: 10,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartScreen;