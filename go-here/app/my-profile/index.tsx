import { StyleSheet, View, Text, Button, TextInput, Modal, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';

export default function MyProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [healthCondition, setHealthCondition] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const options = ["Crohn's disease", "Ulcerative colitis"];

  //Use AsyncStorage to save user data?
  //Change TouchableOpacity to use Pressable
  return (
    <View style={styles.container}>
      <View style={styles.main}>
          <Text style={styles.title}>First Name</Text>
          <TextInput style={styles.input} value={firstName} onChangeText={(newFirstName) => setFirstName(newFirstName)} placeholder="Enter first name" placeholderTextColor={"grey"}/>
          <Text style={styles.title}>Last Name</Text>
          <TextInput style={styles.input} value={lastName} onChangeText={(newLastName) => setLastName(newLastName)} placeholder="Enter last name" placeholderTextColor={"grey"}/>
          <Text style={styles.title}>Health Condition</Text>
          <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
            <Text>{healthCondition ? healthCondition : "Select Here"}</Text>
          </TouchableOpacity>
          
          <Modal animationType="none" transparent={true} visible={modalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.option}
                    onPress={() => {setHealthCondition(option); setModalVisible(false);}}>
                    <Text>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>

          <View style={styles.buttonContainer}>
            <Button title="Save" color="grey"></Button>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '50%'
  },
  button: {
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },
  buttonContainer: {
    marginTop: 18,
    borderColor: "grey",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white",
  },
  input: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  title: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 50,
    width: '50%',
  },
  option: {
    padding: 5
  },
});
