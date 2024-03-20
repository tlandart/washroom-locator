import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface FormData {
    title: string;
    address: string;
    longitude: string;
    latitude: string;
}

const CancelButton = ({ onCancel } : { onCancel: any }) => {
    return (
        <Button
            title="Cancel"
            onPress={onCancel}
        />
    );
};

const NewWashroomButton = () => {
    const devLink = "https://eighty-zoos-enjoy.loca.lt";

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        title: '',
        address: '',
        longitude: '',
        latitude: '',
    });

    const handleInputChange = (name: keyof FormData, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        /* For dev testing:
         * Get this link by running "npx localtunnel --port 4000" in the /backend/ directory AFTER starting the MongoDB server.
         * This allows the expo app to access the server (it can't acces localhost).
         * Ensure that the phone and computer are ON THE SAME NETWORK.
         */
        /* Had some trouble setting up server so for now this is commented out. */

        try {
            const response = await fetch(devLink + '/postWashroomRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form data');
            }
            else {
                alert ("Thank you for submitting a washroom!");
            }

            const data = await response.json();
            console.log(data);

            setFormData({
                title: '',
                address: '',
                longitude: '',
                latitude: '',
            });
        } catch (error) {
            alert('Error submitting form: ' + error);
        }
        

        setFormData({
            title: '',
            address: '',
            longitude: '',
            latitude: '',
        });
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            address: '',
            longitude: '',
            latitude: '',
        });
        setShowForm(false);
    };

    return (
        <View style={styles.container}>
            {!showForm ? (
                <Button
                    title="Add new washroom"
                    onPress={() => setShowForm(true)}
                />
            ) : (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={formData.title}
                        onChangeText={(text) => handleInputChange('title', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={formData.address}
                        onChangeText={(text) => handleInputChange('address', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Longitude"
                        value={formData.longitude}
                        onChangeText={(text) => handleInputChange('longitude', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Latitude"
                        value={formData.latitude}
                        onChangeText={(text) => handleInputChange('latitude', text)}
                    />
                    <Button
                        title="Submit"
                        onPress={handleSubmit}
                    />
                    <CancelButton onCancel={handleCancel}/>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        marginBottom: 10,
    }
});

export default NewWashroomButton;

