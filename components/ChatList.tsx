import React, { useContext, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, RefreshControl } from 'react-native';
import { List } from '@ui-kitten/components';
import { ChatContext } from '../app/(tabs)/ChatContext';
import Markdown from 'react-native-markdown-display';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
    marginBottom: height * 0.02,
  },
  messageContainer: {
    maxWidth: width * 0.8,
    borderRadius: 10,
    padding: width * 0.02,
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.02,
  },
  userMessage: {
    backgroundColor: '#27304f',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#27304f',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: width * 0.04,
    color: '#FFFFFF',
  },
  typingIndicator: {
    alignSelf: 'flex-start',
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.02,
  },
});

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatList: React.FC = () => {
  const { messages, listRef, isBotTyping, clearMessages } = useContext(ChatContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    clearMessages();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simula una espera de 2 segundos
  };

  const renderItem = ({ item }: { item: Message }) => (
    <Animatable.View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.botMessage,
        isBotTyping && item.id === -1 ? { opacity: 0.5 } : null
      ]}
      animation={isBotTyping && item.id === -1 ? "flash" : undefined}
      iterationCount="infinite"
      duration={2500}
    >
      {item.sender === 'bot' ? (
        <Markdown style={{ body: styles.messageText }}>{item.text}</Markdown>
      ) : (
        <Text style={styles.messageText}>{item.text}</Text>
      )}
    </Animatable.View>
  );

  return (
    <List
      ref={listRef}
      data={isBotTyping ? [...messages, { id: -1, text: 'Respondiendo...', sender: 'bot' }] : messages}
      renderItem={renderItem}
      style={styles.messageList}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default ChatList;