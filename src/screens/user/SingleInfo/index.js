import React, { useCallback } from 'react'
import { StyleSheet, Text, View, StatusBar, Button, SafeAreaView, ScrollView, Dimensions, Image, FlatList, Linking, TouchableOpacity } from 'react-native'
import data from './data';

const { width, height } = Dimensions.get('window');

export default function SingleInfo({ route, navigation }) {
    
    const { chapter } = route.params;
    const findData = data.find(el => el.id === chapter.key);

    const navigateBack = () => navigation.goBack();

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => navigateBack()}
                style={styles.back_btn}
                activeOpacity={1}
            >
                <Image source={require('../../../../assets/images/icons/back.png')} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>    
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
                <Text style={styles.chapHeadline}>{chapter.name}</Text>
            </View>
            <ScrollView style={styles.textScrollView}>
                {
                    findData && findData.boxes.map((box, idx) => {
                        const { head, desc, ul } = box;
                        return (
                            <View key={idx}>
                                {head ? <Text style={styles.chapHeadline2}>{head}</Text> : null}
                                {desc ? <Text style={styles.chapDesc}>{desc}</Text> : null}
                                {
                                    ul ?
                                        ul.map((list, li_idx) => {
                                            return (
                                                <View key={li_idx}>
                                                    {list.title ? <Text style={styles.chapUlTitle}>{list.title}</Text> : null}
                                                    {list.desc ? <Text style={styles.chapUlDesc}>{list.desc}</Text> : null}
                                                    <FlatList
                                                        data={list.list}
                                                        renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>
                                                            <Text style={{ color: '#3555ae', fontSize: 20, paddingRight: 5 }}>{'\u2022'}</Text>
                                                            <Text style={styles.chapLi}>{item}</Text>
                                                        </View>}
                                                    />
                                                    {list.desc2 ? <Text style={styles.chapUlDesc}>{list.desc2}</Text> : null}
                                                    {
                                                        list.img &&
                                                        list.img.map((boxImg, idx) => {
                                                            return (
                                                                <View key={idx} style={{ marginBottom: 10 }}>
                                                                    <Image
                                                                        style={{
                                                                            width: null,
                                                                            resizeMode: 'contain',
                                                                            height: 220
                                                                        }}
                                                                        source={boxImg}
                                                                    />
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </View>
                                            )
                                        })
                                        : null
                                }
                            </View>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#f0efef'
    },
    back_btn:{
        backgroundColor: '#fab816',
        width: 50,
        height: 50,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20
    },
    headTop: {
        height: 80,
        width,
        backgroundColor: '#fab816',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    ChapIcon: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#fab816',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chapHeadline: {
        marginBottom: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fab816'
    },
    textScrollView: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    chapHeadline2: {
        color: '#3555ae',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    chapDesc: {
        color: '#A9A9A9',
        fontSize: 16,
        marginVertical: 10,
    },
    chapUlTitle: {
        color: '#3555ae',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    chapUlDesc: {
        color: '#A9A9A9',
        fontSize: 16,
        marginVertical: 10,
    },
    chapLi: {
        color: '#A9A9A9',
        fontSize: 16,
    },
})
