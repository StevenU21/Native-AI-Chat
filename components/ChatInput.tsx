import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import { ChatContext } from '../app/(tabs)/ChatContext';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textArea: {
    flex: 1,
    marginRight: width * 0.02,
  },
});

const ChatInput: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { handleSend } = useContext(ChatContext);

  const handleSendMessage = () => {
    if (inputText.trim() === '') {
      Alert.alert('Error', 'Message cannot be empty');
      return;
    }
    handleSend(inputText, setInputText);
  };

  return (
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
        accessibilityLabel="Message input"
      />
      <Button onPress={handleSendMessage} accessibilityLabel="Send message">
        Send
      </Button>
    </View>
  );
};

export default ChatInput;