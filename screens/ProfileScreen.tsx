import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Button, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const ProfileScreen = () => {

    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const handleLogout = () => {
        navigation.navigate("login");
    }

    return (
        <View style={style.container}>
            <StatusBar animated={true}
                backgroundColor="black"
                barStyle="light-content"     // Options: 'default', 'light-content', 'dark-content'
            />
            <View style={style.header}>
                <View style={style.headerAvatar}>
                    <Image style={style.headerAvatarImage} source={require("../assets/img/caphe1.jpg")}></Image>
                </View>
                <View style={style.headerRole}>
                    <Text style={style.headerRoleText}>THÀNH VIÊN</Text>
                </View>
            </View>
            <View style={style.body}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "600" }}>Thông Tin Chung</Text>
                    <TouchableOpacity onPress={() => alert("edit")}>
                        <Text style={{ fontSize: 16, fontWeight: "400" }}>Sửa</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={style.inputName}>
                        <TextInput style={[style.input, {flex: 1, marginHorizontal: 10}]} placeholder="Họ và Tên Lót" />
                        <TextInput style={[style.input, {flex: 1, marginHorizontal: 10}]} placeholder="Tên" />
                    </View>

                    <View>
                        <Text>Email</Text>
                        <TextInput style={style.input} placeholder="Email" />
                    </View>

                    <View>
                        <Text>Số điện thoại</Text>
                        <TextInput style={style.input} placeholder="Sđt" />
                    </View>

                    <View>
                        <TouchableOpacity style={style.btnLogout} onPress={handleLogout}>
                            <Text style={{ color: "#fff" }}>Đăng Xuất Ở Đây Nè!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "red",
    },
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    headerAvatar: {
        padding: 20,
    },
    headerAvatarImage: {
        height: 100,
        width: 100,
        borderRadius: 100,
    },
    headerRole: {
        padding: 20,
    },
    headerRoleText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    },
    body: {
        flex: 4,
        backgroundColor: "#ccc",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
    },
    btnLogout: {
        height: 40,
        backgroundColor: "#FF0000",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    inputName: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "auto"
    }
})

export default ProfileScreen;