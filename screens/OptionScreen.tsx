import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native"
import { Alert, Button, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableOpacityComponent, View } from "react-native"
import { RootStackParamList } from "../types/route";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { caphe } from "../services/caphe.service";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';


const OptionScreen = () =>
{
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const [ userId, setUserId ] = useState( "" );
    const [ name, setName ] = useState( "" );
    const [ avatar, setAvatar ] = useState( "" );



    useEffect( () =>
    {
        AsyncStorage.getItem( 'UserId' ).then( ( value ) => setUserId( value ?? "" ) );
    }, [] );

    useFocusEffect(
        useCallback( () =>
        {
            if ( userId )
            {
                caphe.getUserById( userId ).then( ( res: any ) =>
                {
                    setName( res.data.name );
                    setAvatar( res.data.avatar );
                } )
            }
        }, [ userId ] )
    );


    const handleLogout = () =>
    {
        navigation.reset( {
            index: 0,
            routes: [ { name: 'login' } ],
        } );
    }

    return (
        <View style={ style.container }>
            <StatusBar animated={ true }
                backgroundColor="black"
                barStyle="light-content"     // Options: 'default', 'light-content', 'dark-content'
            />
            <View style={ style.header }>
                <View style={ style.headerAvatar }>
                    <Image style={ style.headerAvatarImage } source={ require( "../assets/img/caphe1.jpg" ) }></Image>
                </View>
                <View style={ style.headerRole }>
                    <Text style={ style.headerRoleText }>{ name }</Text>
                    <Text style={ style.headerRoleText }>| THÀNH VIÊN</Text>
                </View>
            </View>
            <View style={ style.body }>

                <View style={ { flexDirection: "column" } }>
                    <Text style={ style.titleHeader }>Tài Khoản</Text>
                    <View style={ style.optionSpace }>
                        <TouchableOpacity onPress={ () => navigation.navigate( 'profile' ) } style={ [ style.optionContent, { borderBottomWidth: 1, borderColor: "gray" } ] }>
                            <FontAwesome name="user" size={ 20 } color="black" />
                            <Text style={ { fontSize: 16, fontWeight: "400" } }>Hồ Sơ</Text>
                            <AntDesign name="right" size={ 20 } color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => navigation.navigate( 'setting' ) } style={ [ style.optionContent, { right: 1 } ] }>
                            <Ionicons name="settings" size={ 20 } color="black" />
                            <Text style={ { fontSize: 16, fontWeight: "400" } }>Cài Đặt</Text>
                            <AntDesign name="right" size={ 20 } color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={ { flexDirection: "column", marginTop: 20 } }>
                    <Text style={ style.titleHeader }>Thông Tin Chung</Text>
                    <View style={ style.optionSpace }>
                        <TouchableOpacity onPress={ () => navigation.navigate( 'policies' ) } style={ [ style.optionContent, { borderBottomWidth: 1, borderColor: "gray" } ] }>
                            <Foundation name="clipboard-notes" size={ 20 } color="black" />
                            <Text style={ { fontSize: 16, fontWeight: "400" } }>Chính Sách / Policies</Text>
                            <AntDesign name="right" size={ 20 } color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => navigation.navigate( 'about' ) } style={ [ style.optionContent, {right: 2 } ] }>
                            <Ionicons name="information-circle" size={ 20 } color="black" />
                            <Text style={ { fontSize: 16, fontWeight: "400" } }>Giới thiệu về phiên bản ứng dụng</Text>
                            <AntDesign name="right" size={ 20 } color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <TouchableOpacity style={ style.btnLogout } onPress={ handleLogout }>
                        <Text style={ { color: "#fff" } }>Đăng Xuất Ở Đây Nè!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create( {
    container: {
        flex: 1,
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
        width: "40%",
        flexDirection: "row",
        padding: 20,
    },
    headerRoleText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    },
    body: {
        padding: 20,
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
        borderRadius: 2,
        paddingHorizontal: 10,
        marginBottom: 12,
        marginTop: 12,
        fontSize: 16,
    },
    btnLogout: {
        marginTop: 20,  
        height: 40,
        backgroundColor: "#FF0000",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    titleHeader: {
        color: "#b03b47",
        fontSize: 20,
        fontWeight: "600"
    },

    optionSpace: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        // marginBottom: 10,
    },

    optionContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    }
} )

export default OptionScreen;