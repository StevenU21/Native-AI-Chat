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
      value={models[selectedModelIndex.row].label}
    >
      {models.map((model, index) => (
        <SelectItem title={model.label} key={index} />
      ))}
    </Select>
  );

  const models = [
    { label: 'GPT-3.5', value: 'gpt-3.5-turbo' },
    { label: 'GPT-4o', value: 'gpt-4o' },
    { label: 'GPT-4o-Mini', value: 'gpt-4o-mini' },
  ];

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
    fontSize: 32, // Tamaño de fuente más grande para el título
    fontWeight: 'bold',
    textAlign: 'center', // Centrar el texto
    padding: 10, // Agregar relleno
  },
  selectContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'flex-start', // Alinear el select a la izquierda
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
    width: '60%', // Usar porcentaje para el ancho del select
  },
});