import React, { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import {
    TouchableOpacity,
    Alert,
    StatusBar,
    Dimensions,
    Animated,
    FlatList,
    Text,
    View,
    StyleSheet,
    Image
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';


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
    {
        key: '',
        icon: '',
        name: '',
    },
];

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 3;

const colors = {
    blue: '#39a7dd',
    dark: '#F4F7FF',
};

const { width, height } = Dimensions.get('window');

const Icon = memo(({ icon, color }) => {
    return <View><Icon2 name={icon} color={color} size={ICON_SIZE} /></View>
})

const Item = memo(({ icon, color, name, showText }) => {
    return (
        <View style={styles.itemWrapper}>
            {showText ? (
                <Text style={[styles.itemText, { color }]}>{name}</Text>
            ) : (
                <View style={{ backgroundColor: 'blue' }} />
            )}
            <Icon icon={icon} color={color} />
        </View>
    )
})

const ConnectWithText = memo(({ titleIndex }) => {
    return (
        <View
            style={{
                position: 'absolute',
                top: height / 2 - ITEM_HEIGHT,
                width: width * 0.7,
                paddingHorizontal: 14,
            }}
        >
            <Text
                style={{
                    color: colors.blue,
                    fontSize: 30,
                    fontWeight: '700',
                    lineHeight: 30,
                }}
            >
                Informacije
            </Text>
        </View>
    );
});

const ConnectButton = memo(({ onPress }) => {
    return (
        <View
            style={{
                position: 'absolute',
                top: height / 2 + ITEM_HEIGHT / 2,
                paddingHorizontal: 14,
            }}
        >
            <View
                style={{
                    height: ITEM_HEIGHT,
                    width: 4,
                    backgroundColor: colors.blue,
                }}
            />
            <TouchableOpacity
                onPress={onPress}
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    backgroundColor: colors.blue,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    borderTopRightRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                activeOpacity={0.8}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.dark, textTransform: 'uppercase' }}>
                    Detaljnije
                </Text>
            </TouchableOpacity>
        </View>
    );
});

const List = memo(
    forwardRef(
        ({ color, showText, style, onScroll, onItemIndexChange }, ref) => {
            return (
                <Animated.FlatList
                    ref={ref}
                    data={data}
                    style={style}
                    keyExtractor={(item) => `${item.name}-${item.icon}`}
                    bounces={false}
                    scrollEnabled={!showText}
                    scrollEventThrottle={16}
                    onScroll={onScroll}
                    decelerationRate='fast'
                    snapToInterval={ITEM_HEIGHT}
                    showsVerticalScrollIndicator={false}
                    renderToHardwareTextureAndroid
                    contentContainerStyle={{
                        paddingTop: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
                        paddingBottom: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
                        paddingHorizontal: 20,
                    }}
                    renderItem={({ item }) => {
                        return <Item {...item} color={color} showText={showText} />;
                    }}
                    onMomentumScrollEnd={(ev) => {
                        const newIndex = Math.round(
                            ev.nativeEvent.contentOffset.y / ITEM_HEIGHT
                        );

                        if (onItemIndexChange) {
                            onItemIndexChange(newIndex);
                        }
                    }}
                />
            );
        }
    )
);

export default function InfoScreen({ navigation }) {

    const [index, setIndex] = useState(0);
    const onConnectPress = useCallback(() => {
        navigation.navigate('singleInfo', {
            chapter: data[index],
        })
    }, [index]);

    const blueRef = useRef();
    const darkRef = useRef();
    const scrollY = useRef(new Animated.Value(0)).current;
    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
    );
    const onItemIndexChange = useCallback(setIndex, []);

    useEffect(() => {
        scrollY.addListener((v) => {
            if (darkRef?.current) {
                darkRef.current.scrollToOffset({
                    offset: v.value,
                    animated: false,
                });
            }
        });
    });

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <ConnectWithText titleIndex={index} />
            <List
                ref={blueRef}
                color={colors.blue}
                style={StyleSheet.absoluteFillObject}
                onScroll={onScroll}
                onItemIndexChange={onItemIndexChange}
            />
            <List
                ref={darkRef}
                color={colors.dark}
                showText
                style={{
                    position: 'absolute',
                    backgroundColor: colors.blue,
                    width,
                    height: ITEM_HEIGHT,
                    top: height / 2 - ITEM_HEIGHT / 2,
                }}
            />
            <ConnectButton onPress={onConnectPress} />
            <Item />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: colors.dark,
        position: 'relative'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: ITEM_HEIGHT,
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        width: width / 1.5
    },
});