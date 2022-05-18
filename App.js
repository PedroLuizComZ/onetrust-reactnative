/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import OTPublishersNativeSDK from 'react-native-onetrust-cmp';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [isConsented, setIsConsented] = useState(false);
  const backgroundStyle = {
    backgroundColor: Colors.darker,
    flex: 1,
  };

  OTPublishersNativeSDK.startSDK(
    'cdn.cookielaw.org',
    '0b89f31a-81d8-40e8-b6ea-37dbad9843d7-test',
    'pt',
    {countryCode: 'BR', regionCode: 'SP'},
    true,
  )
    .then(responseObject => {
      console.info(`Download status is ${responseObject.status}`);
    })
    .catch(error => {
      console.error(`OneTrust download failed with error ${error}`);
    });

  OTPublishersNativeSDK.setBroadcastAllowedValues(['C0002', 'C0003']);

  OTPublishersNativeSDK.listenForConsentChanges('C0003', (cat, status) => {
    status ? setIsConsented(true) : setIsConsented(false);
  });

  function openBanner() {
    OTPublishersNativeSDK.showBannerUI();
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.container}>
          {isConsented ? (
            <>
              <Text style={styles.textInfo}>
                Parabens, Voce pode acessar as partes que precissam do
                consentimento do aceite de cookies!
              </Text>
              <TouchableOpacity onPress={openBanner}>
                <Text style={styles.btnAction}>
                  Quer mudar seu consentimento?
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.textInfo}>
                Para ver os proximos conteudos voce precisa dar o aceite no
                consentimento dos cookies
              </Text>
              <TouchableOpacity onPress={openBanner}>
                <Text style={styles.btnAction}>Consentimento</Text>
              </TouchableOpacity>
            </>
          )}
          <Text style={styles.textLabel}>
            {isConsented ? 'Com Consentimento' : 'Sem consentimento'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textInfo: {
    color: Colors.white,
    fontSize: 20,
    marginTop: 50,
    textAlign: 'center',
  },
  textLabel: {
    color: Colors.white,
    fontSize: 30,
    marginTop: 50,
    marginBottom: 50,
    textAlign: 'center',
  },
  btnAction: {
    backgroundColor: Colors.white,
    color: Colors.black,
    fontSize: 20,
    marginTop: 30,
    marginBottom: 30,
    padding: 8,
    borderRadius: 10,
    textAlign: 'center',
  },
});
