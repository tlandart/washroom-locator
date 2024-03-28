import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "expo-router";
import { devLink } from "@/constants/DevLink";

export default function BusinessRegisterForm() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigation = useNavigation();
  const requestType = "BUSINESSREQUEST"
  
  useEffect(() => {
    navigation.setOptions({
      title: 'New Business Register',
      headerBackTitle: 'Back'
    })
  }, []);

  async function submitRegister() {
    try {
      if (title == "" || address == "" || latitude == "" || longitude == "" || phone == "" || email == ""){
        setErrorMessageText("Please provide a title, address, latitude, longitude, phone, and email.");
        setShowErrorMessage(true);
        return;
      }
      /* For dev testing:
       * Get this link by running "npx localtunnel --port 4000" in the /backend/ directory AFTER starting the MongoDB server.
       * This allows the expo app to access the server (it can't acces localhost).
       * Ensure that the phone and computer are ON THE SAME NETWORK.
       */
      await fetch(devLink + "/postWashroomRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, address, latitude, longitude, requestType }),
      }).then(async (response) => {
        if (!response.ok) {
          console.log("Business Register Form submission failed:", response.status);
          setErrorMessageText(
            "Business Register Form submission failed: " + response.status
          );
          setShowErrorMessage(true);
        } else {
          await response.json().then((data) => {
            setShowSuccessMessage(true);
          });
        }
      }).then(async (response) => {
      });
    } catch (error) {
      console.log("Fetch function failed:", error);
      setErrorMessageText("Fetch function failed:" + error);
      setShowErrorMessage(true);
    }
  }

  return (
    <View style={styles.container}>
      {!showSuccessMessage ? (
        <View style={styles.registerForm}>
          <Text style={styles.title}>New Business Register Form</Text>
          <View style={styles.main}>
            <Text style={styles.label}>Register</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(newValue) => setTitle(newValue)}
              placeholder="Enter title here"
              placeholderTextColor={"grey"}
              multiline={true}
              numberOfLines={1}
            />
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={(newValue) => setAddress(newValue)}
              placeholder="Enter address here"
              placeholderTextColor={"grey"}
              multiline={true}
              numberOfLines={1}
            />
            <TextInput
              style={styles.input}
              value={latitude}
              onChangeText={(newValue) => setLatitude(newValue)}
              placeholder="Enter latitude here"
              placeholderTextColor={"grey"}
              multiline={true}
              numberOfLines={1}
            />
            <TextInput
              style={styles.input}
              value={longitude}
              onChangeText={(newValue) => setLongitude(newValue)}
              placeholder="Enter longitude here"
              placeholderTextColor={"grey"}
              multiline={true}
              numberOfLines={1}
            />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={(newValue) => setPhone(newValue)}
              placeholder="Enter phone here"
              placeholderTextColor={"grey"}
              multiline={true}
              numberOfLines={1}
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(newValue) => setEmail(newValue)}
              placeholder="Enter email here"
              placeholderTextColor={"grey"}
              multiline={true}
              numberOfLines={1}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Save"
                color="grey"
                onPress={submitRegister}
              ></Button>
            </View>
            {showErrorMessage && (
              <Text style={styles.errorMessage}>{errorMessageText}</Text>
            )}
          </View>
        </View>
      ) : (
        <Text style={styles.successMessage}>
          Successfully submitted. Thank you for registering your business!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "50%",
  },
  registerForm: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  buttonContainer: {
    marginTop: 18,
    borderColor: "grey",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    marginTop: 30,
  },
  errorMessage: {
    marginTop: 30,
    color: "red",
  },
  successMessage: {
    marginTop: 30,
  },
});
