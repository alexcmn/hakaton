import React, { useState, useCallback, useEffect } from 'react'
import { Image, View, Text, Dimensions, ToastAndroid } from 'react-native'
import { NativeBaseProvider, Box, HStack, Stack, Center, Heading, Badge } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Conversation from "./Conversation"


const defaultAvatar = require("../../../assets/images/female-patient-default.png")

const dummyData = {
    "doktor": {
        "id": 1001,
        "ime": "Jelena",
        "prezime": "Marković",
        "oblast": "Onkolog", // specijalizacija ili sl.
        "slika": require("../../../assets/images/female-doctor.png"),
        "institucija": "relacija sa institucijom",
        "pacijenti": [
            {
                "id": 1,
                "ime": "Marija",
                "prezime": "Nikolić",
                "godiste": 1985,
                "pol": "ženski",
                "slika": require("../../../assets/images/female-patient.png"),
                "opstina": "Pljevlja", // opstina/grad
                "doktor": 1001,
                "terapija": 3,
                "faza": 2,
            },
            {
                "id": 2,
                "ime": "Milica",
                "prezime": "Petrović",
                "godiste": 1987,
                "pol": "ženski",
                "slika": require("../../../assets/images/female-patient-default.png"),
                "opstina": "Bar", // opstina/grad
                "doktor": 1001,
                "terapija": 2,
                "faza": 4,
            },
            {
                "id": 3,
                "ime": "Ivana",
                "prezime": "Saveljić",
                "godiste": 1976,
                "pol": "ženski",
                "slika": require("../../../assets/images/female-patient-2.png"),
                "opstina": "Podgorica", // opstina/grad
                "doktor": 1001,
                "terapija": 3,
                "faza": 4,
            },
            {
                "id": 4,
                "ime": "Jovana",
                "prezime": "Jovanović",
                "godiste": 1975,
                "pol": "ženski",
                "slika": require("../../../assets/images/female-patient-3.png"),
                "opstina": "Podgorica", // opstina/grad
                "doktor": 1001,
                "terapija": 3,
                "faza": 4,
            }
        ],
        // "konverzacije": ["relacije sa konverzacijama sa pacijentima - moze biti vise aktivnih u jednom trenu"]
        "konverzacije": [
            {
                "id": 1,
                "aktivna": true,
                "pacijent": 1,
                "doktor": 1001,
                "poruke": [
                    {
                        "tekst": "Dobar dan, možete li mi reći da li su ovi nalazi dobri?",
                        "autor": "pacijent",
                        "nalaz": null,
                        "timestamp": "1637259629",
                        "procitana": true
                    },
                    {
                        "tekst": null,
                        "autor": "pacijent",
                        "nalaz": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLWeD5MZ7uom-o9s18MLOQ5_S0V_Z38fsYA&usqp=CAU",
                        "timestamp": "1637259929",
                        "procitana": true
                    },
                    {
                        "tekst": "Zdravo Marija, koliko vidim eritrociti su vam povišeni ali to je sasvim u redu",
                        "autor": "doktor",
                        "nalaz": null,
                        "timestamp": "1637260649",
                        "procitana": true
                    },
                    {
                        "tekst": "Donesite taj nalaz kao i ostale u utorak na pregled, pozdrav",
                        "autor": "doktor",
                        "nalaz": null,
                        "timestamp": "1637260709",
                        "procitana": false
                    },
                ]
            },
            {
                "id": 2,
                "aktivna": true,
                "pacijent": 2,
                "doktor": 1001,
                "poruke": [
                    {
                        "tekst": "Zdravo, u apoteci nemaju terapiju koja je prepisana, mogu li uzeti alternativu?",
                        "autor": "pacijent",
                        "nalaz": null,
                        "timestamp": "1637260709",
                        "procitana": true
                    }
                ]
            },
            {
                "id": 3,
                "aktivna": false,
                "pacijent": 3,
                "doktor": 1001,
                "poruke": [
                    {
                        "tekst": "Dobro veče",
                        "autor": "pacijent",
                        "nalaz": null,
                        "timestamp": "1637260709",
                        "procitana": true
                    },
                ]
            },
            {
                "id": 3,
                "aktivna": false,
                "pacijent": 4,
                "doktor": 2,
                "poruke": [
                    {
                        "tekst": "Dovidjenja!",
                        "autor": "pacijent",
                        "nalaz": null,
                        "timestamp": "1637260709",
                        "procitana": true
                    },
                ]
            }
        ],
    },
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DoctorMain() {
    const [activeScreen, setActiveScreen] = useState("konverzacije")
    const [activeConversation, setActiveConversation] = useState(null)

    const openConversation = (conversation) => {
        if (conversation.aktivna) {
            setActiveScreen("konverzacija")
            setActiveConversation(conversation)
        } else {
            ToastAndroid.show("Ova konverzacija nije aktivna.", ToastAndroid.SHORT);
        }
    }

    const closeConversation = () => {
        setActiveScreen("konverzacije")
        setActiveConversation(null)
    }

    const ChatBoxes = (conversations) => {
        return (
            <>
                <View>
                    <Heading textAlign="center" mb="5" mt="10" fontSize="30" color="black">
                        Konverzacije
                    </Heading>
                </View>
                <ScrollView>
                    {
                        // Renderuje konverzacija
                        conversations.map(konverzacija => ChatBox(konverzacija))
                    }
                </ScrollView>
            </>
        )
    }

    const ChatBox = (konverzacija) => {
        const pacijentInfo = dummyData.doktor.pacijenti.find(p => konverzacija.pacijent === p.id)
        const lastMessage = konverzacija.poruke[konverzacija.poruke.length - 1]

        return (
            <TouchableOpacity onPress={() => openConversation(konverzacija)}>
                <View style={{ marginTop: 15, marginBottom: 5 }}>
                    <Stack space={3} alignItems="center">
                        <HStack space={3} alignItems="center">
                            <Center h="70" w="70" rounded="md">
                                <Image style={{ width: 65, height: 65 }}
                                    source={pacijentInfo?.slika || defaultAvatar} />
                            </Center>
                            {
                                //Prikazi bedz ako posljednja poruka nije procitana
                                lastMessage.autor === "doktor" && !lastMessage.procitana && <Badge
                                    //bg="red.400"
                                    colorScheme="danger"
                                    rounded="999px"
                                    mt={-3}
                                    mr={-4}
                                    ml={-3}
                                    zIndex={1}
                                    variant="solid"
                                    alignSelf="flex-start"
                                    _text={{
                                        fontSize: 12,
                                    }}
                                >
                                    1
                                </Badge>}
                            <Box
                                h="70"
                                w={windowWidth - 130}
                                bg={konverzacija.aktivna ? "primary.500" : "coolGray.300"}
                                rounded="md"
                                shadow={3}
                                paddingLeft={2}
                                paddingTop={1}
                            >
                                <Text
                                    style={{ fontSize: 16, color: "white" }}
                                >{pacijentInfo?.ime} {pacijentInfo?.prezime}</Text>
                                <Text
                                    style={{ fontSize: 13, color: "white" }}
                                >{lastMessage?.tekst ?
                                    lastMessage.tekst.length > 60 ? `${lastMessage.tekst.substring(0, 60)}...` : lastMessage.tekst
                                    : "<Poslat je nalaz>"}</Text>
                            </Box>
                        </HStack>
                    </Stack>
                </View>
            </TouchableOpacity>
        )
    }

    const renderContent = (screen) => {
        switch (screen) {
            case "konverzacije":
                return ChatBoxes(dummyData.doktor.konverzacije)
            case "konverzacija":
                return <Conversation konverzacija={activeConversation} dummyData={dummyData} closeConversation={closeConversation} />
            default:
                // Po default-u prikazuj konverzacije
                return ChatBoxes(dummyData.doktor.konverzacije)
        }
    }
    return (
        <NativeBaseProvider>
            {renderContent(activeScreen)}
        </NativeBaseProvider>
    )
}
