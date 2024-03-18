import { StyleSheet, View, Text, Button, TextInput, Modal, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");

  async function submitFeedback() {
    try {
        /* For dev testing:
         * Get this link by running "npx localtunnel --port 4000" in the /backend/ directory AFTER starting the MongoDB server.
         * This allows the expo app to access the server (it can't acces localhost).
         * Ensure that the phone and computer are ON THE SAME NETWORK.
         */
        await fetch("https://shiny-kids-design.loca.lt/postFeedback", {method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({feedback})
        }).then(async (response) => {
        if (!response.ok) {
            console.log("Feedback Form submission failed:", response.status);
        } else {
            await response.json().then((data) => {
            //do something
            });
        }
        });
    } catch (error) {
        console.log("Fetch function failed:", error);
    }   
  }

  //Change TouchableOpacity to use Pressable
  return (
    <View style={styles.container}>
        <Text style={styles.title}>GoHere Feedback Form</Text>
      <View style={styles.main}>
          <Text style={styles.label}>Feedback</Text>
          <TextInput style={styles.input} value={feedback} onChangeText={(newValue) => setFeedback(newValue)} placeholder="Enter feedback here" placeholderTextColor={"grey"}/>

          <View style={styles.buttonContainer}>
            <Button title="Save" color="grey" onPress={submitFeedback}></Button>
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
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 30,
  }
});
