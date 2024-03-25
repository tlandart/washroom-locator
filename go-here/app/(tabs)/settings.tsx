import { StyleSheet, Text, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { View } from '@/components/Themed';
import { Link } from "expo-router";
import { useNavigation } from '@react-navigation/native';

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

  //Change TouchableOpacity to use Pressable
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY PROFILE</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity style={styles.button}>
        <Link href="/my-profile/">My Profile</Link>
      </TouchableOpacity>

      <Text style={styles.title}>APP SETTINGS</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity style={styles.button}>
        <Text>Location Permission</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Analytics</Text>
      </TouchableOpacity>

      <Text style={styles.title}>PRIVACY AND TERMS</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity style={styles.button}>
        <Text>Privacy Policy</Text>
      </TouchableOpacity>

      <Text style={styles.title}>SUPPORT</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity style={styles.button}>
        <Text>Request Support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Version</Text>
      </TouchableOpacity>

      <Text style={styles.title}>FEEDBACK</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity style={styles.button}>
        <Link href="/feedback-form/">Provide Feedback</Link>
      </TouchableOpacity> 

      <Text style={styles.title}>Admin</Text>
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
    marginTop: 30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    marginTop: 10,
    marginBottom: 10,
  },
});
