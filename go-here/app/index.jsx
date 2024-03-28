import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from "react";
import { useNavigation } from 'expo-router';

export default function App() {

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: 'Home Page',
      headerBackTitle: 'Back'
    })
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to GoHere</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
  },
});