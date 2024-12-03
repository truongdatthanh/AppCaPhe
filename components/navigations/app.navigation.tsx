import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailScreen from "../../screens/DetailScreen";
import AppHeader from "./app.header";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "../../screens/CartScreen";
import { useState } from "react";
import { RootStackParamList } from "../../types/route";
import CheckoutScreen from "../../screens/CheckoutScreen";


const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator();

const HomeLayout = () =>
{
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen name="home1" component={ MyStack } options={ { headerShown: false } } />
            <BottomTab.Screen name="cart" component={ CartScreen } options={ { title: 'gio hang', headerShown: false } } />
            <BottomTab.Screen name="profile" component={ ProfileScreen } />
        </BottomTab.Navigator>
    )
};


const MyStack = () =>
{
    return (
        <Stack.Navigator >
            <Stack.Screen name="home2" component={ HomeScreen } options={ { header: () => <AppHeader /> } } />
            <Stack.Screen name="detail" component={ DetailScreen } options={ { title: 'Chi tiết', headerShown: false } } />
            <Stack.Screen name="profile" component={ ProfileScreen } options={ { title: 'Trang ca nhan' } } />
            <Stack.Screen name="cart" component={ CartScreen } options={ { title: 'gio hang',  headerShown: false } } />
            <Stack.Screen name="checkout" component={ CheckoutScreen } options={ { title: 'thanh toan' } } />
        </Stack.Navigator>
    )
}


const AppNavigation = () =>
{

    const [ isSignIn, setIsSignIn ] = useState( true );

    return (
        <Stack.Navigator
            screenOptions={ { headerShown: false } }
        >
            {
                isSignIn ? (
                    <Stack.Group>
                        <Stack.Screen name="home" component={ HomeLayout } />
                        {/* <Stack.Screen name="detail" component={ DetailScreen } /> */}
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

