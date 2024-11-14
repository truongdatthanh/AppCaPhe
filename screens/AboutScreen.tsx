import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

const style = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: "green",
    }
});

const About = () => {
    return (
        <View style={style.container}>
            <Text>About</Text>
        </View>
    )
};

export default About;