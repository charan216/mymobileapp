import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '@navigation/RootNavigator';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My Mobile App</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Details', {id: '1'})}>
        <Text style={styles.buttonText}>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 24},
  button: {backgroundColor: '#007AFF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8},
  buttonText: {color: '#fff', fontSize: 16, fontWeight: '600'},
});

export default HomeScreen;
