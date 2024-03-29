import { StyleSheet} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Text, Linking, Pressable} from 'react-native';
import { NativeViewGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';

const DonateButton = () => {
  const handleDonatePress = async () => {
    const url = 'https://crohnsandcolitis.donorportal.ca/Donation/Donation.aspx';

    const link = await Linking.canOpenURL(url);
    await Linking.openURL(url);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleDonatePress}>
      <Text style={styles.text}>Donate Now </Text>
      <Entypo style={[styles.text, {marginTop: 2}]} color="grey" name="chevron-right"/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    flexDirection: "row",
    marginTop: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default DonateButton;