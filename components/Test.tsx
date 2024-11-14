import React, { useState } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Test = () => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  // Hàm xử lý tìm kiếm
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    console.log("Tìm kiếm:", text);
  };

  // Animated Header
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100], // Di chuyển header lên
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
        <Text style={styles.headerText}>Header</Text>
      </Animated.View>

      {/* SearchBar */}
      <Animated.View style={[styles.searchBar, { transform: [{ translateY: headerTranslateY }] }]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </Animated.View>

      {/* Nội dung chính */}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          <Text style={styles.text}>Nội dung 1</Text>
          <Text style={styles.text}>Nội dung 2</Text>
          <Text style={styles.text}>Nội dung 3</Text>
          <Text style={styles.text}>Nội dung 4</Text>
          <Text style={styles.text}>Nội dung 5</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#662C1B',
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
  },
  searchBar: {
    position: 'absolute',
    top: 100, // Dựa vào vị trí của header
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    zIndex: 2,
  },
  searchInput: {
    height: 40,
    borderColor: '#FFD15C',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    marginTop: 160, // Để tránh header che mất nội dung
  },
  content: {
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Test;
