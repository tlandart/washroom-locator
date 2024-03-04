import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default function MyProfile() {

  return (
    <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Enter first name"/>
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
  input: {

  }
});
