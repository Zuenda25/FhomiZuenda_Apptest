import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from 'react-native';
import API from '../services/api.service';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#006D84',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  btnSave: {
    backgroundColor: '#006D84',
  },
});

export default function NewContact({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [photo, setPhoto] = useState('');

  const saveContact = async () => {
    const data = await {
      firstName: firstName,
      lastName: lastName,
      age: age,
      photo: photo,
    };
    const res = await API.addContact(data)
      .then(result => {
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
        console.log(data);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput
              placeholder="First Name"
              onChangeText={_firstName => setFirstName(_firstName)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Last Name"
              onChangeText={_lastName => setLastName(_lastName)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Age"
              onChangeText={_age => setAge(_age)}
              keyboardType="numeric"
              style={styles.textInput}
            />
            <TextInput
              placeholder="Photo URL"
              onChangeText={_photo => setPhoto(_photo)}
              style={styles.textInput}
            />
            <View style={styles.btnContainer}>
              <Button
                title="Save Contact"
                style={styles.btnSave}
                onPress={saveContact}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
