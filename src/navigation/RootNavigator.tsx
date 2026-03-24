import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import {useAppSelector} from '@store/index';
import HomeScreen from '@screens/HomeScreen';
import DetailsScreen from '@screens/DetailsScreen';
import ProfileScreen from '@screens/ProfileScreen';
import LoginScreen from '@screens/LoginScreen';
import ProviderDetailsScreen from '@screens/ProviderDetailsScreen';

export type AuthStackParamList = {
  Login: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  Details: {id: string};
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Provider: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const tabIcon = (name: string, focused: boolean) => {
  const icons: Record<string, string> = {Home: '🏠', Profile: '👤', Provider: '🩺'};
  return <Text style={{fontSize: 20, opacity: focused ? 1 : 0.5}}>{icons[name]}</Text>;
};

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) => tabIcon(route.name, focused),
      tabBarActiveTintColor: '#4F6EF7',
      tabBarInactiveTintColor: '#aaa',
      tabBarStyle: {paddingBottom: 4},
    })}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Provider" component={ProviderDetailsScreen} options={{title: 'My Profile'}} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={TabNavigator} options={{headerShown: false}} />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppNavigator />
      ) : (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
          <AuthStack.Screen name="Login" component={LoginScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
