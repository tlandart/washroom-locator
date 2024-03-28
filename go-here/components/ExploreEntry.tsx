import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { Entypo } from "@expo/vector-icons";

const ExploreEntry = ({
  title,
  address,
  latitude,
  longitude,
  sponsorlvl,
}: any) => {
  const getSponsorColorStyle = () => {
    return {
      color:
        sponsorlvl <= 0
          ? "#fff"
          : sponsorlvl == 1
          ? "#e6661e"
          : sponsorlvl == 2
          ? "#828282"
          : "#e6a21e",
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.text}>{address}</Text>
      </View>
      <View style={styles.container2}>
        {sponsorlvl > 0 &&
          [...Array(sponsorlvl)].map((d, idx) => (
            <Entypo
              key={idx}
              name="star"
              style={[styles.sponsorIcon, getSponsorColorStyle()]}
              size={25}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    backgroundColor: "transparent",
    padding: 10,
  },
  container1: {
    width: "90%",
    height: "100%",
  },
  container2: {
    width: "10%",
    height: "100%",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    height: 30,
    color: "black",
  },
  text: {
    fontSize: 15,
    color: "grey",
  },
  sponsorIcon: {
    alignSelf: "center",
    height: 30,
    color: "grey",
  },
});

export default ExploreEntry;
