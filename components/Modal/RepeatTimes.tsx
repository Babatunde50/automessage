import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput, Checkbox, Button} from 'react-native-paper';

import Colors from '../../constants/Colors';

type Props = {
  cancel: () => void;
  getChosedOption: (chosedOption: string) => void;
};

const Day = ({cancel, getChosedOption}: Props) => {
  const [ times, setTimes ] = useState("")
  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <TextInput
            keyboardType="number-pad"
            value={times}
            style={{width: 65, height: 40}}
            onChangeText={(text) => setTimes(text)}
          />
        <Text style={styles.header}>Repeat times</Text>
      </View>
      <View style={styles.actionButtons}>
        <Button style={{marginHorizontal: 4}} color="red" onPress={cancel}>
          CANCEL
        </Button>
        <Button
          style={{marginHorizontal: 4}}
          color={Colors.primary}
          mode="text"
          onPress={() => {
            getChosedOption(times)
            cancel();
          }}>
          SAVE
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'white',
    width: '100%',
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15
  },
  header: {
    color: Colors.primary,
    fontWeight: '900',
    paddingVertical: 15,
    paddingLeft: 15
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default Day;
