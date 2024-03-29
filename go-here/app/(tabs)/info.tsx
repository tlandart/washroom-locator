import { StyleSheet} from 'react-native';
import { Text, View } from '@/components/Themed';
import DonateButton from '@/components/DonateButton';
import BusinessRegisterButton from '@/components/BusinessRegsiter';
import Colors from '@/constants/Colors';


export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>INFO</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <DonateButton />
      <BusinessRegisterButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    color: Colors['light'].tint,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
