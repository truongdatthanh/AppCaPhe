import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native"
import { Alert, Button, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { RootStackParamList } from "../types/route";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { caphe } from "../services/caphe.service";

interface IUser
{
    _id: string;
    name: string;
    username: string;
    email: string;
    phoneNumber: string;
    role: string;
    address: string;
    avatar: string;
    status: boolean;
    password: string;
    birthday: string;
    gen: string;
}
const ProfileScreen = () =>
{
    const [ userId, setUserId ] = useState( "" );
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const [ user, setUser ] = useState<IUser>();
    const [ option, setOption ] = useState( 'Sửa' );
    const [ edit, setEdit ] = useState( false );


    const [ name, setName ] = useState( "" );
    const [ gen, setGen ] = useState( "" );
    const [ birthday, setBirthday ] = useState( "" );
    const [ email, setEmail ] = useState( "" );
    const [ phoneNumber, setPhoneNumber ] = useState( "" );
    const [ address, setAddress ] = useState( "" );
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
                    setUser( res.data );
                    setName( res.data.name );
                    setGen( res.data.gen );
                    setBirthday( res.data.birthday );
                    setEmail( res.data.email );
                    setPhoneNumber( res.data.phoneNumber );
                    setAddress( res.data.address );
                    setAvatar( res.data.avatar );
                } )
            }
        }, [ userId ] )
    );

    useFocusEffect(
        useCallback( () =>
        {
            navigation.getParent()?.setOptions( { tabBarStyle: { display: 'none' } } ); // Ẩn TabBar

            return () =>
            {
                navigation.getParent()?.setOptions( { tabBarStyle: { display: 'flex' } } ); // Hiển thị lại TabBar khi rời khỏi màn hình
            };
        }, [ navigation ] )
    );



    const handleLogout = () =>
    {
        navigation.reset( {
            index: 0,
            routes: [ { name: 'login' } ],
        } );
    }

    const handleEdit = () =>
    {
        if ( option === 'Sửa' )
        {
            setOption( 'Lưu' );
            setEdit( true );
        }
        else
        {
            try
            {
                caphe.getEditUser( userId, { name, gen, birthday, email, phoneNumber, address, avatar } );
                setOption( 'Sửa' );
                setEdit( false );
                Alert.alert( 'Thành công', 'Cập nhật thông tin thành công!' );
            } catch
            {
                console.log( "Lỗi" );
            }
        }
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

                <View style={ { flexDirection: "row", justifyContent: "space-between" } }>
                    <Text style={ style.titleHeader }>Thông Tin Chung</Text>
                    <TouchableOpacity onPress={ () => handleEdit() }>
                        <Text style={ { fontSize: 16, fontWeight: "400" } }>{ option }</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View >
                        <TextInput editable={ edit } value={ name } style={ [ style.input ] } placeholder="Họ tên" onChangeText={ ( v ) => setName( v ) } />
                        <TextInput editable={ edit } value={ gen } style={ [ style.input ] } placeholder="Giới tính" onChangeText={ ( v ) => setGen( v ) } />
                        <TextInput editable={ edit } value={ birthday } style={ [ style.input ] } placeholder="Ngày sinh" onChangeText={ ( v ) => setBirthday( v ) } />
                        <TextInput editable={ edit } value={ address } style={ [ style.input ] } placeholder="Địa chỉ" onChangeText={ ( v ) => setAddress( v ) } />
                    </View>

                    <View>
                        <Text style={ style.titleHeader }>Email</Text>
                        <TextInput editable={ edit } value={ email } style={ style.input } placeholder="Email" onChangeText={ ( v ) => setEmail( v ) } />
                    </View>

                    <View>
                        <Text style={ style.titleHeader }>Số điện thoại</Text>
                        <View style={ { flexDirection: "row" } }>
                            <TextInput editable={ false } style={ [ style.input, { width: "auto", marginRight: 20 } ] } >+ 84</TextInput>
                            <TextInput editable={ edit } value={ phoneNumber } style={ [ style.input, { flex: 2 } ] } placeholder="Sđt" onChangeText={ ( v ) => setPhoneNumber( v ) } />
                        </View>
                    </View>

                    {/* <View>
                        <Text style={ style.titleHeader }>Tài khoản liên kết</Text>
                        <TextInput style={ [ style.input ] } placeholder="Sđt" />
                        <TextInput style={ [ style.input ] } placeholder="Sđt" />
                    </View> */}

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
} )

export default ProfileScreen;