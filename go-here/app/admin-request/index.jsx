import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
<<<<<<< HEAD
<<<<<<< HEAD
import { useNavigation } from "expo-router";
=======
import { devLink } from "@/constants/DevLink";
>>>>>>> 6075519de87a52792ae5aead24e1a3206687cea4
=======
import { useNavigation } from "expo-router";
import { devLink } from "@/constants/DevLink";
>>>>>>> 637763fe69373ce663f464b3d3612d681f5db3a7

export default function TabAdminScreen() {
  const [requests, setRequests] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchRequestedCollections();
    navigation.setOptions({
      title: 'Admin Requests Page',
      headerBackTitle: 'Back'
    })
  }, []);

  const fetchRequestedCollections = async () => {
    try {
      const response = await fetch(devLink + "/getAllRequested");
      const data = await response.json();
      setRequests(data.response);
    } catch (error) {
      console.error("Error fetching requested collections:", error);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await fetch(devLink + `/patchRequestStatus/${requestId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "ACCEPTED" }),
      });
      fetchRequestedCollections();
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      await fetch(devLink + `/patchRequestStatus/${requestId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "DECLINED" }),
      });
      fetchRequestedCollections();
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {requests.map((request) => (
          <View key={request._id} style={styles.requestItem}>
            <Text>{request.requestType}</Text>
            <Text>{request.title}</Text>
            <Text>{request.address}</Text>
            <TouchableOpacity onPress={() => handleAccept(request._id)}>
              <Text style={styles.acceptButton}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDecline(request._id)}>
              <Text style={styles.declineButton}>Decline</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
  requestItem: {
    marginBottom: 10,
  },
  acceptButton: {
    backgroundColor: "green",
    color: "white",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  declineButton: {
    backgroundColor: "red",
    color: "white",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
});
