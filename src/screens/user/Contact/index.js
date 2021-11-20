import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ContactScreen() {
    return (
        <View style={styles.container}>
            <Text>ContactScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})