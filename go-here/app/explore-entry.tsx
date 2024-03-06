import { StyleSheet } from "react-native";
import { Text, View } from '@/components/Themed';

const ExploreEntry = ({ title, address, latitude, longitude }: any) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>
          title: {title}
        </Text>
        <Text style={styles.text}>
          address: {address}
        </Text>
        <Text style={styles.text}>
          latitude: {latitude}
        </Text>
        <Text style={styles.text}>
          longitude: {longitude}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  text: {
    color: "black"
  }
});

export default ExploreEntry;