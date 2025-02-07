import React from 'react';
import { ChatProvider } from './ChatContext';
import ChatScreen from './index';

export default function TabLayout() {
  return (
    <ChatProvider>
      <ChatScreen />
    </ChatProvider>
  );
}