import { Modal, ScrollView, StyleSheet, View} from 'react-native';
import { Text } from '@/components/Themed';
import { useEffect, useState } from 'react';
import NewsEntry from '../../components/NewsEntry';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { devLink } from "../../constants/DevLink"

export default function TabNewsScreen() {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<any[]>([]);
  const [selectedEntry, setSelectedEntry] = useState(-1);

  useEffect(() => {
    const getEntries = async () => {
      try {
        await fetch(devLink + "/getAllNews").then(async (response) => {
          if (!response.ok) {
            alert("Server failed: " + response.status);
          } else {
            await response.json().then((data) => {
              setEntries(data.response);
            });
          }
        });
      } catch (error) {
        alert("Fetch function failed: " + error);
      } finally {
        setLoading(false);
      }
    };

    getEntries();
  }, []);

  return (
      <ScrollView style={styles.container}>
        <Modal presentationStyle="pageSheet" visible={selectedEntry >= 0} animationType="slide">
          <View style={styles.popup}>
            <GestureHandlerRootView>
              <TouchableOpacity onPress={() => {setSelectedEntry(-1)}}>
                <Ionicons
                  name="close-circle"
                  style={styles.modalCloseIcon}
                  size={35}
                />
              </TouchableOpacity>
            </GestureHandlerRootView>
            {selectedEntry >= 0 && (
              <View style={styles.popup}>
                <Text style={styles.title}>{entries[selectedEntry].title}</Text>
                <Text style={styles.subtitle}>{`${entries[selectedEntry].month}/${entries[selectedEntry].day}/${entries[selectedEntry].year}`}</Text>
                <View style={styles.separator} />
                <ScrollView>
                  <Text style={styles.description}>{entries[selectedEntry].description}</Text>
                </ScrollView>
              </View>
            )}
          </View>
        </Modal>
        <GestureHandlerRootView>
          {loading ? 
            <NewsEntry entry={{title: "Loading...", description: "N/A", day: 1, month: 1, year: 1970}}/>
            : entries.map((d: any, idx: number) => {
              return (
                <TouchableOpacity key={idx} onPress={() => setSelectedEntry(idx)}>
                  <NewsEntry entry={d}/>
                </TouchableOpacity>
              );
            })}
        </GestureHandlerRootView>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  popup: {
    flex: 1,
    margin: 10,
    marginBottom: 20,
  },
  modalCloseIcon: {
    right: 0,
    color: "rgba(0, 0, 0, 0.4)",
    textAlign: "right",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 17,
    marginTop: 5,
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
