import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Image, Linking, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Conversation from '../../doctor/Conversation';

const {width} = Dimensions.get('screen');

const dummyData = {
  "doktor": {
      "id": 1001,
      "ime": "Jelena",
      "prezime": "Marković",
      "oblast": "Onkolog", // specijalizacija ili sl.
      "slika": require("../../../../assets/images/female-doctor.png"),
      "institucija": "relacija sa institucijom",
      "pacijenti": [
          {
              "id": 1,
              "ime": "Marija",
              "prezime": "Nikolić",
              "godiste": 1985,
              "pol": "ženski",
              "slika": require("../../../../assets/images/female-patient.png"),
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
              "slika": require("../../../../assets/images/female-patient-default.png"),
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
              "slika": require("../../../../assets/images/female-patient-2.png"),
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
              "slika": require("../../../../assets/images/female-patient-3.png"),
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

export default function ContactScreen() {
  const [activeScreen, setActiveScreen] = useState('konverzacija');

  const onPressMobileNumberClick = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };
  
  const closeConversation = () => {
    setActiveScreen("contactScreen")
  }


  const contactScreen = () => {
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
            <TouchableOpacity onPress={() => setActiveScreen("konverzacija")}>
              <Image
                source={require('../../../../assets/images/icons/chat3.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
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
  };

  const renderContent = screen => {
    switch (screen) {
      case 'konverzacija':
        return (
          <Conversation
            konverzacija={dummyData.doktor.konverzacije[0]}
            dummyData={dummyData}
            closeConversation={closeConversation}
            offsetBottomBar={true}
          />
        );
      default:
        // Po default-u prikazuj konverzacije
        return contactScreen();
    }
  };

  return <>{renderContent(activeScreen)}</>;
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
