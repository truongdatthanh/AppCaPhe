import { Alert, Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";

interface IProps {
    modalVisible: boolean,
    setModalVisible: (v: boolean) => void,
    addNew: any,
};

const CreateModal = (props: IProps) => {

    const { modalVisible, setModalVisible, addNew } = props;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = () => {
            if(!title){
                Alert.alert("Thong tin khong hop le", "Tieu de khong duoc de trong")
            }
            if(!content){
                Alert.alert("Thong tin khong hop le", "Noi dung khong duoc de trong")
            }

            addNew({
                id: 8,
                content,
                title
            })

            setModalVisible(false);
            setContent("");
            setTitle("");
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Hello World!</Text>
                        <AntDesign name="closecircleo" size={24} color="black" onPress={() => setModalVisible(false)} />
                    </View>

                    {/* Body */}
                    <View>
                        <View style={{marginHorizontal: 10}}>
                            <Text>Tiêu đề</Text>
                            <TextInput value={title} onChangeText={(v) => setTitle(v)} style={{borderWidth: 1, borderColor: "black", borderRadius: 4, paddingHorizontal: 10}}/>
                        </View>
                        <View style={{marginHorizontal: 10}}>
                            <Text>Nội dung</Text>
                            <TextInput value={content} onChangeText={(v) => setContent(v)} style={{borderWidth: 1, borderColor: "black", borderRadius: 4, paddingHorizontal: 10}}/>
                        </View>
                    </View>

                    {/* Footer */}
                    <View>
                        <Button title="Add" onPress={() => handleSubmit()}/>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ccc",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "red",
        alignItems: "center",
    },
    headerText: {
        fontSize: 20,
    }
})

export default CreateModal;