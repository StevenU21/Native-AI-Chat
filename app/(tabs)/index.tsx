import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ApplicationProvider, Layout, TopNavigation, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import ChatList from '../../components/ChatList';
import ChatInput from '../../components/ChatInput';

const { width, height } = Dimensions.get('window');

export default function ChatScreen() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout style={styles.container}>
        <TopNavigation
          alignment='center'
          title={() => <Text style={styles.title}>Chatbot</Text>}
        />
        <ChatList />
        <ChatInput />
      </Layout>
    </ApplicationProvider>
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
});