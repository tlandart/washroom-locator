import { StyleSheet, Text, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { View } from '@/components/Themed';
import { useNavigation } from 'expo-router';

export default function AdminFeedback() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: 'Admin Feedback Page',
      headerBackTitle: 'Back'
    })
  }, []);

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
