import React, {useState} from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import {IconButton, Text, Button} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// import Colors from '../constants/Colors';

type Props = {
  cancel: () => void;
  chosedOption: string;
  getChosedOption: (chosedOption: string) => void;
  showDayTimeModal: () => void;
  showCustomModal: () => void;
};

const Repeat = ({cancel, chosedOption, getChosedOption, showDayTimeModal, showCustomModal }: Props) => {
  const [chosenOption, setChosenOption] = useState(chosedOption);
  const REPEAT_OPTIONS = [
    'Does not repeat',
    'Hourly',
    'Daily',
    'Every Weekday (Mon-Fri)',
    'Weekly (Saturday)',
    'Monthly (The last Saturday) ',
    'Yearly (25 December)',
    'Several times a day',
    'Custom',
  ];
  return (
    <View style={styles.container}>
      {REPEAT_OPTIONS.map((option) => (
        <TouchableHighlight
          underlayColor="#DDD"
          activeOpacity={0.25}
          key={option}
          onPress={() => {
            setChosenOption(option)
          }}>
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
            if( chosenOption === 'Several times a day') {
              showDayTimeModal();
              return;
            }
            if( chosenOption === 'Custom') {
              showCustomModal()
              return;
            }
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
  },
});

export default Repeat;
