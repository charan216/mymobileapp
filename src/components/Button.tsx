import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
};

const Button = ({title, onPress, loading = false, disabled = false, variant = 'primary'}: Props) => (
  <TouchableOpacity
    style={[styles.button, styles[variant], disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled || loading}
    activeOpacity={0.8}>
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={styles.text}>{title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8, alignItems: 'center'},
  primary: {backgroundColor: '#007AFF'},
  secondary: {backgroundColor: '#6C757D'},
  disabled: {opacity: 0.5},
  text: {color: '#fff', fontSize: 16, fontWeight: '600'},
});

export default Button;
