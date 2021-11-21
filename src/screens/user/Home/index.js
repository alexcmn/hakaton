import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, SafeAreaView, LayoutAnimation, Platform, UIManager, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

const accordion = [
    {
        id: 5,
        title: 'Volimo sebe',
        isExpanded: false,
        desc: 'Hemoterapija uništava ćelije raka i koristi se za lečenje većine trostruko negativnih, HER2 pozitivnih i luminalnih karcinoma dojke B tipa. Hemoterapija se obično daje svake 1–3 nedelje putem intravenske infuzije. Nekim pacijentima takođe može biti ponuđena oralna hemoterapija nakon završetka standardne intravenske hemoterapije.',
    },
    {
        id: 4,
        title: 'Na dobrom si putu',
        isExpanded: false,
        desc: 'Hemoterapija uništava ćelije raka i koristi se za lečenje većine trostruko negativnih, HER2 pozitivnih i luminalnih karcinoma dojke B tipa. Hemoterapija se obično daje svake 1–3 nedelje putem intravenske infuzije. Nekim pacijentima takođe može biti ponuđena oralna hemoterapija nakon završetka standardne intravenske hemoterapije.',
    },
    {
        id: 3,
        title: 'Moji najdraži',
        isExpanded: false,
        desc: 'Hemoterapija uništava ćelije raka i koristi se za lečenje većine trostruko negativnih, HER2 pozitivnih i luminalnih karcinoma dojke B tipa. Hemoterapija se obično daje svake 1–3 nedelje putem intravenske infuzije. Nekim pacijentima takođe može biti ponuđena oralna hemoterapija nakon završetka standardne intravenske hemoterapije.',
    },
    {
        id: 2,
        title: 'Voli sebe',
        isExpanded: true,
        desc: 'Hemoterapija uništava ćelije raka i koristi se za lečenje većine trostruko negativnih, HER2 pozitivnih i luminalnih karcinoma dojke B tipa. Hemoterapija se obično daje svake 1–3 nedelje putem intravenske infuzije. Nekim pacijentima takođe može biti ponuđena oralna hemoterapija nakon završetka standardne intravenske hemoterapije.',
    },
    {
        id: 1,
        title: 'Podrška',
        isExpanded: false,
        desc: 'Hemoterapija uništava ćelije raka i koristi se za lečenje većine trostruko negativnih, HER2 pozitivnih i luminalnih karcinoma dojke B tipa. Hemoterapija se obično daje svake 1–3 nedelje putem intravenske infuzije. Nekim pacijentima takođe može biti ponuđena oralna hemoterapija nakon završetka standardne intravenske hemoterapije.',
    },
]

