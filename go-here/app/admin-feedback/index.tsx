import { StyleSheet, Text, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { View } from '@/components/Themed';

export default function AdminFeedback() {

  return (
    <View style={styles.container}>
        <Text>Admin Feedback Page</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    marginTop: 10,
    marginBottom: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
