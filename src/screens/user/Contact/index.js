import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Image, Linking, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { GiftedChat } from 'react-native-gifted-chat';

const {width} = Dimensions.get('screen');

export default function ContactScreen() {
  const onPressMobileNumberClick = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={styles.container}>
    
      <Image
        style={styles.contact}
        source={require('../../../../assets/images/icons/contact.png')}
      />
      <Text style={styles.header}>Kontakt</Text>
      <View style={styles.wrapper}>
        <Image
          style={styles.img}
          source={require('../../../../assets/images/icons/icon.png')}
        />
        <View style={styles.nameWrapper}>
          <Text style={styles.name}> Željka Stijepović </Text>
          <Text> Izabrani doktor </Text>
        </View>
        <View style={styles.imageWrapper}>
          <TouchableOpacity>
            <Image
              source={require('../../../../assets/images/icons/chat3.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
      <View style={styles.contactWrapper}>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: '#979797',
            borderRadius: 50,
            width: 150,
            marginHorizontal: 100,
            marginBottom: 10,
          }}></View>
        <View style={styles.contactOne}>
          <View style={styles.contactIconText}>
            <Image
              source={require('../../../../assets/images/icons/phone.png')}
            />
            <Text style={styles.callService}> Dežurna služba </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              onPressMobileNumberClick('+382 20 365 656');
            }}>
            <Text style={styles.emergencyNum}> +382 20 365 656</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactOne}>
          <View style={styles.contactIconText}>
            <Image
              source={require('../../../../assets/images/icons/phone.png')}
            />
            <Text style={styles.callService}> Hitna pomoć </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              onPressMobileNumberClick('124');
            }}>
            <Text style={styles.emergencyNum}>124</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactOne}>
          <View style={styles.contactIconText}>
            <Image
              source={require('../../../../assets/images/icons/phone.png')}
            />
            <Text style={styles.callService}> Policija </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              onPressMobileNumberClick('122');
            }}>
            <Text style={styles.emergencyNum}>122</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contactOne}>
          <View style={styles.contactIconText}>
            <Image
              source={require('../../../../assets/images/icons/phone.png')}
            />
            <Text style={styles.callService}> Vatrogasna </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              onPressMobileNumberClick('123');
            }}>
            <Text style={styles.emergencyNum}>123</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
  },
  wrapper: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 40,
    justifyContent: 'space-between',
  },
  img: {
    height: 80,
    width: 80,
  },
  nameWrapper: {
    marginLeft: -50,
  },
  name: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 5,
  },
  imageWrapper: {
    paddingVertical: 20,
  },

  contactWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 100,
    width: width - 50,
  },
  contactOne: {
    paddingVertical: 4,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  contactIconText: {
    flexDirection: 'row',
  },
  callService: {
    fontWeight: 'bold',
    paddingVertical: 3,
    color: '#707070',
    letterSpacing: 0.5,
  },
  emergencyNum: {
    fontWeight: 'bold',
    color: '#707070',
  },
});
