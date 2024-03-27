import { StyleSheet, Text, TextInput, Button, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View } from '@/components/Themed';
import { devLink } from '@/constants/DevLink';

export default function AdminFeedback() {
  type FeedbackType = {
    _id: "string";
    feedbackTitle: "string";
    feedbackDescription: "string";
  }
  const [feedback, setFeedback] = useState<FeedbackType[]>([]);

  useEffect(() => {
    fetchRequestedCollections();
  }, []);

  const fetchRequestedCollections = async () => {
    try {
      const response = await fetch(devLink + "/getAllFeedback");
      const data = await response.json();
      setFeedback(data.response);
    } catch (error) {
      console.error("Error fetching requested collections:", error);
    }
  };

  const deleteFeedbackEntry = async(entryId: string) => {
    try {
      await fetch(devLink + "/deleteFeedback/" + entryId, {method: "DELETE"}).then(async (response) => {
        if (!response.ok) {
          console.log("Deletion of feedback failed:", response.status);
        } else {
          await response.json().then(() => {
            setFeedback((prevFeedback) => prevFeedback.filter((entry) => entry._id !== entryId));
          });
        }
      });
    } catch (error) {
      console.log("Fetch function failed:", error);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Admin Feedback</Text>
        <ScrollView style={styles.feedbackContainer}>
        {feedback.map((entry) => (
          <View key={entry._id} style={styles.entry}>
            <Text>{entry.feedbackTitle}</Text>
            <View style={styles.line}></View>
            <Text>{entry.feedbackDescription}</Text>
            <TouchableOpacity style={styles.button} onPress={() => deleteFeedbackEntry(entry._id)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  button: {
    width: '30%',
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: "lightpink"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  feedbackContainer: {
    width: '60%',
    marginTop: 30
  },
  entry: {
    marginTop: 10,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    width: '100%'
  },
  line: {
    borderColor: "black",
    borderBottomWidth: 1,
    marginTop: 2,
    marginBottom: 3
  }
});
