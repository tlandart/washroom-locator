import { StatusBar, StyleSheet } from "react-native";
import { Text, View } from '@/components/Themed';
import MapView, { LatLng, Marker } from "react-native-maps";
import { Image } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ExploreEntry from "../explore-entry";

export default function TabOneScreen() {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        await fetch("https://afraid-geckos-attack.loca.lt/getAllWashrooms")
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

  const getLocationState = (data: SetStateAction<any[]>) => {
    setLocations(data);
  }

  const mapPoints: LatLng[] = useMemo(() => [{latitude: 0, longitude: 0}, {latitude: 1, longitude: 1}], []);
  
  const snapPoints = useMemo(() => ['12%', '36%', '92%'], []);

  const mapRef = useRef(null);

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
          <StatusBar
            barStyle={'dark-content'}
          />
          <MapView
            provider="google"
            style={styles.map}
            ref={mapRef}
            showsUserLocation={true}
            showsMyLocationButton={true}>
              {mapPoints.map(function(d, idx){
                return (
                <Marker key={idx} coordinate={d}>
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
            {locations.map(function(d: any, idx: number){
              return (
                <ExploreEntry key={idx}>
                  <Text>
                    { JSON.parse(JSON.stringify(d)).title }
                  </Text>
                </ExploreEntry>
              )})}
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
