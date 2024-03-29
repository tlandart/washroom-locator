import { StyleSheet, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { View } from '@/components/Themed';
import { Link } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import Colors from '@/constants/Colors';

export default function SettingsScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  //make user input of username and password only pop out after pressing login button
  const [showLogin, setShowLogin] = useState(false);
  <Button title="Admin Login" onPress={() => setShowLogin(true)} />

  const handleLogin = () => {
    const correctUsername = 'admin';
    const correctPassword = '12345';
    if (username === correctUsername && password === correctPassword) {
      navigation.navigate('adminHome');
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADMIN LOGIN</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {showLogin ? (
        <>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            autoCapitalize="none" // to ensure username is case-insensitive
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter password"
          />
          <Button title="Submit" onPress={handleLogin} />
        </>
      ) : (
        <Button title="Admin Login" onPress={() => setShowLogin(true)} />
      )}

      <Text style={styles.title}>MY PROFILE</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity style={styles.button}>
        <Link href="/my-profile/">My Profile</Link>
      </TouchableOpacity>

      <Text style={styles.title}>FEEDBACK</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity style={styles.button}>
        <Link href="/feedback-form/">Provide Feedback</Link>
      </TouchableOpacity> 
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    color: Colors['light'].tint,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    marginTop: 10,
    marginBottom: 10,
  },
});