const ExpandableComponent = ({ item, onClickHandler, openModalHandler }) => {
    const [layoutHeight, setLayoutHeight] = useState(0);

    useEffect(() => {
        if (item.isExpanded) {
            setLayoutHeight(null)
        } else {
            setLayoutHeight(0)
        }
    }, [item.isExpanded])

    return (
        <View style={{ marginBottom: 10 }}>
            <TouchableOpacity style={styles.item} onPress={onClickHandler}>
                <View
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            color: '#3555ae',
                            fontWeight: '700',
                            textAlign: 'center'
                        }}
                    >{item.id}</Text>
                </View>
                <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
            <View
                style={{
                    height: layoutHeight,
                    overflow: 'hidden'
                }}
            >
                <View style={styles.content}>
                    <View
                        style={{
                            paddingVertical: 10,
                            alignItems: 'flex-end',
                            justifyContent: 'center'
                        }}
                    >
                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Text>23.07</Text>
                            <Icon color="#707070" size={25} name="bell" />
                        </View>
                        <Text>Podsjetnik</Text>
                    </View>
                    <Image source={require('../../../../assets/images/main.png')} />
                    <Text style={styles.text}>{item.desc}</Text>
                    <View style={styles.seperator} />
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 20
                        }}
                    >
                        <View style={styles.tab_modal_wrapp}>
                            <TouchableOpacity style={styles.tab_modal_btn} onPress={openModalHandler}>
                                <Image source={require('../../../../assets/images/paper.png')} />
                                <Text>Nalazi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tab_modal_btn} onPress={openModalHandler}>
                                <Image source={require('../../../../assets/images/paper.png')} />
                                <Text>Ljekovi</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.tab_modal_wrapp}>
                            <TouchableOpacity style={styles.tab_modal_btn} onPress={openModalHandler}>
                                <Image source={require('../../../../assets/images/advice.png')} />
                                <Text>Savjeti</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tab_modal_btn} onPress={openModalHandler}>
                                <Image source={require('../../../../assets/images/hand.png')} />
                                <Text>Nuspojave</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.tab_modal_wrapp}>
                            <TouchableOpacity style={styles.tab_modal_btn} onPress={openModalHandler}>
                                <Image source={require('../../../../assets/images/paper.png')} />
                                <Text>Institucije</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default function Home() {

    const [modalVisible, setModalVisible] = useState(false);
    const [accordionData, setAccordionData] = useState(accordion);

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    const updateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const arr = [...accordionData];
        // for pultiple select
        // arr[index]['isExpanded'] = !arr[index]['isExpanded'];
        // f0r single select
        arr.map((val, idx) => idx === index
            ? (arr[idx]['isExpanded']) = !arr[idx]['isExpanded']
            : (arr[idx]['isExpanded']) = false
        );
        setAccordionData(arr)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.container_wrapp}>
                    <ScrollView>
                        {
                            accordionData.map((acc, idx) => {
                                return (
                                    <ExpandableComponent
                                        key={acc.title}
                                        item={acc}
                                        onClickHandler={() => {
                                            updateLayout(idx)
                                        }}
                                        openModalHandler={() => {
                                            setModalVisible(!modalVisible)
                                        }}
                                    />
                                )
                            })
                        }
                    </ScrollView>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible)
                        }}
                    >
                        <View style={styles.modal}>
                            <TouchableOpacity
                                style={styles.close_btn}
                                onPress={() => setModalVisible(false)}
                                activeOpacity={1}
                            >
                                <Image source={require('../../../../assets/images/icons/close.png')} />
                            </TouchableOpacity>
                            <View style={styles.modal_header}>
                                <Text style={styles.itemText, { color: '#707070' }}>POTREBNI NALAZI ZA DOLAZAK NA SPROVOĐENJE HEMIOTERAPIJE</Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 20,
                                    position: 'relative',
                                    borderTopColor: '#707070',
                                    borderTopWidth: 1,
                                    paddingVertical: 20
                                }}>
                                <Text>Kompletna dokumentacija o sadašnjoj bolesti: • otpusna lista i PH nalaz ukoliko je predhodila operacija • UZ gornjeg abdomena, RTG srca I pluća, drugi postojeći nalazi • dokumentacija ako je lečenje započeto u drugoj zdravstvenoj ustanovi • Odluka Onkološke komisije o daljem načinu lečenja • KKS, ŠUK, urea, kreatinin, ukupni proteini, albumini, bilirubin ukupni i direktni, AST, ALT, GGT, ALKP, LDH, Na, K, Ca, Cl, P, anti HCV i HBs Ag • EHO srca, EKG, mišljenje kardiologa o podobnosti primene hemioterapije • Krvna grupa i Rh faktor Svi navedeni laboratorijski nalazi, osim krvne grupe i Rh faktora , ne mogu se uvažiti ako su stariji od dve nedelje. Na dan sprovođenja hemioterapije potrebno je doručkovati i ako imate terapiju za neku od hroničnih bolesti popiti svoje lekove. Poneti svu traženu i navedenu dokumentaciju.</Text>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </SafeAreaView>
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
    item: {
        backgroundColor: 'rgba(53, 85, 174, 0.25)',
        borderRadius: 10,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        paddingVertical: 20,
        paddingHorizontal: 50,
        position: 'relative',
    },
    itemText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#3555ae',
        paddingLeft: 10,
    },
    content: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    text: {
        fontSize: 16,
        padding: 10
    },
    seperator: {
        height: 0.5,
        backgroundColor: '#c8c8c8',
        width: '100%'
    },
    modal: {
        width: width - 50,
        flex: 1,
        marginVertical: width / 3,
        borderRadius: 20,
        backgroundColor: '#fff',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50,
        position: 'relative'
    },
    close_btn: {
        width: 40,
        height: 40,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(53, 85, 174, 0.25)'
    },
    modal_header: {
        width: width - 100,
        height: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 20
    },
    tab_modal_wrapp:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',  
        width: width - 80,
        marginBottom: 10
    },
    tab_modal_btn: {
        width: (width - 80) / 2,
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 10
    }
})