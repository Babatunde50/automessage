import React, {useState} from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import {IconButton, Text, Button} from 'react-native-paper';

import Colors from '../../constants/Colors';

type Props = {
  cancel: () => void;
  chosedOption: string;
  getChosedOption: (chosedOption: string) => void;
};

const RepeatUntil = ({cancel, chosedOption, getChosedOption}: Props) => {
  const [chosenOption, setChosenOption] = useState(chosedOption);
  const REPEAT_OPTIONS = [
    'Forever',
    'End by a date',
    'End by a repeat count',
    'Until I receive a call or an SMS message',
  ];
  return (
    <View style={styles.container}>
      {REPEAT_OPTIONS.map((option) => (
        <TouchableHighlight
          underlayColor="#DDD"
          activeOpacity={0.25}
          onPress={() => setChosenOption(option)}>
          <View style={styles.showcase}>
            <IconButton
              icon={
                chosenOption === option
                  ? 'checkbox-marked-circle-outline'
                  : 'checkbox-blank-circle-outline'
              }
              style={{marginRight: 24}}
              size={20}
              color="black"
            />
            <Text> {option} </Text>
          </View>
        </TouchableHighlight>
      ))}
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button
          mode="text"
          onPress={() => {
            getChosedOption(chosenOption);
            cancel();
          }}
          color={Colors.primary}>
          OK
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
  showcase: {
    flexDirection: 'row',
    alignItems: 'center',
    // flexWrap: "wrap"
  },
});

export default RepeatUntil;
