import { StyleSheet, Text, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { View } from '@/components/Themed';
import { Link } from "expo-router";

export default function AdminHome() {

  //Change TouchableOpacity to use Pressable
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Link href="/admin-request/">Request Page</Link>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Link href="/admin-news/">News Page</Link>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Link href="/admin-feedback/">Feedback Page</Link>
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
});
