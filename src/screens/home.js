import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../services/api.service';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f2f2f2',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#006D84',
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 24,
    lineHeight: 30,
    color: '#ffffff',
  },
  listWrapper: {
    flex: 1,
    padding: 16,
  },
  cardContact: {
    display: 'flex',
    marginTop: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactName: {
    padding: 6,
    fontSize: 18,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  faBtn: {
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: '#006D84',
    borderRadius: 100,
  },
});

export default function Home({navigation}) {
  const isFocused = useIsFocused();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getContacts();
  }, [isFocused]);

  const getContacts = async () => {
    try {
      const res = await API.getContacts();
      const data = res.data;

      setContacts(data);
    } catch (error) {
      console.log(error.message, 'error');
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Contact List</Text>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={contacts}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ContactDetail', {id: `${item.id}`})
              }>
              <View style={styles.cardContact}>
                <Image
                  style={styles.contactAvatar}
                  source={{
                    uri: item.photo,
                  }}
                />
                <View>
                  <Text style={styles.contactName}>{item.firstName}</Text>
                  <Text style={styles.contactName}>{item.lastName}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('NewContact')}
        style={styles.faBtn}>
        <Icon name="plus" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
