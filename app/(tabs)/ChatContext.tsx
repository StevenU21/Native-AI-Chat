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
  handleSend: () => { },
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

  const handleSend = async (text: string, setInputText: (text: string) => void) => {
    if (text.trim()) {
      const newMessage: Message = { text: text, id: messages.length, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInputText('');

      try {
        const response = await fetch('https://open-ai-api-models.domcloud.dev/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            model: 'gpt-4o',
            temperature: 0.7,
            prompt: 'Eres una asistente virtual, experto en muchos temas de interes, como programación, ciencias, tecnología, psicologia, literatura etc, siempre hablando de forma eloquente, listo para manterner una conversaci[on fluida y dinámica con el usuario.',
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: data.bot_message, id: prevMessages.length, sender: 'bot' },
          ]);
        } else {
          console.error('Error:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <ChatContext.Provider value={{ messages, listRef, handleSend }}>
      {children}
    </ChatContext.Provider>
  );
};