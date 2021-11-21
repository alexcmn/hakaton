import React from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'

const { width, height } = Dimensions.get('window');

const data = [
    {
        key: 'faq1',
        icon: 'pill',
        name: 'Šta je rak dojke?',
    },
    {
        key: 'faq2',
        icon: 'pill',
        name: 'Koliko se često javlja rak dojke?',
    },
    {
        key: 'faq3',
        icon: 'pill',
        name: 'Šta izaziva rak dojke?',
    },
    {
        key: 'faq4',
        icon: 'pill',
        name: 'Kako se postavlja dijagnoya raka dojke?',
    },
    {
        key: 'faq5',
        icon: 'pill',
        name: 'Kako će biti određena moja terapija?',
    },
    {
        key: 'faq6',
        icon: 'pill',
        name: 'Koje su mogućnosti lečenja neinvazivnog raka dojke (stadijum 0)?',
    },
    {
        key: 'faq7',
        icon: 'pill',
        name: 'Koje su mogućnosti lečenja ranog invazivnog raka dojke (staijum I-IIA)?',
    },
    {
        key: 'faq8',
        icon: 'pill',
        name: 'Koje su mogućnosti lečenja lokalno uznapredovalog raka dojke (stadijum IIB III)?',
    },
    {
        key: 'faq9',
        icon: 'pill',
        name: 'Koje su mogućnosti lečenja metastatskog raka dojke (stadijum IV)?',
    },
    {
        key: 'faq10',
        icon: 'pill',
        name: 'Posebne populacije',
    },
    {
        key: 'faq11',
        icon: 'pill',
        name: 'Klinička ispitivanja',
    },
    {
        key: 'faq12',
        icon: 'pill',
        name: 'Dodatne intervencije',
    },
    {
        key: 'faq13',
        icon: 'pill',
        name: 'Koja su moguća neželjena dejstva terapije?',
    },
    {
        key: 'faq14',
        icon: 'pill',
        name: 'Šta se dešava nakon završetka mojeg lečenja?',
    },
    {
        key: 'faq15',
        icon: 'pill',
        name: 'Grupe za podršku',
    },
    {
        key: 'faq16',
        icon: 'pill',
        name: 'Rečnik pojmova',
    },
    {
        key: 'faq17',
        icon: 'pill',
        name: 'Reference',
    },
];

export default function InfoCategory({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.container_wrapp}>
                <TouchableOpacity style={styles.back_btn} onPress={() => navigation.goBack()}>
                    <Image source={require('../../../../assets/images/icons/back.png')} />
                </TouchableOpacity>
                <ScrollView style={{marginTop: 20}}>
                    {
                        data.map((val, idx) => {
                            return (
                                <TouchableOpacity
                                    key={idx}
                                    onPress={() => navigation.navigate('singleInfo', { chapter: data[idx] })}
                                    style={styles.faq_box}
                                >
                                    <Text style={styles.info_text}>{val.name}</Text>
                                    <Image 
                                        source={require('../../../../assets/images/icons/right.png')} 
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
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
    back_btn: {
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#39A7DD'
    },
    faq_box:{
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#39A7DD',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 20
    },
    info_text:{
        color: '#fff',
        fontWeight: '500',
    }
})