import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'

const { width, height } = Dimensions.get('window');

export default function Info({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.container_wrapp}>
                <View style={styles.info_header}>
                    <Image source={require('../../../../assets/images/info.png')} />
                    <Text style={styles.header_text}>Informacije</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <View style={styles.row}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('infoCategory')}>
                                <Image source={require('../../../../assets/images/ribbon.png')} />
                            </TouchableOpacity>
                            <Text style={styles.btn_text}>O karcinomu dojki</Text>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('infoCategory')}>
                                <Image source={require('../../../../assets/images/pill.png')} />
                            </TouchableOpacity>
                            <Text style={styles.btn_text}>Ljekovi</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('infoCategory')}>
                                <Image source={require('../../../../assets/images/hand.png')} />
                            </TouchableOpacity>
                            <Text style={styles.btn_text}>Nuspojave</Text>
                        </View>
                    </View>
                </View>
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
        position: 'relative',
    },
    container_wrapp: {
        position: 'absolute',
        bottom: 0,
        width: width - 40,
        height: height - 50,
    },
    info_header: {
        width: width - 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    header_text: {
        fontWeight: '500',
        fontSize: 25,
        color: '#707070'
    },
    row: {
        marginBottom: 50,
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    btn:{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(57, 167, 221, 0.25)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    btn_text:{
        fontSize: 16,
        color: '#707070',
        fontWeight: '500'
    }
})