import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-vector-icons';

import HomeScreen from '../Drawer/HomeScreen';
import ChatScreen from '../Drawer/ChatScreen';
import UserScreen from '../Drawer/ProfileScreen';
import ProfileScreen from '../Drawer/ProfileScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
            
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Chat') {
                iconName = focused ? 'chat' : 'chat-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',

          inactiveTintColor: 'gray',
        }}>
                
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Settings" component={ProfileScreen} />
              
      </Tab.Navigator>
          
    </NavigationContainer>
  );
}

export default App;
