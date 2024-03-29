import { StyleSheet, TouchableOpacity} from 'react-native';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

const BusinessRegisterButton = () => {
  const navigation = useNavigation();

  const handleBusinessRegisterPress = async () => {
    navigation.navigate('business-register/index')
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleBusinessRegisterPress}>
      <Text style={styles.text}>Register new business </Text>
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

export default BusinessRegisterButton;