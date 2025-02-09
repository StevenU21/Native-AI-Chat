import React, { createContext, useState, useRef, useEffect, ReactNode } from 'react';
import { List } from '@ui-kitten/components';
import axios from 'axios';
import { API_URL, API_KEY } from '@env';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatContextProps {
  messages: Message[];
  listRef: React.RefObject<List<any>>;
  handleSend: (text: string, setInputText: (text: string) => void) => void;
  isBotTyping: boolean;
  setIsBotTyping: (isTyping: boolean) => void;
}

export const ChatContext = createContext<ChatContextProps>({
  messages: [],
  listRef: { current: null },
  handleSend: () => { },
  isBotTyping: false,
  setIsBotTyping: () => { },
});

interface Props {
  children: ReactNode;
}

export const ChatProvider: React.FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const listRef = useRef<List>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = async (text: string, setInputText: (text: string) => void) => {
    if (text.trim()) {
      const newMessage: Message = { text: text, id: messages.length, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInputText('');
      setIsBotTyping(true);

      try {
        if (!API_URL || !API_KEY) {
          throw new Error('Las variables de entorno API_URL y API_KEY deben estar definidas');
        }

        const response = await axios.post(API_URL, {
          model: "gpt-4o",
          messages: [{ role: "user", content: text }],
          temperature: 0.7
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
          }
        });

        const data = response.data;

        if (response.status === 200 && data.choices && data.choices.length > 0) {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: data.choices[0].message.content.trim(), id: prevMessages.length, sender: 'bot' },
          ]);
        } else {
          console.error('Error:', data);
          alert('Hubo un error al procesar tu mensaje. Por favor, intenta nuevamente.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error de red. Por favor, verifica tu conexión e intenta nuevamente.');
      } finally {
        setIsBotTyping(false);
      }
    }
  };

  return (
    <ChatContext.Provider value={{ messages, listRef, handleSend, isBotTyping, setIsBotTyping }}>
      {children}
    </ChatContext.Provider>
  );
};