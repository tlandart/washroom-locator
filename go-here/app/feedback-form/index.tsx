import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { devLink } from "@/constants/DevLink";

export default function FeedbackForm() {
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackDescription, setFeedbackDescription] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  async function submitFeedback() {
    try {
      if (feedbackTitle == "" && feedbackDescription == "") {
        setErrorMessageText("Can't submit an empty form");
        setShowErrorMessage(true);
        return;
      }

      /* For dev testing:
       * Get this link by running "npx localtunnel --port 4000" in the /backend/ directory AFTER starting the MongoDB server.
       * This allows the expo app to access the server (it can't acces localhost).
       * Ensure that the phone and computer are ON THE SAME NETWORK.
       */
      await fetch(devLink + "/postFeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackTitle, feedbackDescription }),
      }).then(async (response) => {
        if (!response.ok) {
          console.log("Feedback Form submission failed:", response.status);
          setErrorMessageText(
            "Feedback Form submission failed: " + response.status
          );
          setShowErrorMessage(true);
        } else {
          await response.json().then((data) => {
            setShowSuccessMessage(true);
          });
        }
      });
    } catch (error) {
      console.log("Fetch function failed:", error);
      setErrorMessageText("Fetch function failed:" + error);
      setShowErrorMessage(true);
    }
  }

  //Change TouchableOpacity to use Pressable
  return (
    <View style={styles.container}>
      {!showSuccessMessage ? (
        <View style={styles.feedbackForm}>
          <Text style={styles.title}>GoHere Feedback Form</Text>
          <View style={styles.main}>
            <Text style={styles.label}>Feedback Title</Text>
            <TextInput
              style={styles.input}
              value={feedbackTitle}
              onChangeText={(newValue) => setFeedbackTitle(newValue)}
              placeholder="Enter feedback title here"
              placeholderTextColor={"grey"}
              multiline={true}
              numberOfLines={1}
            />
            <Text style={styles.label}>Feedback Description</Text>
            <TextInput
              style={styles.input}
              value={feedbackDescription}
              onChangeText={(newValue) => setFeedbackDescription(newValue)}
              placeholder="Enter feedback description here"
              placeholderTextColor={"grey"}
              multiline={true}
              numberOfLines={1}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Save"
                color="grey"
                onPress={submitFeedback}
              ></Button>
            </View>
            {showErrorMessage && (
              <Text style={styles.errorMessage}>{errorMessageText}</Text>
            )}
          </View>
        </View>
      ) : (
        <Text style={styles.successMessage}>
          Successfully submitted. Thank you for providing feedback!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "50%",
  },
  feedbackForm: {
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
