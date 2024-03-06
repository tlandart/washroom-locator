import { StatusBar, StyleSheet, Image } from "react-native";
import { View, Text } from '@/components/Themed';
import MapView, { LatLng, Marker } from "react-native-maps";
import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ExploreEntry from "../explore-entry";

export default function TabOneScreen() {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<any[]>([]);

  const getLocationState = (data: SetStateAction<any[]>) => {
    setLocations(data);
  }

  const moveToMarker = (i: number) => {
    mapRef.current?.animateToRegion(
      {latitude: locations.at(i).latitude,
       longitude: locations.at(i).longitude,
       latitudeDelta: 0.01,
       longitudeDelta: 0.01,
      }, 250)
  }

  useEffect(() => {
    const getNotes = async () => {
      try {
        /* For dev testing:
         * Get this link by running "npx localtunnel --port 4000" in the /backend/ directory AFTER starting the MongoDB server.
         * This allows the expo app to access the server (it can't acces localhost).
         * Ensure that the phone and computer are ON THE SAME NETWORK.
         */
        await fetch("https://itchy-crabs-swim.loca.lt/getAllWashrooms")
        .then(async (response) => {
          if (!response.ok) {
            alert("Server failed: " + response.status);
          } else {
              await response.json().then((data) => {
              getLocationState(data.response);
          }) 
          }
        });
      } catch (error) {
        alert("Fetch function failed: " + error);
      } finally {
        setLoading(false);
      }
    }

    getNotes()
  }, []);
  
  const snapPoints = useMemo(() => ['12%', '36%', '92%'], []);

  const mapRef = useRef<MapView>(null);

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
          {/* <StatusBar
            barStyle={'dark-content'}
          /> */}
          <MapView
            provider="google"
            style={styles.map}
            ref={mapRef}
            showsUserLocation={true}
            showsMyLocationButton={true}>
              {locations.map(function(d, idx){
                return (
                <Marker key={idx}
                  coordinate={
                    {latitude: JSON.parse(JSON.stringify(d)).latitude,
                     longitude: JSON.parse(JSON.stringify(d)).longitude}}>
                  <Image
                    source={require("../../assets/images/gohere-pin.png")}
                    style={{height: 45, resizeMode: "contain"}}
                  />
                </Marker>
              )})}
          </MapView>
          <BottomSheet snapPoints={snapPoints}>
            <View style={styles.sheetTop}>
              <View style={styles.separator} />
            </View>
            {!loading && locations.map(function(d: any, idx: number){
              const parsed = JSON.parse(JSON.stringify(d));
              return (
                <TouchableOpacity key={idx} onPress={() => moveToMarker(idx)}>
                  <ExploreEntry
                    title={JSON.parse(JSON.stringify(d)).title}
                    address={JSON.parse(JSON.stringify(d)).address}
                    latitude={JSON.parse(JSON.stringify(d)).latitude}
                    longitude={JSON.parse(JSON.stringify(d)).longitude}/>
                </TouchableOpacity>
              )})}
              {loading &&
                <ExploreEntry title="Loading database..."
                              address="N/A"
                              latitude="N/A"
                              longitude="N/A"/>}
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
    backgroundColor: "lightgrey",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: "88%",
  },
  sheetTop: {
    flex: 1,
    maxHeight: 50,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  separator: {
    marginVertical: 25,
    height: 1,
    width: '90%',
    backgroundColor: "lightgrey"
  },
});
