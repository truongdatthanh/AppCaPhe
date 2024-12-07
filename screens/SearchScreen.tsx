import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

const SearchScreen = () =>
{
    const [ query, setQuery ] = useState( '' );
    const [ results, setResults ] = useState<string[]>( [] );

    const handleSearch = () =>
    {
        // Mock search function
        const mockResults = [ 'Result 1', 'Result 2', 'Result 3' ].filter( item =>
            item.toLowerCase().includes( query.toLowerCase() )
        );
        setResults( mockResults );
    };

    return (
        <View style={ styles.container }>
            <View style={ styles.headerSearch }>
                <TextInput
                    style={ { flex: 1, borderWidth: 1, padding: 8 } }
                    placeholder="Search"
                    value={ query }
                    onChangeText={ setQuery }
                />
                <Button title="Search" onPress={ handleSearch } />
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    headerSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "blue",
    },

} );

export default SearchScreen;