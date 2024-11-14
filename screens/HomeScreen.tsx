import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { GestureHandlerRootView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import image from "../assets/img/gaixinh2.jpg";
import Slide from "../components/Slide";
import CartScreen from "./CartScreen";




// Dữ liệu mẫu cho các sản phẩm
const products = [
    { id: 1, name: 'Sản phẩm 1', image: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/465452424_122146297568349577_6329936738411691885_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGu80T8b8VLmd8lvkLcYL9eWj4i_ZbpH_RaPiL9lukf9MNaD3VakcGeVgG8Q52YveU2FAf4Z6F_Ud-3xOKTCR5Y&_nc_ohc=xFY3Ju9n4UcQ7kNvgE5NJj9&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=Aw_aSGMLCFU9GfYvUQZAvmc&oh=00_AYCTK7V61aoT_V-x6hXY_otzGgEkB8XubE5lNsnUJVrqcA&oe=672E4401' },
    { id: 2, name: 'Sản phẩm 2', image: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/465901332_1078289927297680_5740083761138482000_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEb_BqamrueOFVVEDmXeUWkVEXL1nYjCXJURcvWdiMJcvJSLmjnR6kJt3cMAiWihONGPt7_OQpis4e_CmkqQd5F&_nc_ohc=PPIsrwgD5TQQ7kNvgH1Rxuw&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=Ajmg9EhUgwjaWwMd1P8EpFH&oh=00_AYCj9VnzGsOQfnGfNIYZnvonFju38ieQwHIF5dUod70vRg&oe=672F5F66' },
    { id: 3, name: 'Sản phẩm 3', image: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/465452424_122146297568349577_6329936738411691885_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGu80T8b8VLmd8lvkLcYL9eWj4i_ZbpH_RaPiL9lukf9MNaD3VakcGeVgG8Q52YveU2FAf4Z6F_Ud-3xOKTCR5Y&_nc_ohc=xFY3Ju9n4UcQ7kNvgE5NJj9&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=Aw_aSGMLCFU9GfYvUQZAvmc&oh=00_AYCTK7V61aoT_V-x6hXY_otzGgEkB8XubE5lNsnUJVrqcA&oe=672E4401' },
    { id: 4, name: 'Sản phẩm 4', image: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/465452424_122146297568349577_6329936738411691885_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGu80T8b8VLmd8lvkLcYL9eWj4i_ZbpH_RaPiL9lukf9MNaD3VakcGeVgG8Q52YveU2FAf4Z6F_Ud-3xOKTCR5Y&_nc_ohc=xFY3Ju9n4UcQ7kNvgE5NJj9&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=Aw_aSGMLCFU9GfYvUQZAvmc&oh=00_AYCTK7V61aoT_V-x6hXY_otzGgEkB8XubE5lNsnUJVrqcA&oe=672E4401' },
    { id: 5, name: 'Sản phẩm 5', image: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/465452424_122146297568349577_6329936738411691885_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGu80T8b8VLmd8lvkLcYL9eWj4i_ZbpH_RaPiL9lukf9MNaD3VakcGeVgG8Q52YveU2FAf4Z6F_Ud-3xOKTCR5Y&_nc_ohc=xFY3Ju9n4UcQ7kNvgE5NJj9&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=Aw_aSGMLCFU9GfYvUQZAvmc&oh=00_AYCTK7V61aoT_V-x6hXY_otzGgEkB8XubE5lNsnUJVrqcA&oe=672E4401' },
];

const items = [
    { id: 1, name: 'Pizza', category: 'Thức ăn' },
    { id: 2, name: 'Burger', category: 'Thức ăn' },
    { id: 3, name: 'Coca-Cola', category: 'Nước uống' },
    { id: 4, name: 'Pepsi', category: 'Nước uống' },
    { id: 5, name: 'Pasta', category: 'Thức ăn' },
    { id: 6, name: 'Orange Juice', category: 'Nước uống' },
];


interface IReview {
    id: number;
    title: string;
    content: string;
    like: boolean;
}

const HomeScreen = () => {



    const [review, setReview] = useState<IReview[]>([
        { id: 1, title: "Dat1", content: "Truong1", like: false },
        { id: 2, title: "Dat2", content: "Truong2", like: false },
        { id: 3, title: "Dat3", content: "Truong3", like: false },
        { id: 4, title: "Dat4", content: "Truong4", like: false },
        { id: 5, title: "Dat5", content: "Truong5", like: false },
        { id: 6, title: "Dat6", content: "Truong6", like: false },
        { id: 7, title: "Dat7", content: "Truong7", like: false },
    ]);

    const [search, setSearch] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [like, setLike] = useState(true);

    // Hàm lọc món ăn theo danh mục
    const filteredItems = selectedCategory === 'All'
        ? items
        : items.filter(item => item.category === selectedCategory);



    const addNew = (item: IReview) => {
        setReview([...review, item])
    }

    const handleSearch = () => {
        // Thực hiện logic tìm kiếm ở đây
        console.log('Bạn đã tìm kiếm:', search);
    };

    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <>
            <GestureHandlerRootView>
                <ScrollView style={style.container}>
                    <Button title="Ve lai trang login" onPress={() => navigation.navigate('login')} />

                    {/* Tim kiem san pham */}
                    <View style={style.searchBar}>
                        <TouchableOpacity onPress={handleSearch}>
                            <Ionicons name="search" size={24} color="gray" />
                        </TouchableOpacity>
                        <TextInput placeholder="Tìm kiếm tại đây..." value={search} onChangeText={(data) => setSearch(data)}></TextInput>
                        <Text>{search}</Text>
                    </View>
                    {/* Ket thuc tim kiem san pham */}

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

                    {/* San pham */}
                    {/* horizontal de kich hoat cuon ngang, ShowsHorizontalScrollIndicator={false}: Neu khong muon hien thi thanh cuon ngang */}
                    <View id="San pham">
                        <Text>Danh sach san pham</Text>
                        <ScrollView horizontal={true} style={style.scrollContainer} showsHorizontalScrollIndicator={false}>
                            {products.map((product) => (
                                <TouchableOpacity key={product.id} style={style.productContainer} onPress={() => alert(product.id)}>
                                    <Image source={{ uri: product.image }} style={style.productImage} />
                                    <Text style={style.productName}>{product.name}</Text>
                                    <TouchableOpacity
                                        onPress={() => setLike(!like)}
                                    >
                                        <AntDesign name="heart" size={20} color={!like ? "red" : "gray"} style={{ position: "absolute", bottom: 95, left: 20 }}></AntDesign>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    {/* Ket thuc san pham */}


                    <View style={style.slide}>
                        <Image style={style.img} source={image} resizeMode="cover"></Image>
                    </View>
                    <View style={style.slide}>
                        <Image style={style.img} source={image} resizeMode="cover"></Image>
                    </View>
                    <View style={style.slide}>
                        <Image style={style.img} source={image} resizeMode="cover"></Image>
                    </View>

                    {/* <View>
                        <View style={{ height: 500 }}>
                            <FlatList
                                data={review}
                                nestedScrollEnabled={true}
                                keyExtractor={(item) => item.id + ""}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={style.reviewItem}
                                            onPress={() => navigation.navigate("detail", item)}
                                        >
                                            <Text>{item.title}</Text>
                                            <Image style={{ height: 50, width: 50 }} source={require("../assets/img/gaixinh.jpg")} />
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                        <Button title="Show modal" onPress={() => setModalVisible(!modalVisible)} />
                        <View>
                            <CreateModal
                                modalVisible={modalVisible}
                                setModalVisible={setModalVisible}
                                addNew={addNew}
                            />
                        </View>

                        <View>
                            <ScrollView horizontal={true}>{review.map((reviews) => (
                                <TouchableOpacity key={reviews.id} style={style.reviewContainer} onPress={() => alert(reviews.title)}>
                                    <Text style={style.reivewName}>{reviews.title}</Text>
                                </TouchableOpacity>
                            ))}
                            </ScrollView>
                        </View>
                    </View> */}

                    <View style={style.categories}>
                        {['All', 'Thức ăn', 'Nước uống'].map(category => (
                            <TouchableOpacity
                                key={category}
                                style={[
                                    style.categoryButton,
                                    selectedCategory === category && style.selectedCategory
                                ]}
                                onPress={() => setSelectedCategory(category)} // Cập nhật danh mục khi nhấn
                            >
                                <Text style={style.categoryText}>{category}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Hiển thị danh sách món ăn theo danh mục */}
                    <FlatList
                        data={filteredItems}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={style.item} onPress={() => navigation.navigate('detail', item)}>
                                <Text style={style.itemText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />


                    <CartScreen />
                </ScrollView>
            </GestureHandlerRootView>
        </>

    )
};

const style = StyleSheet.create({
    container: {
        height: "100%",
        borderWidth: 2,
        borderColor: "black",
    },
    searchBar: {
        borderBottomColor: "red",
        borderBottomWidth: 2,
        display: "flex",
        flexDirection: "row",
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