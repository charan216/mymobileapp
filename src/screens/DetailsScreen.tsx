import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '@navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = () => {
  const route = useRoute<Props['route']>();
  const {id} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
      <Text style={styles.subtitle}>Item ID: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  title: {fontSize: 24, fontWeight: 'bold'},
  subtitle: {fontSize: 16, color: '#666', marginTop: 8},
});

export default DetailsScreen;
