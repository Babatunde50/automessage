import React, {useEffect, useState} from 'react';
import Contacts from 'react-native-contacts';
import {View, SafeAreaView, StyleSheet, FlatList, TouchableHighlight} from 'react-native';
import {Text, Avatar, Button} from 'react-native-paper';
import randomColor from 'randomcolor';

import { ContactsProps } from "../navigation/AppNavigator";

const MyContacts = ({ route, navigation }: ContactsProps) => {
  const [contacts, setContacts] = useState<any>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [ allSelected, setAllSelected ] = useState(false)

  useEffect(() => {
    loadContacts();
  }, []);

  const toggleContactSelection = (phoneTel: string) => {
    const isSelected = selectedContacts.includes(phoneTel);
    if (isSelected) {
      setSelectedContacts((prev) => prev.filter((num) => num !== phoneTel));
    } else {
      setSelectedContacts((prev) => [...prev, phoneTel]);
    }
  };

  const selectAllHandler = () => {
    if(allSelected) {
      setSelectedContacts([])
      setAllSelected(false)
    } else {
      setSelectedContacts(contacts.map( (contact: any) => contact["0"].number))
      setAllSelected(true)
    }
  }

  const finishSelectionHandler = () => {
    console.log(selectedContacts, "ADD MESSAGE SCREEN")
    navigation.navigate("AddMessage", { selectedContacts: selectedContacts })
  }

  const renderItem = (props: any) => {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => toggleContactSelection(props.item['0'].number)}>
        <SafeAreaView style={styles.contact}>
          {selectedContacts.includes(props.item['0'].number) ? (
            <Avatar.Icon
              size={40}
              icon="check"
              style={{backgroundColor: "#ccc"}}
            />
          ) : (
            <Avatar.Text
              style={{backgroundColor: props.item.color}}
              size={40}
              label={
                selectedContacts.includes(props.item['0'].number)
                  ? 'S'
                  : props.item.familyName[0] ||
                    props.item.givenName[0] ||
                    props.item['0'].number[0]
              }
            />
          )}
          <View style={styles.details}>
            <Text style={{fontWeight: '500'}}>
              {' '}
              {`${props.item.familyName} ${props.item.givenName}`}{' '}
            </Text>
            <Text> {props.item['0'].number} </Text>
          </View>
        </SafeAreaView>
      </TouchableHighlight>
    );
  };

  const loadContacts = () => {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.warn('Permission to access contacts was denied');
      } else {
        const foundContacts = contacts.map((contact) => ({
          ...contact.phoneNumbers,
          familyName: contact.familyName,
          givenName: contact.givenName,
          color: randomColor(),
        }));
        setContacts(foundContacts);
      }
    });
  };
  return (
    <View style={styles.screen}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item['0'].number}
      />
      <View style={styles.actionButtons}>
        <Button mode="text" onPress={selectAllHandler}> { allSelected ? "Un-select All" : "Select All" }  </Button>
        <Button onPress={finishSelectionHandler} mode="text" disabled={selectedContacts.length === 0} > Finish{ selectedContacts.length > 0 && `(${selectedContacts.length})` } </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between"
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  details: {
    paddingHorizontal: 8,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    shadowColor: "#ccc",
    shadowOpacity: .23,
    shadowRadius: 2,
    borderColor: "#ccc",
    borderTopWidth: 2
  }
});

export default MyContacts;
