import React, { useState } from 'react';
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
  const [selectedModelIndex, setSelectedModelIndex] = useState<IndexPath>(new IndexPath(0));
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, id: messages.length, sender: 'user' }]);

      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: 'This is a bot response', id: prevMessages.length + 1, sender: 'bot' }]);
      }, 1000); 
      setInputText('');
      setIsFocused(false);
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

  // const renderModelSelect = () => (
  //   <Select
  //     style={styles.select}
  //     selectedIndex={selectedModelIndex}
  //     onSelect={index => setSelectedModelIndex(index as IndexPath)}
  //     value={models[selectedModelIndex.row].label}
  //   >
  //     {models.map((model, index) => (
  //       <SelectItem title={model.label} key={index} />
  //     ))}
  //   </Select>
  // );

  // const models = [
  //   { label: 'GPT-3.5', value: 'gpt-3.5-turbo' },
  //   { label: 'GPT-4o', value: 'gpt-4o' },
  //   { label: 'GPT-4o-Mini', value: 'gpt-4o-mini' },
  // ];

  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout style={styles.container}>
        <TopNavigation
          alignment='center'
          title={() => <Text style={styles.title}>Chatbot</Text>}
        />
        {/* <View style={styles.selectContainer}>
          {renderModelSelect()}
        </View> */}
        <List
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
            onBlur={() => setIsFocused(inputText.trim() === '')}
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
  selectContainer: {
    marginTop: height * 0.01,
    marginBottom: height * 0.01, 
    alignItems: 'flex-start',
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
  select: {
    width: width * 0.6,
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