import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { GestureHandlerRootView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Slide from "../components/Slide";
import { caphe } from "../services/caphe.service";


interface IProduct {
    _id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    categoryId: string;
}

const HomeScreen = () => {
    const [product, setProduct] = useState<IProduct[]>([]);
    useEffect(() => {
        caphe.getProducts().then((res: any) => {
            setProduct(res.data);
            console.log(res.data);
        })
    }, [])

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        caphe.getCategories().then((res: any) => {
            setCategories(res.data);
            console.log(res.data);
        })
    }, [])

    const [ selectedCategory, setSelectedCategory ] = useState( "All" );

    const category = [{ _id: "All", name: "All" }, ...categories];

    const filteredProducts = selectedCategory === "All" ? product : product.filter( product => product.categoryId === selectedCategory );
    console.log( selectedCategory )
    
    // const handleSave = async (data: any) => {
    //     try {
    //         const response = await caphe.createProduct(data);
    //         console.log('Data saved:', response.data);
    //     } catch (error) {
    //         console.error('Error saving data:', error);
    //     }

    // }

    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    return (
        <>
            <GestureHandlerRootView>
                <ScrollView style={style.container}>

                    {/* <View>
                        {product.map((item: any) => (
                            <TouchableOpacity key={item._id} onPress={() => alert("edit")}>
                                <Text>{item._id}</Text>
                                <Text>{item.name}</Text>
                                <Text>{ item.description }</Text>
                                <Text>{item.price}</Text>
                                <Text>{item.categoryId}</Text>
                                <Image source={{ uri: item.image }} style={{ width: 10, height: 10 }}></Image>
                            </TouchableOpacity>
                        ))}
                    </View>


                    <View>
                        {categories.map((item: any) => (
                            <View key={item._id}>
                                <Text>{item._id}</Text>
                                <Text>{item.name}</Text>
                            </View>
                        ))}
                    </View> */}


                    {/* Slide anh */}
                    <View style={style.slide}>
                        <Slide />
                    </View>
                    {/* Ket thuc slide anh */}

                    {/* Banner */}
                    <Text>Các sản phẩm nổi bật</Text>
                    <View style={style.banner}>
                        <Slide />
                    </View>
                    {/* Ket thuc banner */}

                    
                    {/* Danh muc */ }
                    <View style={style.categories}>
                        {category.map((category: any) => (
                            <TouchableOpacity key={ category._id } style={ [ style.categoryButton, selectedCategory === category._id  && style.selectedCategory ] }
                                onPress={ () => setSelectedCategory( category._id ) }>
                                <Text style={style.categoryText}>{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <ScrollView horizontal={true} style={style.scrollContainer} showsHorizontalScrollIndicator={false}>
                        {filteredProducts.map((product) => (
                            <TouchableOpacity key={product._id} style={style.productContainer} onPress={() => navigation.navigate("detail", product)}>
                                <Image source={{ uri: product.image }} style={style.productImage} />
                                <Text style={style.productName}>Tên sản phẩm: {product.name}</Text>
                                <Text>Mô tả: {product.description}</Text>
                                <Text>Giá: {product.price}</Text>
                                {/* <Text>{product.categoryId}</Text> */}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    {/* Ket thuc danh muc */ }
                    
                    {/* San pham */}
                    {/* horizontal de kich hoat cuon ngang, ShowsHorizontalScrollIndicator={false}: Neu khong muon hien thi thanh cuon ngang */}
                    <View id="San pham">
                        <Text>Danh sach san pham</Text>
                        <ScrollView horizontal={true} style={style.scrollContainer} showsHorizontalScrollIndicator={false}>
                            {product.map((product) => (
                                <TouchableOpacity key={product._id} style={style.productContainer} onPress={() => navigation.navigate("detail", product)}>
                                    <Image source={{ uri: product.image }} style={style.productImage} />
                                    <Text style={style.productName}>{product.name}</Text>
                                    <Text>{product.description}</Text>
                                    <Text>{product.price}</Text>
                                    <Text>{product.categoryId}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    {/* Ket thuc san pham */}   
                </ScrollView>
            </GestureHandlerRootView>
        </>

    )
};

const style = StyleSheet.create({
    container: {
        height: "100%",
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
        borderColor: "brown",
    },
    productContainer: {
        width: 100, // Đặt kích thước cho mỗi sản phẩm
        alignItems: 'center',
        marginRight: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'orange'
    },
    productName: {
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center',
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
});


export default HomeScreen;