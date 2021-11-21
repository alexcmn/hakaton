import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('screen')

export default function Login({ navigation }) {

    const redirectTo = (path) =>{
        navigation.navigate(path)
    }

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/animations/login.json')}
                autoPlay
                loop
            />
            <View style={styles.btn_wrapp}>
                <TouchableOpacity style={styles.btn} onPress={() => redirectTo('usMain')}>
                    <Text style={styles.text}>Uloguj se kao pacijent</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => redirectTo('docMain')}>
                    <Text style={styles.text}>Uloguj se kao doktor</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    btn_wrapp:{
        width: width - 50,
        position: 'absolute',
        bottom: 25
    },
    btn:{
        backgroundColor: 'rgba(53, 85, 174, 0.25)',
        borderRadius: 10,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    text:{
        color: '#3555ae',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})