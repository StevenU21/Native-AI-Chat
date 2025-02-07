import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ApplicationProvider, Layout, Input, Button, List, ListItem, Text, TopNavigation, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

interface Message {
  id: number;
  text: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedModelIndex, setSelectedModelIndex] = useState<IndexPath>(new IndexPath(0));

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, id: messages.length }]);
      setInputText('');
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <ListItem title={<Text>{item.text}</Text>} />
  );

  const renderModelSelect = () => (
    <Select
      style={styles.select}
      selectedIndex={selectedModelIndex}
      onSelect={index => setSelectedModelIndex(index as IndexPath)}
      value={models[selectedModelIndex.row]}
    >
      {models.map((model, index) => (
        <SelectItem title={model} key={index} />
      ))}
    </Select>
  );

  const models = ['GPT-4', 'GPT-3.5', 'GPT-3'];

  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout style={styles.container}>
        <TopNavigation
          alignment='center'
          title={() => <Text style={styles.title}>Chatbot</Text>}
        />
        <View style={styles.selectContainer}>
          {renderModelSelect()}
        </View>
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
    paddingTop: '10%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  selectContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  messageList: {
    flex: 1,
    marginBottom: '2%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: '2%',
  },
  select: {
    width: '50%',
  },
});