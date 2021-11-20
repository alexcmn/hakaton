import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, BackHandler } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { useNavigation } from '@react-navigation/native';

import moment from 'moment';

export default function Conversation({ konverzacija, dummyData, closeConversation }) {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    const pripremiPoruke = (konverzacija, dummyData) => {
        const pacijentInfo = dummyData.doktor.pacijenti.find(p => konverzacija.pacijent === p.id)
        const doktorInfo = dummyData.doktor

        let formattedMessages = []

        konverzacija.poruke.slice(0).reverse().forEach((poruka, index) => {
            const formattedDate = moment.unix(poruka.timestamp).utc()
            // Ako je pacijent
            if (poruka.autor === "pacijent") {
                const pripremljenaPoruka = {
                    _id: index,
                    text: poruka.tekst || "",
                    image: poruka.nalaz || null,
                    createdAt: formattedDate,
                    sent: true,
                    received: poruka.procitana || false,
                    user: {
                        _id: pacijentInfo.id,
                        name: `${pacijentInfo.ime} ${pacijentInfo.prezime}`,
                        avatar: pacijentInfo.slika
                    }
                }

                formattedMessages.push(pripremljenaPoruka)
            } else if (poruka.autor === "doktor") {
                const pripremljenaPoruka = {
                    _id: index,
                    text: poruka.tekst || "",
                    image: poruka.nalaz || null,
                    createdAt: formattedDate,
                    sent: true,
                    received: poruka.procitana || false,
                    user: {
                        // ToDo - id-jevi pacijenata i doktora ne smiju da se preklapaju
                        _id: doktorInfo.id,
                        name: `${doktorInfo.ime} ${doktorInfo.prezime}`,
                        avatar: doktorInfo.slika
                    }
                }

                formattedMessages.push(pripremljenaPoruka)
            }
        });

        return formattedMessages;
    }

    useEffect(() => {
        setMessages(pripremiPoruke(konverzacija, dummyData))
    }, [])

    // Back handler
    useEffect(() => {
        const backAction = () => {
            closeConversation()
            return true
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: dummyData.doktor.id,
            }}
        />
    )
}