import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import {useAppSelector} from '@store/index';
import HomeScreen from '@screens/HomeScreen';
import ProfileScreen from '@screens/ProfileScreen';
import LoginScreen from '@screens/LoginScreen';
import ProviderDetailsScreen from '@screens/ProviderDetailsScreen';
import ProvidersScreen from '@screens/ProvidersScreen';
import DocumentsScreen from '@screens/DocumentsScreen';
import TodoTasksScreen from '@screens/TodoTasksScreen';
import AppliancesScreen from '@screens/AppliancesScreen';
import ProjectsScreen from '@screens/ProjectsScreen';

export type AuthStackParamList = {
  Login: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  Providers: undefined;
  Documents: undefined;
  TodoTasks: undefined;
  Appliances: undefined;
  Projects: undefined;
};

export type TabParamList = {
  Home: undefined;
  MyProfile: undefined;
  Settings: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const tabIcon = (name: string, focused: boolean) => {
  const icons: Record<string, string> = {Home: '🏠', MyProfile: '🩺', Settings: '👤'};
  return <Text style={{fontSize: 20, opacity: focused ? 1 : 0.45}}>{icons[name]}</Text>;
};

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) => tabIcon(route.name, focused),
      tabBarActiveTintColor: '#FF6B35',
      tabBarInactiveTintColor: '#aaa',
      tabBarStyle: {paddingBottom: 4, backgroundColor: '#fff', borderTopColor: '#F0EBE3'},
      headerStyle: {backgroundColor: '#2C3E50'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: '700'},
    })}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{title: 'HomeSpace', headerShown: false}}
    />
    <Tab.Screen
      name="MyProfile"
      component={ProviderDetailsScreen}
      options={{title: 'My Profile'}}
    />
    <Tab.Screen
      name="Settings"
      component={ProfileScreen}
      options={{title: 'Account'}}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#2C3E50'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: '700'},
    }}>
    <Stack.Screen name="Main" component={TabNavigator} options={{headerShown: false}} />
    <Stack.Screen name="Providers" component={ProvidersScreen} options={{title: '🔧 Service Providers'}} />
    <Stack.Screen name="Documents" component={DocumentsScreen} options={{title: '📄 Documents'}} />
    <Stack.Screen name="TodoTasks" component={TodoTasksScreen} options={{title: '✅ To-Do Tasks'}} />
    <Stack.Screen name="Appliances" component={AppliancesScreen} options={{title: '🏠 Appliances'}} />
    <Stack.Screen name="Projects" component={ProjectsScreen} options={{title: '🔨 Projects'}} />
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
