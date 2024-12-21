import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailScreen from "../../screens/DetailScreen";
import AppHeader from "./app.header";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "../../screens/CartScreen";
import { useEffect, useState } from "react";
import { RootStackParamList } from "../../types/route";
import CheckoutScreen from "../../screens/CheckoutScreen";
import ProductScreen from "../../screens/ProductScreen";
import SearchScreen from "../../screens/SearchScreen";
import OrderCompletedScreen from "../../screens/OrderCompletedSreen";
import OptionScreen from "../../screens/OptionScreen";
import SettingScreen from "../../screens/SettingScreen";
import ChangePasswordScreen from "../../screens/ChangePasswordScreen";
import PoliciesScreen from "../../screens/PoliciesScreen";
import AboutScreen from "../../screens/AboutScreen";


const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator();

const HomeLayout = () =>
{
    return (
        <BottomTab.Navigator screenOptions={ {
            tabBarLabelStyle: {
                fontSize: 14, 
                fontWeight: "bold", 
                textAlign: "center",
            },
            tabBarStyle: {
                height: 60, 
                justifyContent: "center",
                paddingBottom: 20, 
                paddingTop: 10, 
            },
        } }>
            <BottomTab.Screen name="home1" component={ MyStack } options={ { title: "Trang chủ", headerShown: false, tabBarIcon: () => null, } } />
            <BottomTab.Screen name="product" component={ ProductScreen } options={ { title: 'Đặt hàng', headerShown: false, tabBarIcon: () => null } } />
            <BottomTab.Screen name="cart" component={ CartScreen } options={ { title: 'Giỏ hàng', headerShown: false, tabBarIcon: () => null } } />
            <BottomTab.Screen name="other" component={ OptionLayout } options={ { title: 'Khác', headerShown: false, tabBarIcon: () => null } } />
        </BottomTab.Navigator>
    )
};

const OptionLayout = () =>
{
    return (
        <Stack.Navigator>
            <Stack.Screen name="other1" component={ OptionScreen } options={ { headerShown: false } } />
            <Stack.Screen name="profile" component={ ProfileScreen } options={ { title: "Hồ Sơ", headerShown: true } } />
            <Stack.Screen name="setting" component={ SettingScreen } options={ { headerShown: false } } />
            <Stack.Screen name="changePassword" component={ ChangePasswordScreen } options={ { title: "" } } />
            <Stack.Screen name="policies" component={ PoliciesScreen } options={ { title: "Chính Sách" } } />
            <Stack.Screen name="about" component={ AboutScreen } options={ { title: "" } } />
        </Stack.Navigator>
    )
}

const SettingLayout = () =>
{
    return (
        <Stack.Navigator >
            <Stack.Screen name="setting1" component={ SettingScreen } options={ { headerShown: false } } />
            <Stack.Screen name="changePassword" component={ ChangePasswordScreen } options={ { headerShown: false } } />
        </Stack.Navigator>
    )
}


const MyStack = () =>
{
    return (
        <Stack.Navigator initialRouteName="home2">
            <Stack.Screen name="home2" component={ HomeScreen } options={ { header: () => <AppHeader /> } } />
            <Stack.Screen name="detail" component={ DetailScreen } options={ { headerShown: false, } } />
            <Stack.Screen name="profile" component={ ProfileScreen } options={ { title: "Hồ Sơ", headerShown: true, } } />
            <Stack.Screen name="cart" component={ CartScreen } options={ { headerShown: false } } />
            <Stack.Screen name="checkout" component={ CheckoutScreen } options={ { headerShown: false } } />
            <Stack.Screen name="search" component={ SearchScreen } options={ { headerShown: false } } />
            <Stack.Screen name="product" component={ ProductScreen } options={ { headerShown: false } } />
            <Stack.Screen name="completed" component={ OrderCompletedScreen } options={ { headerShown: false } } />
        </Stack.Navigator>
    )
}


const AppNavigation = () =>
{

    const [ isSignIn, setIsSignIn ] = useState( false );
    return (
        <Stack.Navigator
            screenOptions={ { headerShown: false } }
        >
            {
                isSignIn ? (
                    <Stack.Group>
                        <Stack.Screen name="home" component={ HomeLayout } />
                    </Stack.Group>

                ) : (
                    <Stack.Group>
                        <Stack.Screen name="login" component={ LoginScreen } />
                        <Stack.Screen name="register" component={ RegisterScreen } />
                        <Stack.Screen name="home" component={ HomeLayout } />
                    </Stack.Group>
                )
            }
        </Stack.Navigator>
    )
};

export default AppNavigation;

