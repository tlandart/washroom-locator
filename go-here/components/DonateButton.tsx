import { View, Button, Linking, StyleSheet} from 'react-native';

const DonateButton = () => {
  const handleDonatePress = async () => {
    const url = 'https://crohnsandcolitis.donorportal.ca/Donation/Donation.aspx';

    const link = await Linking.canOpenURL(url);
    await Linking.openURL(url);
  };

  return (
    <View style={{ margin: 10 }}>
      <Button title="Donate Now" onPress={handleDonatePress} />
    </View>
  );
};

export default DonateButton;