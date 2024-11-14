import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailScreen from "../../screens/DetailScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppHeader from "./app.header";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import About from "../../screens/AboutScreen";


const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const HomeLayout = () => {
    return (
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="home" component={HomeScreen} options={{ header: () => <AppHeader /> }} />
            {/* <Stack.Screen name="about" component={About} options={{title: 'Thong tin Stack'}}/> */}
            <Stack.Screen name="detail" component={DetailScreen} options={{ title: 'Chi tiết' }} />
        </Stack.Navigator>
    )
};

const HomeDrawer = () => {
    return(
         <Drawer.Navigator initialRouteName="home"
        // screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="home" component={HomeLayout} options={{ title: 'Trang chủ', header: () => <></> }} />
            <Drawer.Screen name="about" component={About} options={{ title: 'Thông tin', header: () => <AppHeader /> }} />
            {/* <Drawer.Screen name="detail" component={DetailScreen}/> */}
        </Drawer.Navigator>
    )
}

const AppNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={LoginScreen}/>
            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="home" component={HomeLayout} />
        </Stack.Navigator>
    )
};

export default AppNavigation;