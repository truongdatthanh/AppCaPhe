import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailScreen from "../../screens/DetailScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppHeader from "./app.header";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import About from "../../screens/AboutScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "../../screens/CartScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const HomeLayout = () => {
    return (
        // <Stack.Navigator initialRouteName="home">
        //     <Stack.Screen name="home" component={HomeScreen} options={{ header: () => <AppHeader /> }} />
        //     <Stack.Screen name="detail" component={DetailScreen} options={{ title: 'Chi tiết' }} />
        //     <Stack.Screen name="profile" component={MyBottomTab} options={{title: 'Trang ca nhan'}}/>
        // </Stack.Navigator>
        <BottomTab.Navigator>
            <BottomTab.Screen name="home" component={MyStack} options={{headerShown: false}}/>
            <BottomTab.Screen name="profile" component={ProfileScreen} />
            <BottomTab.Screen name="cart" component={CartScreen} />
        </BottomTab.Navigator>
    )
};

// const MyBottomTab = () => {
//     return (
       
//     )
// }

const MyStack = () => {
    return (
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="home" component={HomeScreen} options={{ header: () => <AppHeader /> }} />
            <Stack.Screen name="detail" component={DetailScreen} options={{ title: 'Chi tiết' }} />
            <Stack.Screen name="profile" component={ProfileScreen} options={{ title: 'Trang ca nhan' }} />
            <Stack.Screen name="cart" component={CartScreen} options={{ title: 'gio hang' }} />
        </Stack.Navigator>
    )
}

// const HomeDrawer = () => {
//     return(
//          <Drawer.Navigator initialRouteName="home"
//         // screenOptions={{ headerShown: false }}
//         >
//             <Drawer.Screen name="home" component={HomeLayout} options={{ title: 'Trang chủ', header: () => <></> }} />
//             <Drawer.Screen name="about" component={About} options={{ title: 'Thông tin', header: () => <AppHeader /> }} />
//             {/* <Drawer.Screen name="detail" component={DetailScreen}/> */}
//         </Drawer.Navigator>
//     )
// }

const AppNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="home" component={HomeLayout} />
        </Stack.Navigator>
    )
};

export default AppNavigation;