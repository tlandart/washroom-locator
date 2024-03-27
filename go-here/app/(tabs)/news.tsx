import { Modal, ScrollView, StyleSheet, View} from 'react-native';
import { Text } from '@/components/Themed';
import { useEffect, useState } from 'react';
import NewsEntry from '../../components/NewsEntry';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function TabNewsScreen() {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    setEntries([
      {title: "Entry 17", day: 3, month: 1, year: 2020, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices arcu quis commodo dapibus. Morbi egestas quam nec dui egestas, vel vehicula ex lobortis. Sed eget lacinia justo, eu interdum neque. In vitae mauris vitae sapien sollicitudin scelerisque a vel quam. Curabitur purus felis, ullamcorper nec molestie at, tincidunt at odio. Aenean bibendum, magna sit amet pharetra suscipit, est risus tempus ante, ut bibendum felis elit quis est. Donec euismod dolor massa, vel consectetur odio lacinia vitae. Donec dapibus massa odio, quis scelerisque turpis rutrum quis. Aenean sed urna molestie, blandit magna non, accumsan ligula. Praesent lobortis in dolor a auctor. Maecenas non mauris nulla.  Praesent sodales nibh quis urna egestas suscipit. Aenean molestie tincidunt commodo. Praesent diam elit, tempus ac est et, congue auctor risus. Vivamus porta metus eu mauris fringilla iaculis. Fusce augue arcu, cursus ac nunc at, hendrerit pellentesquet pharetra suscipit, est risus tempus ante, ut bibendum felis elit quis est. Donec euismod dolor massa, vel consectetur odio lacinia vitae. Donec dapibus massa odio, quis scelerisque turpis rutrum quis. Aenean sed urna molestie, blandit magna non, accumsan ligula. Praesent lobortis in dolor a auctor. Maecenas non mau\n\nris nulla.  Praesent sodales nibh quis urna egestas suscipit. Aenean molestie tincidunt commodo. Praesent diam elit, tempus ac est et, congue auctor risus. Vivamus porta metus eu mauris fringilla iaculis. Fusce augue arcu, cursus ac nunc at, hendrerit pellentesquet pharetra suscipit, est risus tempus ante, ut bibendum felis elit quis est. Donec euismod dolor massa, vel consectetur odio lacinia vitae. Donec dapibus massa odio, quis scelerisque turpis rutrum quis. Aenean sed urna molestie, blandit magna non, accumsan ligula. Praesent lobortis in dolor a auctor. Maecenas non mauris nulla.  Praesent sodales nibh quis urna egestas suscipit. Aenean molestie tincidunt commodo. Praesent diam elit, tempus ac est et, congue auctor risus. Vivamus porta metus eu mauris fringill\n\na iaculis. Fusce augue arcu, cursus ac nunc at, hendrerit pellentesque purus. Etiam lacus orci, malesuada id placerat at, lacinia sed erat. Donec faucibus est eu sem rutrum finibus. Sed tincidunt leo a nunc ultricies gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut ornare finibus augue mattis lacinia. Nullam eu nisl id odio fermentum dapibus sed eu eros. Nunc laoreet ullamcorper enim eget consectetur. Suspendisse pretium eleifend neque, ac condimentum velit condimentum et."},
      {title: "Entry 5", day: 30, month: 11, year: 2023, description: "risus tempus ante, ut bibendum felis elit quis est. Donec euismod dolor massa, vel consectetur odio lacinia vitae. Donec dapibus massa odio, quis scelerisque turpis rutrum quis. Aenean sed urna molestie, \n\nblandit magna non, accumsan ligula. Praesent lobortis in dolor a auctor. Maecenas non mauris nulla.  Praesent sodales nibh quis urna egestas suscipit. Aenean molestie tincidunt commodo. Praesent diam elit, tempus ac est et, congue auctor risus. Vivamus porta metus eu mauris fringilla iaculis. Fusce augue arcu, cursus ac nunc at, hendrerit pellentesque purus. Etiam lacus orci, malesuada id placerat at, lacinia sed erat. Donec faucibus est eu sem rutrum finibus. Sed tincidunt leo a nunc ultricies gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere"}]);
  }, []);
  
  const [selectedEntry, setSelectedEntry] = useState(-1);

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
          {entries.map((d: any, idx: number) => {
            return (
              <TouchableOpacity onPress={() => setSelectedEntry(idx)}>
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
