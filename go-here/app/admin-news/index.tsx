import { useEffect, useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import { devLink } from "@/constants/DevLink";
import { useNavigation } from 'expo-router';


interface FormData {
  title: string;
  description: string;
}

const AdminNews = () => {

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: 'Admin News Page',
      headerBackTitle: 'Back'
    })
  }, []);
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setFormData({
      title: formData.title,
      description: formData.description,
    });
    try {
      const response = await fetch(devLink + "/postNews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      } else {
        alert("Successfully submitted news.");
      }

      const data = await response.json();
      console.log(data);

      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      alert("Error submitting form: " + error);
    }

    setFormData({
      title: "",
      description: "",
    });
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={formData.title}
          onChangeText={(text) => handleInputChange("title", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={formData.description}
          onChangeText={(text) => handleInputChange("description", text)}
        />
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Cancel" onPress={handleCancel} />
      </View>
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
});

export default AdminNews;
