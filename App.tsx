import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Store from './src/context/store';
import Chats from './src/screens/Chats';
import Conversation from './src/screens/Conversation';
import ChatHeader from './src/components/ChatHeader';
import { Chat } from './src/@types/Chat';
import settings from './settings';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const navigationRef = useNavigationContainerRef();

  return (
    <Store>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName='Chats'>
          <Stack.Screen name='Chats' component={Chats} options={{ headerShown: false }} />
          <Stack.Screen
            name='Conversation'
            component={Conversation}
            options={({ route }) => {
              const chat = route.params?.chat as Chat;

              return {
                headerTitle: () => (chat ? <ChatHeader name={chat.name} avatar={chat.avatar} /> : null),
                headerStyle: { backgroundColor: settings.mainColor },
                headerTintColor: settings.colors.white,
              };
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Store>
  );
}

export default App;
