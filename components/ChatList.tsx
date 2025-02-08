import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { List } from '@ui-kitten/components';
import { ChatContext } from '../app/(tabs)/ChatContext';
import Markdown from 'react-native-markdown-display';

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
  const { messages, listRef, isBotTyping } = useContext(ChatContext);

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.botMessage
    ]}>
      {item.sender === 'bot' ? (
        <Markdown style={{ body: styles.messageText }}>{item.text}</Markdown>
      ) : (
        <Text style={styles.messageText}>{item.text}</Text>
      )}
    </View>
  );

  return (
    <List
      ref={listRef}
      data={isBotTyping ? [...messages, { id: -1, text: 'Respondiendo...', sender: 'bot' }] : messages}
      renderItem={renderItem}
      style={styles.messageList}
    />
  );
};

export default ChatList;