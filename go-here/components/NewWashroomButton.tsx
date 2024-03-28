import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet, Text } from "react-native";
import { devLink } from "@/constants/DevLink";

interface FormData {
  title: string;
  address: string;
  longitude: string;
  latitude: string;
  requestType: string;
}

const CancelButton = ({ onCancel }: { onCancel: any }) => {
  return <Button title="Cancel" onPress={onCancel} />;
};

const NewWashroomButton = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    address: "",
    longitude: "",
    latitude: "",
    requestType: "USERREQUEST"
  });

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(devLink + "/postWashroomRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      } else {
        alert("Thank you for submitting a washroom!");
      }

      const data = await response.json();
      console.log(data);

      setFormData({
        title: "",
        address: "",
        longitude: "",
        latitude: "",
        requestType: "USERREQUEST"
      });
    } catch (error) {
      alert("Error submitting form: " + error);
    }

    setFormData({
      title: "",
      address: "",
      longitude: "",
      latitude: "",
      requestType: "USERREQUEST"
    });
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      address: "",
      longitude: "",
      latitude: "",
      requestType: "USERREQUEST"
    });
    setShowForm(false);
  };

  return (
    <View style={styles.container}>
      {!showForm ? (
        <Button
          title="Request new washroom"
          onPress={() => setShowForm(true)}
        />
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={formData.title}
            onChangeText={(text) => handleInputChange("title", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={formData.address}
            onChangeText={(text) => handleInputChange("address", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            value={formData.longitude}
            onChangeText={(text) => handleInputChange("longitude", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            value={formData.latitude}
            onChangeText={(text) => handleInputChange("latitude", text)}
          />
          <Button title="Submit" onPress={handleSubmit} />
          <CancelButton onCancel={handleCancel} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 15,
    backgroundColor: "#eee",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 300,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginBottom: 10,
  },
});

export default NewWashroomButton;
