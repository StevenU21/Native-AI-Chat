import React, { useState, useEffect, createContext } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { ApplicationProvider, Layout, TopNavigation, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import ChatList from '../../components/ChatList';
import ChatInput from '../../components/ChatInput';
import NetInfo from '@react-native-community/netinfo';

const { width, height } = Dimensions.get('window');

export const ConnectionContext = createContext({ isConnected: true });

export default function ChatScreen() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ConnectionContext.Provider value={{ isConnected }}>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <Layout style={styles.container}>
          <TopNavigation
            alignment='center'
            title={() => <Text style={styles.title}>Chatbot</Text>}
          />
          {!isConnected && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>No internet connection</Text>
            </View>
          )}
          <ChatList />
          <ChatInput />
        </Layout>
      </ApplicationProvider>
    </ConnectionContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.025,
    paddingTop: height * 0.1,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: width * 0.025,
    color: '#FFFFFF',
  },
  errorContainer: {
    backgroundColor: 'red',
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});