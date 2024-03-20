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
    const sl = sponsorlvl;
    return {
      backgroundColor:
        sl <= 0
          ? "#fff"
          : sl == 1
          ? "#e6661e"
          : sl == 2
          ? "#828282"
          : "#e6a21e",
    };
  };

  const getSponsorText = () => {
    const sl = sponsorlvl;
    const lvl =
      sl <= 0 ? "ERROR" : sl == 1 ? "Bronze" : sl == 2 ? "Silver" : "Gold";
    return `This business supports GoHere®\nas a ${lvl} level sponsor!`;
  };

  return (
    <View style={styles.container}>
      {sponsorlvl > 0 && (
        <View style={[styles.sponsorBanner, getSponsorColorStyle()]}>
          <Text style={styles.sponsorBannerText}>{getSponsorText()}</Text>
        </View>
      )}
      <View style={{ padding: 15 }}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.text}>{address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    flexDirection: "column",
  },
  sponsorBanner: {
    width: "100%",
    height: 65,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
  },
  sponsorBannerText: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
    textAlign: "center",
  },
  titleText: {
    marginTop: 10,
    fontSize: 25,
    height: 30,
    color: "black",
  },
  text: {
    marginTop: 10,
    fontSize: 17,
    color: "grey",
  },
});

export default ExploreEntry;
