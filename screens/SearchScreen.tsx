// import React, { useEffect, useState } from 'react';
// import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { caphe } from '../services/caphe.service';



// interface IProduct
// {
//     _id: string;
//     name: string;
//     image: string;
//     description: string;
//     price: number;
//     categoryId: string;
// }

// const SearchScreen = () =>
// {
//     const [ query, setQuery ] = useState( '' );
//     const [ results, setResults ] = useState<IProduct[]>( [] );
//     const [ product, setProduct ] = useState<IProduct[]>( [] );

//     useEffect( () =>
//     {
//         caphe.getProducts().then( ( res: any ) =>
//         {
//             setProduct( res.data );
//         } )
//     }, [] )

//     const removeVietnameseTones = (str: string) => {
//         return str
//             .normalize('NFD') // Tách các ký tự tổ hợp (dấu)
//             .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các ký tự tổ hợp
//             .replace(/đ/g, 'd') // Chuyển 'đ' thành 'd'
//             .replace(/Đ/g, 'D') // Chuyển 'Đ' thành 'D'
//             .toLowerCase(); // Chuyển tất cả thành chữ thường
//     };

//     const handleSearch = () =>
//     {
//         // Mock search function
//         const mockResults = product.filter( item =>
//             removeVietnameseTones(item.name).toLowerCase().includes( removeVietnameseTones(query).toLowerCase() )
//         );
//         console.log( `Ban da tim kiem ${query}` );
//         console.log("Ban da tim kiem" + mockResults );
//         setResults( mockResults );
//     };



//     return (
//         <View style={ styles.container }>
//             <View style={ styles.headerSearch }>
//                 <TouchableOpacity style={ { marginRight: 20 } } onPress={ () => console.log( 'Back' ) }>
//                     <AntDesign name="left" size={ 24 } color="black" />
//                 </TouchableOpacity>
//                 <View style={ styles.conntainerInput }>
//                     <TextInput
//                         style={ { flex: 1, padding: 8 } }
//                         placeholder="Tìm kiếm tên món ăn hay thức uống"
//                         value={ query }
//                         onChangeText={ setQuery }
//                     />
//                     <TouchableOpacity onPress={ handleSearch }>
//                         <AntDesign name="search1" size={ 24 } color="black" />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create( {
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#fff',
//     },
//     headerSearch: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 16,
//         alignItems: "center",
//     },
//     conntainerInput: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderRadius: 40,
//         borderColor: 'gray',
//         flex: 1,
//         paddingHorizontal: 8,
//     },
//     searchInput: {
//         flex: 1,
//         padding: 8,
//     },

// } );

// export default SearchScreen;

import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { caphe } from '../services/caphe.service';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/route';

interface IProduct {
    _id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    categoryId: string;
}

const SearchScreen = () =>
{
    
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<IProduct[]>([]);
    const [product, setProduct] = useState<IProduct[]>([]);

    useEffect(() => {
        caphe.getProducts().then((res: any) => {
            setProduct(res.data);
        });
    }, []);

    const removeVietnameseTones = (str: string) => {
        return str
            .normalize('NFD') // Tách các ký tự tổ hợp (dấu)
            .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các ký tự tổ hợp
            .replace(/đ/g, 'd') // Chuyển 'đ' thành 'd'
            .replace(/Đ/g, 'D') // Chuyển 'Đ' thành 'D'
            .toLowerCase(); // Chuyển tất cả thành chữ thường
    };

    useEffect(() => {
        // Cập nhật kết quả tìm kiếm mỗi khi query thay đổi
        if (query.trim() === '') {
            setResults([]); // Nếu không có input, không hiển thị kết quả
        } else {
            const filteredResults = product.filter(item =>
                removeVietnameseTones(item.name).includes(removeVietnameseTones(query))
            );
            setResults(filteredResults);
        }
    }, [query, product]);

    return (
        <View style={styles.container}>
            <View style={styles.headerSearch}>
                <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.conntainerInput}>
                    <TextInput
                        style={{ flex: 1, padding: 8 }}
                        placeholder="Tìm kiếm tên món ăn hay thức uống"
                        value={query}
                        onChangeText={ setQuery } // Cập nhật query khi người dùng nhập
                    />
                    <TouchableOpacity onPress={() => setQuery('')}>
                        <AntDesign name={query==='' ? "search1" : "closecircle" }size={24} color={'gray'} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Hiển thị kết quả tìm kiếm */}
            <FlatList
                data={results}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.resultItem} onPress={() => navigation.navigate('detail', { _id: item._id })}>
                        <Text style={styles.resultText}>{item.name}</Text>
                        <Text style={styles.resultPrice}>{item.price} VND</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Không tìm thấy kết quả nào</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    headerSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        alignItems: 'center',
    },
    conntainerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 40,
        borderColor: 'gray',
        flex: 1,
        paddingHorizontal: 8,
    },
    resultItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    resultText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultPrice: {
        fontSize: 14,
        color: 'gray',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 16,
        color: 'gray',
    },
});

export default SearchScreen;
