import { StyleSheet, Image } from "react-native";
import { View, Text } from "@/components/Themed";
import MapView, { Marker } from "react-native-maps";
import BottomSheet, {
  BottomSheetScrollView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ExploreEntry from "../../components/ExploreEntry";
import NewWashroomButton from "@/components/NewWashroomButton";
import { Ionicons } from "@expo/vector-icons";
import ExploreInfo from "../../components/ExploreInfo";
import { devLink } from "../../constants/DevLink"
import Colors from "@/constants/Colors";

export default function TabOneScreen() {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState(-1);

  const getLocationState = (data: SetStateAction<any[]>) => {
    setLocations(data);
  };

  const moveToMarker = (i: number) => {
    mapRef.current?.animateToRegion(
      {
        latitude: locations.at(i).latitude,
        longitude: locations.at(i).longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      250
    );
  };

  const menuClickHandler = (i: number) => {
    moveToMarker(i);
    setSelectedLocation(i);
    bottomSheetRef.current?.collapse();
    infoSheetRef.current?.expand();
  };

  const infoCloseHandler = () => {
    infoSheetRef.current?.close();
    bottomSheetRef.current?.collapse();
    setSelectedLocation(-1);
  };

  useEffect(() => {
    const getWashrooms = async () => {
      try {
        await fetch(devLink + "/getAllWashrooms").then(async (response) => {
          if (!response.ok) {
            alert("Server failed: " + response.status);
          } else {
            await response.json().then((data) => {
              getLocationState(data.response);
            });
          }
        });
      } catch (error) {
        alert("Fetch function failed: " + error);
      } finally {
        setLoading(false);
      }
    };

    getWashrooms();
  }, []);

  const mapRef = useRef<MapView>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const infoSheetRef = useRef<BottomSheet>(null);

  const infoSheetHandle = () => (
    <View style={styles.sheetHandle}>
      <View style={styles.sheetHandleIndicatorHolder}>
        <View style={styles.sheetHandleIndicator} />
      </View>
      <TouchableOpacity onPress={() => infoCloseHandler()}>
        <Ionicons
          name="close-circle"
          style={styles.infoSheetHandleCloseIcon}
          size={35}
        />
      </TouchableOpacity>
    </View>
  );

  const bottomSheetHandle = () => (
    <View style={styles.sheetHandle}>
      <View style={styles.sheetHandleIndicatorHolder}>
        <View style={styles.sheetHandleIndicator} />
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <MapView
          provider="google"
          style={styles.map}
          ref={mapRef}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onMapLoaded={infoCloseHandler}
        >
          {locations.map((d, idx) => {
            const sl = JSON.parse(JSON.stringify(d)).sponsorlvl;
            const path =
              sl <= 0
                ? require("../../assets/images/gohere-pin-0.png")
                : sl == 1
                ? require("../../assets/images/gohere-pin-1.png")
                : sl == 2
                ? require("../../assets/images/gohere-pin-2.png")
                : require("../../assets/images/gohere-pin-3.png");

            return (
              <Marker
                key={idx}
                coordinate={{
                  latitude: JSON.parse(JSON.stringify(d)).latitude,
                  longitude: JSON.parse(JSON.stringify(d)).longitude,
                }}
                onPress={() => menuClickHandler(idx)}
              >
                <Image
                  source={path}
                  style={{ height: 60, width: 42, resizeMode: "contain" }}
                />
              </Marker>
            );
          })}
        </MapView>
        {/* Bottom Sheet. */}
        <BottomSheet
          snapPoints={["12%", "36%", "92%"]}
          ref={bottomSheetRef}
          handleComponent={bottomSheetHandle}
          style={styles.sheetShadow}
        >
          <View style={styles.sheetTop}>
            <Text style={styles.bottomSheetTitle}>WASHROOMS</Text>
            <View style={styles.separator} />
          </View>
          <BottomSheetScrollView>
            {!loading &&
              locations.map((d: any, idx: number) => {
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => menuClickHandler(idx)}
                  >
                    <ExploreEntry
                      title={JSON.parse(JSON.stringify(d)).title}
                      address={JSON.parse(JSON.stringify(d)).address}
                      latitude={JSON.parse(JSON.stringify(d)).latitude}
                      longitude={JSON.parse(JSON.stringify(d)).longitude}
                      sponsorlvl={JSON.parse(JSON.stringify(d)).sponsorlvl}
                      phone={JSON.parse(JSON.stringify(d)).phone}
                      email={JSON.parse(JSON.stringify(d)).email}
                    />
                  </TouchableOpacity>
                );
              })}
            {loading && (
              <ExploreEntry
                title="Loading database..."
                address="N/A"
                latitude="N/A"
                longitude="N/A"
              />
            )}
            <NewWashroomButton />
          </BottomSheetScrollView>
        </BottomSheet>
        {/* Info Sheet. */}
        <BottomSheet
          snapPoints={["42%", "92%"]}
          ref={infoSheetRef}
          handleComponent={infoSheetHandle}
          /* If we don't check this, the shadow will make the sheet stick out at the bottom when it's closed. */
          style={selectedLocation == -1 ? null : styles.sheetShadow}
        >
          {selectedLocation >= 0 ? (
            <BottomSheetScrollView>
              <ExploreInfo
                title={locations.at(selectedLocation).title}
                address={locations.at(selectedLocation).address}
                latitude={locations.at(selectedLocation).latitude}
                longitude={locations.at(selectedLocation).longitude}
                sponsorlvl={locations.at(selectedLocation).sponsorlvl}
                phone={locations.at(selectedLocation).phone}
                email={locations.at(selectedLocation).email}
              />
            </BottomSheetScrollView>
          ) : (
            <Text style={{textAlign: "center"}}>Loading database...</Text>
          )}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: "88%",
  },
  sheetTop: {
    flex: 1,
    maxHeight: 55,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "lightgrey",
  },
  sheetShadow: {
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
  },
  sheetHandle: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 25,
    marginBottom: 5,
  },
  sheetHandleIndicatorHolder: {
    width: "100%",
    height: 35,
    padding: 5,
    justifyContent: "center",
  },
  sheetHandleIndicator: {
    alignSelf: "center",
    height: 6,
    width: 45,
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  bottomSheetTitle: {
    width: "100%",
    padding: 15,
    fontSize: 17,
    fontWeight: "500",
    color: Colors['light'].tint,
  },
  infoSheetHandleCloseIcon: {
    position: "absolute",
    right: -20,
    top: 5,
    color: "rgba(0, 0, 0, 0.4)",
    textAlign: "right",
  },
});
