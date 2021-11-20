import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function InfoScreen() {
    return (
        <View style={styles.container}>
            <Text>InfoScreen</Text>
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