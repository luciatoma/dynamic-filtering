import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './src/components/pages/HomePage';

// Main mobile component
const App = () => (
    <View style={styles.container}>
        <Home />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
    },
});

export default App;
