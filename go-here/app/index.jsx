import { StyleSheet, View, Text, Image } from 'react-native';
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

  const leave = () => {
    navigation.navigate('explore');
  }

  return (
    <View style={styles.container} visible={false}>
      <Text style={styles.title}>Welcome to GoHere</Text>
      <Image source={require("../assets/images/GoHere.jpg")} style={styles.image} onLoad={leave}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
  },
  image: {
    marginTop: 20,
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});