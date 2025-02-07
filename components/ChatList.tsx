import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { List, Text } from '@ui-kitten/components';
import { ChatContext } from '../app/(tabs)/ChatContext';

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
  });

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
  }

const ChatList: React.FC = () => {
  const { messages, listRef } = useContext(ChatContext);

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.botMessage
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <List
      ref={listRef}
      data={messages}
      renderItem={renderItem}
      style={styles.messageList}
    />
  );
};

export default ChatList;