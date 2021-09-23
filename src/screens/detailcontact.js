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
    height: 212,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006D84',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  contactAvatar: {
    width: 86,
    height: 86,
    borderRadius: 100,
  },
  detail: {
    display: 'flex',
    marginTop: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstName: {
    fontSize: 32,
    lineHeight: 36,
    paddingVertical: 4,
    color: '#006D84',
    fontWeight: 'bold',
  },
  lastName: {
    fontSize: 22,
    lineHeight: 26,
    paddingVertical: 4,
    color: '#006D84',
    fontWeight: 'bold',
  },
  age: {
    fontSize: 18,
    lineHeight: 22,
    paddingVertical: 4,
    color: '#006D84',
    fontStyle: 'italic',
  },
  faBtnEdit: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 80,
    right: 10,
    backgroundColor: '#006D84',
    borderRadius: 100,
  },
  faBtnDelete: {
    height: 46,
    width: 46,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 10,
    borderWidth: 2,
    borderColor: '#006D84',
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
  },
});

export default function ContactDetail({route, navigation}) {
  const isFocused = useIsFocused();
  const [contact, setContact] = useState({});

  const deleteContact = async () => {
    const id = route.params.id;
    console.log(id);
    const res = await API.deleteContact(id)
      .then(result => {
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const id = route.params.id;
    console.log(id);
    getContactsDetail(id);
  }, [isFocused]);

  const getContactsDetail = async params => {
    try {
      const res = await API.getContactDetail(params);
      const data = res.data;
      console.log(data);
      setContact(data);
    } catch (error) {
      console.log(error.message, 'error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.contactAvatar}
          source={{
            uri: contact.photo,
          }}
        />
      </View>
      <View style={styles.detail}>
        <Text style={styles.firstName}>{contact.firstName}</Text>
        <Text style={styles.lastName}>{contact.lastName}</Text>
        <Text style={styles.age}>{contact.age} Years</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('ContactDetail', {id: `${contact.id}`})}
        style={styles.faBtnEdit}>
        <Icon name="edit" size={24} color="#f2f2f2" />
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteContact} style={styles.faBtnDelete}>
        <Icon name="trash" size={24} color="#006D84" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
