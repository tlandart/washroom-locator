import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";

const MAX_TITLE_LENGTH = 30;
const MAX_DESC_LENGTH = 125;

const ExploreEntry = ({
  entry
}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.container3}>
          <Text style={styles.title}>{entry.title.length > MAX_TITLE_LENGTH ? entry.title.substring(0, MAX_TITLE_LENGTH) + "..." : entry.title}</Text>
          <Text style={styles.subtitle}>{`${entry.month}/${entry.day}/${entry.year}`}</Text>
        </View>
        <View style={styles.separator} />
        <Text style={styles.description}>{entry.description.length > MAX_DESC_LENGTH ? entry.description.substring(0, MAX_DESC_LENGTH) + "..." : entry.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  container2: {
    flex: 1,
    borderRadius: 25,
    marginHorizontal: 6,
    marginVertical: 3,
    padding: 25,
    backgroundColor: "white",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
  },
  container3: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 19,
    fontWeight: "500",
    color: Colors['light'].tint,
  },
  subtitle: {
    fontSize: 17,
    marginLeft: "auto",
    color: "grey",
  },
  separator: {
    height: 1,
    width: "100%",
    marginVertical: 7,
    backgroundColor: "lightgrey",
  },
  description: {
    fontSize: 17,
    color: "grey",
  },
});

export default ExploreEntry;
