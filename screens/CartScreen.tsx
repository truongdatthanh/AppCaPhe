import { Button, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { caphe } from "../services/caphe.service";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/route";
import Ionicons from '@expo/vector-icons/Ionicons';

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

const CartScreen = () =>
{
  // const route: RouteProp<RootStackParamList, "cart"> = useRoute();
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [ userId, setUserId ] = useState( "" );
  const [ cartItems, setCartItems ] = useState<Item[]>( [] );
  const [ product, setProduct ] = useState<IProduct[]>( [] );


  useEffect( () =>
  {
    caphe.getProducts().then( ( res: any ) =>
    {
      setProduct( res.data );
    } )
  }, [] )

  useEffect( () =>
  {
    AsyncStorage.getItem( "UserId" ).then( ( value ) => setUserId( value ?? "" ) );
  }, [] );


  // useEffect( () =>
  // {
  //   if ( userId )
  //   {
  //     caphe.getCart( userId )
  //       .then( ( response ) =>
  //       {
  //         setCartItems( response.data.items );
  //         console.log( "active: ", response.data.items );
  //       } )
  //       .catch( ( error ) =>
  //       {
  //         console.error( error.response?.data || error.message );
  //       } );
  //   }
  // }, [ userId ] );
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


  const handleClearCart = () =>
  {
    caphe.clearCart( userId )
      .then( () =>
      {
        setCartItems( [] );
      } )
      .catch( ( error ) =>
      {
        console.error( error.response?.data || error.message );
      } );
  }

  const handleRemoveFromCart = ( productId: string ) =>
  {
    caphe.removeFromCart( userId, productId )
      .then( () =>
      {
        setCartItems( cartItems.filter( ( item ) => item.productId !== productId ) );
      } )
      .catch( ( error ) =>
      {
        console.error( error.response?.data || error.message );
      } );
  }

  const handleIncreaseQuantity = ( productId: string ) =>
  {
    const updatedCartItems = cartItems.map( ( item ) =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems( updatedCartItems );

    caphe.addToCart( userId, productId, 1 )
      .then( () =>
      {
        console.log( "Quantity increased and saved to database" );
      } )
      .catch( ( error ) =>
      {
        console.error( error.response?.data || error.message );
      } );
  };

  const handleDecreaseQuantity = ( productId: string ) =>
  {
    const updatedCartItems = cartItems.map( ( item ) =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems( updatedCartItems );

    caphe.addToCart( userId, productId, -1 )
      .then( () =>
      {
        console.log( "Quantity decreased and saved to database" );
      } )
      .catch( ( error ) =>
      {
        console.error( error.response?.data || error.message );
      } );
  };
  const calculateTotal = () =>
  {
    return cartItems.reduce( ( total, item ) =>
    {
      const productDetails = product.find( ( x ) => x._id === item.productId );
      return total + ( productDetails ? productDetails.price * item.quantity : 0 );
    }, 0 );
  };



  return (


    <View style={ styles.container }>
      <View>
        <View style={ { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } }>
          <TouchableOpacity onPress={ () => navigation.navigate( 'home2' ) }>
            <Ionicons name="chevron-back" size={ 24 } color="black" />
          </TouchableOpacity>
          <Text>Giỏ hàng</Text>
          <TouchableOpacity onPress={ () => handleClearCart() }>
            <Text>Xóa tất cả</Text>
          </TouchableOpacity>
        </View>
      </View>

      { cartItems.length > 0 ? (
        <View style={ { flex: 1 } }>
          <Text>Danh sach san pham</Text>
          <FlatList
            showsVerticalScrollIndicator={ false } // Ẩn thanh cuộn dọc
            contentContainerStyle={ { paddingBottom: 150 } } // Tạo khoảng trống dưới cùng
            data={ cartItems }
            keyExtractor={ ( item ) => item.productId }
            renderItem={ ( { item } ) => (
              <View style={ styles.itemContainer }>
                <View style={ styles.itemDetails }>
                  <View>
                    <Image source={ { uri: "https://product.hstatic.net/1000075078/product/1639377797_ca-phe-den-da_6f4766ec0f8b4e929a8d916ae3c13254.jpg" } } style={ { height: 75, width: 60 } } />
                  </View>
                  <View>
                    <Text style={ styles.itemName }>{ product.find( ( x ) => x._id === item.productId )?.name }</Text>
                    <Text style={ styles.itemPrice }>{ product.find( ( x ) => x._id === item.productId )?.price } VND</Text>
                  </View>

                  <View style={ styles.quantityContainer }>
                    <TouchableOpacity onPress={ () => handleDecreaseQuantity( item.productId ) } style={ styles.quantityButton }>
                      <Text style={ styles.quantityText }>-</Text>
                    </TouchableOpacity>
                    <Text style={ styles.quantityText }>{ item.quantity }</Text>
                    <TouchableOpacity onPress={ () => handleIncreaseQuantity( item.productId ) } style={ styles.quantityButton }>
                      <Text style={ styles.quantityText }>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={ () => handleRemoveFromCart( item.productId ) } style={ styles.removeButton }>
                  <Text style={ styles.removeText }>Xóa</Text>
                </TouchableOpacity>
              </View>
            ) } />
          <View style={ styles.footer }>
            <TouchableOpacity style={ styles.checkoutButton } onPress={ () => alert( 'xinchao' ) }>
              <Text style={ styles.checkoutText }>Thanh toán ({ calculateTotal().toLocaleString() }đ)</Text>
            </TouchableOpacity>
          </View>
        </View>

      ) : (
        <Text>Giỏ hàng của bạn đang trống!</Text>
      ) }
    </View>

  );
};



const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#f7f5f2', // Màu nền nhẹ nhàng như màu cà phê sữa
    padding: 16,
    borderWidth: 1,
    borderColor: 'red', // Màu xám nhạt
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
    flex: 1,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 30,
    marginLeft: 16,
    justifyContent: 'space-around',
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
    borderTopWidth: 10,
    borderTopColor: '#f7f5f2',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'absolute',
    width: '100%',
    bottom: 0,
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
} );

export default CartScreen;
