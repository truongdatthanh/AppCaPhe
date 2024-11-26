import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, Alert } from 'react-native';

const CartScreen = ( ) =>
{
  
  
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, "cart"> = useRoute();
  const product = route.params ?? {_id: "", name: "", categoryId: "", image: "", description: "", price: 0};
  // const [cartItems, setCartItems] = useState([]);
  // const route: RouteProp<RootStackParamList, "cart"> = useRoute();
  // const product = route.params ?? {};



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

  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Cà phê sữa', price: 400000, quantity: 2, image: 'https://keenguyencaphe.com/wp-content/uploads/2020/06/caphesuada-blog.jpg' },
    { id: '2', name: 'Cà phê đen', price: 30000, quantity: 1, image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Cà phê đen', price: 40000, quantity: 1, image: 'https://via.placeholder.com/100' },
  ]);
  const increaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => setCartItems(cartItems.filter(item => item.id !== id)),
        },
      ]
    );
  };



  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  const handleCheckout = () => {
    const total = calculateTotal();
    if (total === 0) {
      Alert.alert('Giỏ hàng trống', 'Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.');
    } else {
      Alert.alert(
        'Thanh toán',
        `Tổng hóa đơn của bạn là: ${total.toLocaleString()} VND. Bạn có chắc muốn thanh toán không?`,
        [
          { text: 'Hủy', style: 'cancel' },
          {
            text: 'Đồng ý', onPress: () => {
              setCartItems([]); // Xóa hết sản phẩm trong giỏ hàng
              navigation.navigate('home'); // Điều hướng về trang chủ hoặc màn hình khác
            }
          },
        ]
      );
    }
  }; return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price.toLocaleString()} VND</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
              <Text style={styles.removeText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Tổng: {calculateTotal().toLocaleString()} VND</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f2', // Màu nền nhẹ nhàng như màu cà phê sữa
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc', // Màu xám nhạt hơn
    paddingBottom: 12,
    backgroundColor: '#fff', // Nền trắng cho từng mục
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Hiệu ứng nổi trên Android
    padding: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3e2723', // Màu nâu sẫm giống cà phê
  },
  itemPrice: {
    fontSize: 14, color: '#795548', // Tông màu cà phê nhạt
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#e0e0e0', // Màu nút tăng giảm nhạt
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3e2723', // Nâu đậm
  },
  removeButton: {
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  removeText: {
    color: '#d32f2f', // Màu đỏ cảnh báo
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3e2723',
    marginBottom: 16,
    textAlign: 'right',
  },
  checkoutButton: {
    backgroundColor: '#6d4c41', // Màu nâu trầm nổi bật
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18, // Tăng kích thước chữ để dễ nhìn
    fontWeight: 'bold',
  },
});

export default CartScreen;