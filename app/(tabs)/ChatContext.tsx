import React, { createContext, useState, useRef, useEffect, ReactNode } from 'react';
import { List } from '@ui-kitten/components';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatContextProps {
  messages: Message[];
  listRef: React.RefObject<List<any>>;
  handleSend: (text: string, setInputText: (text: string) => void) => void;
}

export const ChatContext = createContext<ChatContextProps>({
  messages: [],
  listRef: { current: null },
  handleSend: () => {},
});

interface Props {
  children: ReactNode;
}

export const ChatProvider: React.FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const listRef = useRef<List>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = (text: string, setInputText: (text: string) => void) => {
    if (text.trim()) {
      const newMessage: Message = { text: text, id: messages.length, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInputText('');
  
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: 'This is a bot response', id: prevMessages.length, sender: 'bot' }]);
      }, 1000);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, listRef, handleSend }}>
      {children}
    </ChatContext.Provider>
  );
};