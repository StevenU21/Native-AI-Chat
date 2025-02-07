import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ApplicationProvider, Layout, Input, Button, List, ListItem, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

interface Message {
  id: number;
  text: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, id: messages.length }]);
      setInputText('');
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <ListItem title={<Text>{item.text}</Text>} />
  );

  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout style={styles.container}>
        <List
          data={messages}
          renderItem={renderItem}
          style={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message"
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
    padding: 10,
  },
  messageList: {
    flex: 1,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
});