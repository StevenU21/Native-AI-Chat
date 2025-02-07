import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ApplicationProvider, Layout, Input, Button, List, Text, TopNavigation, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const { width, height } = Dimensions.get('window');

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const listRef = useRef<List>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = { text: inputText, id: messages.length, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInputText('');
  
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: 'This is a bot response', id: prevMessages.length, sender: 'bot' }]);
      }, 1000);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.botMessage
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout style={styles.container}>
        <TopNavigation
          alignment='center'
          title={() => <Text style={styles.title}>Chatbot</Text>}
        />
        <List
          ref={listRef}
          data={messages}
          renderItem={renderItem}
          style={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <Input
            style={styles.textArea}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message"
            multiline={isFocused}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            textStyle={isFocused ? { minHeight: 64 } : {}}
          />
          <Button onPress={handleSend}>Send</Button>
        </View>
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
  messageList: {
    flex: 1,
    marginBottom: height * 0.02,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textArea: {
    flex: 1,
    marginRight: width * 0.02,
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