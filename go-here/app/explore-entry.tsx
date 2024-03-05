import { StyleSheet, View } from "react-native";

const ExploreEntry = ({ children }: any) => {
  return (
    <View style={styles.container}>
        {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
  },
});

export default ExploreEntry;